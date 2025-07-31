import asyncio
from decimal import Decimal
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database.session import AsyncSessionLocal, async_engine
from database.base import Base
from models.models import Category, Product, Supplement, Option, ChoiceOption, DeliveryMode, PaymentMode, OrderStatus
from crud.crud_operations import category_crud, product_crud, supplement_crud, option_crud, choice_option_crud, order_crud
from schemas.schemas import (
    CategoryCreate, ProductCreate, SupplementCreate, OptionCreate, ChoiceOptionCreate,
    OrderCreate, OrderItemRequest, OrderItemChoiceRequest
)

async def seed_data():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all) # Drop existing tables
        await conn.run_sync(Base.metadata.create_all) # Create fresh tables

    async with AsyncSessionLocal() as db:
        print("Seeding categories...")
        cat_burgers = await category_crud.create(db, CategoryCreate(name="Burgers"))
        cat_menus = await category_crud.create(db, CategoryCreate(name="Menus"))
        cat_sides = await category_crud.create(db, CategoryCreate(name="Sides"))
        cat_drinks = await category_crud.create(db, CategoryCreate(name="Boissons"))
        cat_desserts = await category_crud.create(db, CategoryCreate(name="Desserts"))

        print("Seeding products...")
        prod_classic_burger = await product_crud.create(db, ProductCreate(
            name="Classic Burger",
            description="Un burger classique avec steak, cheddar, salade, tomate.",
            base_price=Decimal('8.50'),
            image_url="https://example.com/classic_burger.jpg",
            category_id=cat_burgers.id
        ))
        prod_veggie_burger = await product_crud.create(db, ProductCreate(
            name="Veggie Burger",
            description="Burger végétarien avec galette de légumes, avocat, oignons rouges.",
            base_price=Decimal('9.00'),
            image_url="https://example.com/veggie_burger.jpg",
            category_id=cat_burgers.id
        ))
        prod_menu_burger = await product_crud.create(db, ProductCreate(
            name="Menu Burger Classique",
            description="Classic Burger + frites + boisson au choix.",
            base_price=Decimal('12.00'),
            image_url="https://example.com/menu_burger.jpg",
            category_id=cat_menus.id
        ))
        prod_fries = await product_crud.create(db, ProductCreate(
            name="Frites Maison",
            description="Nos frites coupées maison, croustillantes à souhait.",
            base_price=Decimal('3.00'),
            image_url="https://example.com/fries.jpg",
            category_id=cat_sides.id
        ))
        prod_coke = await product_crud.create(db, ProductCreate(
            name="Coca-Cola 33cl",
            description="Boisson gazeuse rafraîchissante.",
            base_price=Decimal('2.50'),
            image_url="https://example.com/coke.jpg",
            category_id=cat_drinks.id
        ))

        print("Seeding supplements...")
        sup_cheese = await supplement_crud.create(db, SupplementCreate(name="Extra Fromage", price=Decimal('1.00')))
        sup_bacon = await supplement_crud.create(db, SupplementCreate(name="Bacon", price=Decimal('1.50')))
        sup_avocado = await supplement_crud.create(db, SupplementCreate(name="Avocat", price=Decimal('2.00')))

        print("Seeding options and choice options...")
        # Options for Classic Burger
        opt_burger_size = await option_crud.create(db, OptionCreate(name="Taille", product_id=prod_classic_burger.id))
        ch_burger_s = await choice_option_crud.create(db, ChoiceOptionCreate(name="Petit", price_modifier=Decimal('-1.00'), option_id=opt_burger_size.id))
        ch_burger_m = await choice_option_crud.create(db, ChoiceOptionCreate(name="Moyen", price_modifier=Decimal('0.00'), option_id=opt_burger_size.id))
        ch_burger_l = await choice_option_crud.create(db, ChoiceOptionCreate(name="Grand", price_modifier=Decimal('2.00'), option_id=opt_burger_size.id))

        opt_burger_remove = await option_crud.create(db, OptionCreate(name="Retirer", product_id=prod_classic_burger.id))
        ch_burger_no_onion = await choice_option_crud.create(db, ChoiceOptionCreate(name="Sans oignon", price_modifier=Decimal('0.00'), option_id=opt_burger_remove.id))
        ch_burger_no_tomato = await choice_option_crud.create(db, ChoiceOptionCreate(name="Sans tomate", price_modifier=Decimal('0.00'), option_id=opt_burger_remove.id))

        # Options for Menu Burger
        opt_menu_drink = await option_crud.create(db, OptionCreate(name="Boisson", product_id=prod_menu_burger.id))
        ch_menu_coke = await choice_option_crud.create(db, ChoiceOptionCreate(name="Coca-Cola", price_modifier=Decimal('0.00'), option_id=opt_menu_drink.id))
        ch_menu_sprite = await choice_option_crud.create(db, ChoiceOptionCreate(name="Sprite", price_modifier=Decimal('0.00'), option_id=opt_menu_drink.id))
        ch_menu_orange_juice = await choice_option_crud.create(db, ChoiceOptionCreate(name="Jus d'orange", price_modifier=Decimal('0.50'), option_id=opt_menu_drink.id))

        print("Seeding example order...")
        # Example order creation
        order_data = OrderCreate(
            name="Alice Dupont",
            address="12 rue de la République, 34000 Montpellier",
            phone="0601020304",
            delivery_mode=DeliveryMode.maison,
            payment_mode=PaymentMode.cb,
            latitude=43.610769,
            longitude=3.876716,
            fee=Decimal('3.50'), # This will be recalculated by the backend
            items=[
                OrderItemRequest(
                    product_id=prod_classic_burger.id,
                    quantity=1,
                    choices=[
                        OrderItemChoiceRequest(option_id=opt_burger_size.id, choice_id=ch_burger_l.id),
                        OrderItemChoiceRequest(option_id=opt_burger_remove.id, choice_id=ch_burger_no_onion.id)
                    ],
                    supplements=[sup_cheese.id, sup_bacon.id]
                ),
                OrderItemRequest(
                    product_id=prod_menu_burger.id,
                    quantity=1,
                    choices=[
                        OrderItemChoiceRequest(option_id=opt_menu_drink.id, choice_id=ch_menu_orange_juice.id)
                    ],
                    supplements=[]
                ),
                OrderItemRequest(
                    product_id=prod_fries.id,
                    quantity=2,
                    choices=[],
                    supplements=[]
                )
            ]
        )
        await order_crud.create(db, order_data)
        print("Seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_data())