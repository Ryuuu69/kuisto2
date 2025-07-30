from fastapi import FastAPI, APIRouter, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select
from typing import List
from dotenv import load_dotenv
import os

from database import get_db, engine, Base
from models import Category, Product, Supplement, Option, ChoiceOption, Order, OrderItem
import schemas

load_dotenv()

# Create FastAPI app
app = FastAPI(title="Restaurant API", description="API pour la gestion d'un restaurant", version="1.0.0")

# Configure CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# Create database tables on startup
@app.on_event("startup")
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# API Routers
category_router = APIRouter(prefix="/api/categories", tags=["Categories"])
product_router = APIRouter(prefix="/api/products", tags=["Products"])
supplement_router = APIRouter(prefix="/api/supplements", tags=["Supplements"])
option_router = APIRouter(prefix="/api/options", tags=["Options"])
choice_option_router = APIRouter(prefix="/api/choice-options", tags=["Choice Options"])
order_router = APIRouter(prefix="/api/orders", tags=["Orders"])
order_item_router = APIRouter(prefix="/api/order-items", tags=["Order Items"])

# ==================== CATEGORY ENDPOINTS ====================

@category_router.post("/", response_model=schemas.CategoryResponse)
async def create_category(category: schemas.CategoryCreate, db: AsyncSession = Depends(get_db)):
    db_category = Category(**category.model_dump())
    db.add(db_category)
    await db.commit()
    await db.refresh(db_category)
    return db_category

@category_router.get("/{category_id}", response_model=schemas.CategoryResponse)
async def get_category(category_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalar_one_or_none()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@category_router.get("/", response_model=List[schemas.CategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category))
    categories = result.scalars().all()
    return categories

@category_router.put("/{category_id}", response_model=schemas.CategoryResponse)
async def update_category(category_id: int, category: schemas.CategoryUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    db_category = result.scalar_one_or_none()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    for key, value in category.model_dump().items():
        setattr(db_category, key, value)
    
    await db.commit()
    await db.refresh(db_category)
    return db_category

@category_router.delete("/{category_id}")
async def delete_category(category_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    category = result.scalar_one_or_none()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    await db.delete(category)
    await db.commit()
    return {"message": "Category deleted successfully"}

# ==================== PRODUCT ENDPOINTS ====================

@product_router.post("/", response_model=schemas.ProductResponse)
async def create_product(product: schemas.ProductCreate, db: AsyncSession = Depends(get_db)):
    db_product = Product(**product.model_dump())
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product, ["category"])
    return db_product

@product_router.get("/{product_id}", response_model=schemas.ProductResponse)
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product).options(selectinload(Product.category)).where(Product.id == product_id)
    )
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@product_router.get("/", response_model=List[schemas.ProductResponse])
async def get_products(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).options(selectinload(Product.category)))
    products = result.scalars().all()
    return products

@product_router.put("/{product_id}", response_model=schemas.ProductResponse)
async def update_product(product_id: int, product: schemas.ProductUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).where(Product.id == product_id))
    db_product = result.scalar_one_or_none()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in product.model_dump().items():
        setattr(db_product, key, value)
    
    await db.commit()
    await db.refresh(db_product, ["category"])
    return db_product

@product_router.delete("/{product_id}")
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    await db.delete(product)
    await db.commit()
    return {"message": "Product deleted successfully"}

# ==================== SUPPLEMENT ENDPOINTS ====================

@supplement_router.post("/", response_model=schemas.SupplementResponse)
async def create_supplement(supplement: schemas.SupplementCreate, db: AsyncSession = Depends(get_db)):
    db_supplement = Supplement(**supplement.model_dump())
    db.add(db_supplement)
    await db.commit()
    await db.refresh(db_supplement)
    return db_supplement

@supplement_router.get("/{supplement_id}", response_model=schemas.SupplementResponse)
async def get_supplement(supplement_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Supplement).where(Supplement.id == supplement_id))
    supplement = result.scalar_one_or_none()
    if not supplement:
        raise HTTPException(status_code=404, detail="Supplement not found")
    return supplement

@supplement_router.get("/", response_model=List[schemas.SupplementResponse])
async def get_supplements(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Supplement))
    supplements = result.scalars().all()
    return supplements

@supplement_router.put("/{supplement_id}", response_model=schemas.SupplementResponse)
async def update_supplement(supplement_id: int, supplement: schemas.SupplementUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Supplement).where(Supplement.id == supplement_id))
    db_supplement = result.scalar_one_or_none()
    if not db_supplement:
        raise HTTPException(status_code=404, detail="Supplement not found")
    
    for key, value in supplement.model_dump().items():
        setattr(db_supplement, key, value)
    
    await db.commit()
    await db.refresh(db_supplement)
    return db_supplement

@supplement_router.delete("/{supplement_id}")
async def delete_supplement(supplement_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Supplement).where(Supplement.id == supplement_id))
    supplement = result.scalar_one_or_none()
    if not supplement:
        raise HTTPException(status_code=404, detail="Supplement not found")
    
    await db.delete(supplement)
    await db.commit()
    return {"message": "Supplement deleted successfully"}

# ==================== OPTION ENDPOINTS ====================

@option_router.post("/", response_model=schemas.OptionResponse)
async def create_option(option: schemas.OptionCreate, db: AsyncSession = Depends(get_db)):
    db_option = Option(**option.model_dump())
    db.add(db_option)
    await db.commit()
    await db.refresh(db_option, ["choice_options"])
    return db_option

@option_router.get("/{option_id}", response_model=schemas.OptionResponse)
async def get_option(option_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Option).options(selectinload(Option.choice_options)).where(Option.id == option_id)
    )
    option = result.scalar_one_or_none()
    if not option:
        raise HTTPException(status_code=404, detail="Option not found")
    return option

@option_router.get("/", response_model=List[schemas.OptionResponse])
async def get_options(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Option).options(selectinload(Option.choice_options)))
    options = result.scalars().all()
    return options

@option_router.put("/{option_id}", response_model=schemas.OptionResponse)
async def update_option(option_id: int, option: schemas.OptionUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Option).where(Option.id == option_id))
    db_option = result.scalar_one_or_none()
    if not db_option:
        raise HTTPException(status_code=404, detail="Option not found")
    
    for key, value in option.model_dump().items():
        setattr(db_option, key, value)
    
    await db.commit()
    await db.refresh(db_option, ["choice_options"])
    return db_option

@option_router.delete("/{option_id}")
async def delete_option(option_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Option).where(Option.id == option_id))
    option = result.scalar_one_or_none()
    if not option:
        raise HTTPException(status_code=404, detail="Option not found")
    
    await db.delete(option)
    await db.commit()
    return {"message": "Option deleted successfully"}

# ==================== CHOICE OPTION ENDPOINTS ====================

@choice_option_router.post("/", response_model=schemas.ChoiceOptionResponse)
async def create_choice_option(choice_option: schemas.ChoiceOptionCreate, db: AsyncSession = Depends(get_db)):
    db_choice_option = ChoiceOption(**choice_option.model_dump())
    db.add(db_choice_option)
    await db.commit()
    await db.refresh(db_choice_option)
    return db_choice_option

@choice_option_router.get("/{choice_option_id}", response_model=schemas.ChoiceOptionResponse)
async def get_choice_option(choice_option_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChoiceOption).where(ChoiceOption.id == choice_option_id))
    choice_option = result.scalar_one_or_none()
    if not choice_option:
        raise HTTPException(status_code=404, detail="Choice option not found")
    return choice_option

@choice_option_router.get("/", response_model=List[schemas.ChoiceOptionResponse])
async def get_choice_options(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChoiceOption))
    choice_options = result.scalars().all()
    return choice_options

@choice_option_router.put("/{choice_option_id}", response_model=schemas.ChoiceOptionResponse)
async def update_choice_option(choice_option_id: int, choice_option: schemas.ChoiceOptionUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChoiceOption).where(ChoiceOption.id == choice_option_id))
    db_choice_option = result.scalar_one_or_none()
    if not db_choice_option:
        raise HTTPException(status_code=404, detail="Choice option not found")
    
    for key, value in choice_option.model_dump().items():
        setattr(db_choice_option, key, value)
    
    await db.commit()
    await db.refresh(db_choice_option)
    return db_choice_option

@choice_option_router.delete("/{choice_option_id}")
async def delete_choice_option(choice_option_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChoiceOption).where(ChoiceOption.id == choice_option_id))
    choice_option = result.scalar_one_or_none()
    if not choice_option:
        raise HTTPException(status_code=404, detail="Choice option not found")
    
    await db.delete(choice_option)
    await db.commit()
    return {"message": "Choice option deleted successfully"}

# ==================== ORDER ENDPOINTS ====================

@order_router.post("/", response_model=schemas.OrderResponse)
async def create_order(order: schemas.OrderCreate, db: AsyncSession = Depends(get_db)):
    # Create order
    order_data = order.model_dump(exclude={"order_items"})
    db_order = Order(**order_data)
    db.add(db_order)
    await db.commit()
    await db.refresh(db_order)
    
    # Create order items
    for item_data in order.order_items:
        item_dict = item_data.model_dump(exclude={"supplement_ids", "choice_option_ids"})
        item_dict["order_id"] = db_order.id
        db_item = OrderItem(**item_dict)
        db.add(db_item)
        await db.commit()
        await db.refresh(db_item)
        
        # Add supplements
        if item_data.supplement_ids:
            supplements_result = await db.execute(
                select(Supplement).where(Supplement.id.in_(item_data.supplement_ids))
            )
            supplements = supplements_result.scalars().all()
            db_item.supplements.extend(supplements)
        
        # Add choice options
        if item_data.choice_option_ids:
            choice_options_result = await db.execute(
                select(ChoiceOption).where(ChoiceOption.id.in_(item_data.choice_option_ids))
            )
            choice_options = choice_options_result.scalars().all()
            db_item.choice_options.extend(choice_options)
        
        await db.commit()
    
    # TODO: Future Uber Eats integration point
    # if db_order.delivery_mode == DeliveryMode.UBER_EATS:
    #     await send_order_to_uber_eats(db_order)
    
    # Refresh and return complete order
    await db.refresh(db_order, ["order_items"])
    return await get_order(db_order.id, db)

@order_router.get("/{order_id}", response_model=schemas.OrderResponse)
async def get_order(order_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Order)
        .options(
            selectinload(Order.order_items)
            .selectinload(OrderItem.product)
            .selectinload(Product.category),
            selectinload(Order.order_items)
            .selectinload(OrderItem.supplements),
            selectinload(Order.order_items)
            .selectinload(OrderItem.choice_options)
        )
        .where(Order.id == order_id)
    )
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@order_router.get("/", response_model=List[schemas.OrderResponse])
async def get_orders(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Order)
        .options(
            selectinload(Order.order_items)
            .selectinload(OrderItem.product)
            .selectinload(Product.category),
            selectinload(Order.order_items)
            .selectinload(OrderItem.supplements),
            selectinload(Order.order_items)
            .selectinload(OrderItem.choice_options)
        )
    )
    orders = result.scalars().all()
    return orders

@order_router.put("/{order_id}", response_model=schemas.OrderResponse)
async def update_order(order_id: int, order: schemas.OrderUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Order).where(Order.id == order_id))
    db_order = result.scalar_one_or_none()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    for key, value in order.model_dump(exclude_unset=True).items():
        setattr(db_order, key, value)
    
    await db.commit()
    return await get_order(order_id, db)

@order_router.delete("/{order_id}")
async def delete_order(order_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Order).where(Order.id == order_id))
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    await db.delete(order)
    await db.commit()
    return {"message": "Order deleted successfully"}

# ==================== ORDER ITEM ENDPOINTS ====================

@order_item_router.post("/", response_model=schemas.OrderItemResponse)
async def create_order_item(order_item: schemas.OrderItemCreate, db: AsyncSession = Depends(get_db)):
    item_dict = order_item.model_dump(exclude={"supplement_ids", "choice_option_ids"})
    db_item = OrderItem(**item_dict)
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    
    # Add supplements
    if order_item.supplement_ids:
        supplements_result = await db.execute(
            select(Supplement).where(Supplement.id.in_(order_item.supplement_ids))
        )
        supplements = supplements_result.scalars().all()
        db_item.supplements.extend(supplements)
    
    # Add choice options
    if order_item.choice_option_ids:
        choice_options_result = await db.execute(
            select(ChoiceOption).where(ChoiceOption.id.in_(order_item.choice_option_ids))
        )
        choice_options = choice_options_result.scalars().all()
        db_item.choice_options.extend(choice_options)
    
    await db.commit()
    return await get_order_item(db_item.id, db)

@order_item_router.get("/{order_item_id}", response_model=schemas.OrderItemResponse)
async def get_order_item(order_item_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(OrderItem)
        .options(
            selectinload(OrderItem.product).selectinload(Product.category),
            selectinload(OrderItem.supplements),
            selectinload(OrderItem.choice_options)
        )
        .where(OrderItem.id == order_item_id)
    )
    order_item = result.scalar_one_or_none()
    if not order_item:
        raise HTTPException(status_code=404, detail="Order item not found")
    return order_item

@order_item_router.get("/", response_model=List[schemas.OrderItemResponse])
async def get_order_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(OrderItem)
        .options(
            selectinload(OrderItem.product).selectinload(Product.category),
            selectinload(OrderItem.supplements),
            selectinload(OrderItem.choice_options)
        )
    )
    order_items = result.scalars().all()
    return order_items

@order_item_router.put("/{order_item_id}", response_model=schemas.OrderItemResponse)
async def update_order_item(order_item_id: int, order_item: schemas.OrderItemUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OrderItem).where(OrderItem.id == order_item_id))
    db_item = result.scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="Order item not found")
    
    # Update basic fields
    item_dict = order_item.model_dump(exclude={"supplement_ids", "choice_option_ids"})
    for key, value in item_dict.items():
        setattr(db_item, key, value)
    
    # Update supplements
    db_item.supplements.clear()
    if order_item.supplement_ids:
        supplements_result = await db.execute(
            select(Supplement).where(Supplement.id.in_(order_item.supplement_ids))
        )
        supplements = supplements_result.scalars().all()
        db_item.supplements.extend(supplements)
    
    # Update choice options
    db_item.choice_options.clear()
    if order_item.choice_option_ids:
        choice_options_result = await db.execute(
            select(ChoiceOption).where(ChoiceOption.id.in_(order_item.choice_option_ids))
        )
        choice_options = choice_options_result.scalars().all()
        db_item.choice_options.extend(choice_options)
    
    await db.commit()
    return await get_order_item(order_item_id, db)

@order_item_router.delete("/{order_item_id}")
async def delete_order_item(order_item_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OrderItem).where(OrderItem.id == order_item_id))
    order_item = result.scalar_one_or_none()
    if not order_item:
        raise HTTPException(status_code=404, detail="Order item not found")
    
    await db.delete(order_item)
    await db.commit()
    return {"message": "Order item deleted successfully"}

# Include all routers
app.include_router(category_router)
app.include_router(product_router)
app.include_router(supplement_router)
app.include_router(option_router)
app.include_router(choice_option_router)
app.include_router(order_router)
app.include_router(order_item_router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Restaurant API is running", "docs": "/docs", "redoc": "/redoc"}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
