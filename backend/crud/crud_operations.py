from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status
from decimal import Decimal
import httpx
from geopy.distance import geodesic # For Haversine distance calculation

from core.config import settings
from crud.base import CRUDBase
from models.models import (
    Category, Product, Supplement, Option, ChoiceOption, Order, OrderItem,
    DeliveryMode, PaymentMode, OrderStatus,
    order_item_choices_association, order_item_supplements_association
)
from schemas.schemas import (
    CategoryCreate, CategoryUpdate, ProductCreate, ProductUpdate,
    SupplementCreate, SupplementUpdate, OptionCreate, OptionUpdate,
    ChoiceOptionCreate, ChoiceOptionUpdate, OrderCreate, OrderUpdate,
    OrderItemRequest
)

# --- Geocoding and Distance Calculation ---
async def geocode_address(address: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://nominatim.openstreetmap.org/search",
            params={"q": address, "format": "json", "limit": 1}
        )
        response.raise_for_status()
        data = response.json()
        if not data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Could not geocode address: {address}"
            )
        return float(data[0]["lat"]), float(data[0]["lon"])

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    coords1 = (lat1, lon1)
    coords2 = (lat2, lon2)
    return geodesic(coords1, coords2).km

# --- CRUD Classes ---
class CRUDCategory(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    pass

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    async def get_with_relations(self, db: AsyncSession, id: int):
        result = await db.execute(
            select(self.model)
            .options(
                selectinload(Product.category),
                selectinload(Product.options).selectinload(Option.choice_options),
                selectinload(Product.order_items) # Not strictly needed for product detail, but good for completeness
            )
            .filter(self.model.id == id)
        )
        return result.scalar_one_or_none()

    async def get_multi_with_relations(self, db: AsyncSession, skip: int = 0, limit: int = 100):
        result = await db.execute(
            select(self.model)
            .options(
                selectinload(Product.category),
                selectinload(Product.options).selectinload(Option.choice_options)
            )
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().unique().all()

class CRUDSupplement(CRUDBase[Supplement, SupplementCreate, SupplementUpdate]):
    pass

class CRUDOption(CRUDBase[Option, OptionCreate, OptionUpdate]):
    async def get_with_relations(self, db: AsyncSession, id: int):
        result = await db.execute(
            select(self.model)
            .options(selectinload(Option.choice_options))
            .filter(self.model.id == id)
        )
        return result.scalar_one_or_none()

    async def get_multi_with_relations(self, db: AsyncSession, skip: int = 0, limit: int = 100):
        result = await db.execute(
            select(self.model)
            .options(selectinload(Option.choice_options))
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().unique().all()

class CRUDChoiceOption(CRUDBase[ChoiceOption, ChoiceOptionCreate, ChoiceOptionUpdate]):
    pass

class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):
    async def create(self, db: AsyncSession, obj_in: OrderCreate) -> Order:
        # 1. Validate and fetch related entities
        products_map = {}
        supplements_map = {}
        options_map = {}
        choice_options_map = {}

        # Fetch all necessary products, supplements, options, choice_options in bulk
        product_ids = [item.product_id for item in obj_in.items]
        supplement_ids = [s_id for item in obj_in.items if item.supplements for s_id in item.supplements]
        choice_option_ids = [co_req.choice_id for item in obj_in.items if item.choices for co_req in item.choices]
        option_ids_from_choices = [co_req.option_id for item in obj_in.items if item.choices for co_req in item.choices]

        if product_ids:
            products_result = await db.execute(select(Product).filter(Product.id.in_(product_ids)))
            products_map = {p.id: p for p in products_result.scalars().all()}
        if supplement_ids:
            supplements_result = await db.execute(select(Supplement).filter(Supplement.id.in_(supplement_ids)))
            supplements_map = {s.id: s for s in supplements_result.scalars().all()}
        if option_ids_from_choices:
            options_result = await db.execute(select(Option).filter(Option.id.in_(option_ids_from_choices)))
            options_map = {o.id: o for o in options_result.scalars().all()}
        if choice_option_ids:
            choice_options_result = await db.execute(select(ChoiceOption).filter(ChoiceOption.id.in_(choice_option_ids)))
            choice_options_map = {co.id: co for co in choice_options_result.scalars().all()}

        # 2. Calculate item_total for each OrderItem and prepare snapshots
        db_order_items = []
        order_total_items_sum = Decimal('0.00')

        for item_req in obj_in.items:
            product = products_map.get(item_req.product_id)
            if not product:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Product with ID {item_req.product_id} not found."
                )
            
            item_base_price = product.base_price
            item_current_total = item_base_price

            # Process choices
            selected_choices = []
            if item_req.choices:
                for choice_req in item_req.choices:
                    choice_option = choice_options_map.get(choice_req.choice_id)
                    option = options_map.get(choice_req.option_id)

                    if not choice_option or not option:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"ChoiceOption ID {choice_req.choice_id} or Option ID {choice_req.option_id} not found."
                        )
                    if choice_option.option_id != option.id:
                         raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"ChoiceOption {choice_req.choice_id} does not belong to Option {choice_req.option_id}."
                        )
                    if option.product_id != product.id:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Option {choice_req.option_id} does not belong to Product {product.id}."
                        )
                    
                    item_current_total += choice_option.price_modifier
                    selected_choices.append(choice_option)

            # Process supplements
            selected_supplements = []
            if item_req.supplements:
                for s_id in item_req.supplements:
                    supplement = supplements_map.get(s_id)
                    if not supplement:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Supplement with ID {s_id} not found."
                        )
                    item_current_total += supplement.price
                    selected_supplements.append(supplement)
            
            item_total_for_quantity = item_current_total * item_req.quantity
            order_total_items_sum += item_total_for_quantity

            db_order_item = OrderItem(
                product_id=product.id,
                product_name_snapshot=product.name,
                base_price_snapshot=product.base_price,
                quantity=item_req.quantity,
                item_total=item_total_for_quantity
            )
            db_order_item.choice_options.extend(selected_choices)
            db_order_item.supplements.extend(selected_supplements)
            db_order_items.append(db_order_item)

        # 3. Calculate delivery fee
        customer_lat, customer_lon = obj_in.latitude, obj_in.longitude
        if not customer_lat or not customer_lon:
            try:
                customer_lat, customer_lon = await geocode_address(obj_in.address)
            except HTTPException as e:
                raise e # Re-raise geocoding errors
            except Exception:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to geocode address due to external service error."
                )

        distance_km = calculate_distance(
            settings.RESTAURANT_LAT, settings.RESTAURANT_LNG,
            customer_lat, customer_lon
        )
        calculated_fee = settings.DELIVERY_BASE_FEE + settings.DELIVERY_PER_KM_FEE * Decimal(str(distance_km))
        
        # Tolerance for fee provided by frontend
        fee_tolerance = Decimal('0.01') # 1 cent tolerance
        final_fee = calculated_fee
        if obj_in.fee is not None:
            if not (calculated_fee - fee_tolerance <= obj_in.fee <= calculated_fee + fee_tolerance):
                print(f"Warning: Frontend fee {obj_in.fee} differs from calculated {calculated_fee}. Using calculated fee.")
            final_fee = calculated_fee # Always use server calculated fee if mismatch

        # 4. Create Order
        order_data = obj_in.model_dump(exclude={"items", "fee", "latitude", "longitude"})
        db_order = Order(
            **order_data,
            fee=final_fee,
            total=order_total_items_sum + final_fee,
            status=OrderStatus.pending # Initial status
        )
        db_order.order_items.extend(db_order_items)
        
        db.add(db_order)
        await db.commit()
        await db.refresh(db_order)

        # Refresh order items to get their IDs and association table data
        await db.refresh(db_order, ["order_items"])
        for item in db_order.order_items:
            await db.refresh(item, ["choice_options", "supplements"])

        return db_order

    async def get_with_relations(self, db: AsyncSession, id: int):
        result = await db.execute(
            select(self.model)
            .options(
                selectinload(Order.order_items)
                .selectinload(OrderItem.product), # Load current product details
                selectinload(Order.order_items)
                .selectinload(OrderItem.choice_options), # Load snapshot data
                selectinload(Order.order_items)
                .selectinload(OrderItem.supplements) # Load snapshot data
            )
            .filter(self.model.id == id)
        )
        return result.scalar_one_or_none()

    async def get_multi_with_relations(self, db: AsyncSession, skip: int = 0, limit: int = 100, status: Optional[OrderStatus] = None):
        query = select(self.model).options(
            selectinload(Order.order_items)
            .selectinload(OrderItem.product),
            selectinload(Order.order_items)
            .selectinload(OrderItem.choice_options),
            selectinload(Order.order_items)
            .selectinload(OrderItem.supplements)
        )
        if status:
            query = query.filter(self.model.status == status)
        
        result = await db.execute(query.offset(skip).limit(limit))
        return result.scalars().unique().all()

# --- Instantiate CRUD objects ---
category_crud = CRUDCategory(Category)
product_crud = CRUDProduct(Product)
supplement_crud = CRUDSupplement(Supplement)
option_crud = CRUDOption(Option)
choice_option_crud = CRUDChoiceOption(ChoiceOption)
order_crud = CRUDOrder(Order)