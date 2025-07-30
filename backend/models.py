from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, Table, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import enum

# Tables d'association pour les relations many-to-many
order_item_supplements = Table(
    'order_item_supplements',
    Base.metadata,
    Column('order_item_id', Integer, ForeignKey('order_items.id'), primary_key=True),
    Column('supplement_id', Integer, ForeignKey('supplements.id'), primary_key=True)
)

order_item_choice_options = Table(
    'order_item_choice_options',
    Base.metadata,
    Column('order_item_id', Integer, ForeignKey('order_items.id'), primary_key=True),
    Column('choice_option_id', Integer, ForeignKey('choice_options.id'), primary_key=True)
)

class DeliveryMode(enum.Enum):
    RESTAURANT = "restaurant"
    UBER_EATS = "uber_eats"

class OrderStatus(enum.Enum):
    PENDING = "pending"
    PREPARING = "preparing"
    READY = "ready"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    
    # Relations
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    image = Column(String(500))
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    
    # Relations
    category = relationship("Category", back_populates="products")
    options = relationship("Option", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")

class Supplement(Base):
    __tablename__ = "supplements"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False, default=0.0)
    
    # Relations many-to-many avec OrderItem
    order_items = relationship("OrderItem", secondary=order_item_supplements, back_populates="supplements")

class Option(Base):
    __tablename__ = "options"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    
    # Relations
    product = relationship("Product", back_populates="options")
    choice_options = relationship("ChoiceOption", back_populates="option")

class ChoiceOption(Base):
    __tablename__ = "choice_options"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    additional_price = Column(Float, nullable=False, default=0.0)
    option_id = Column(Integer, ForeignKey("options.id"), nullable=False)
    
    # Relations
    option = relationship("Option", back_populates="choice_options")
    order_items = relationship("OrderItem", secondary=order_item_choice_options, back_populates="choice_options")

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    total = Column(Float, nullable=False)
    delivery_address = Column(Text)
    phone = Column(String(20))
    delivery_mode = Column(Enum(DeliveryMode), nullable=False, default=DeliveryMode.RESTAURANT)
    status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relations
    order_items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Float, nullable=False)
    
    # Relations
    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")
    supplements = relationship("Supplement", secondary=order_item_supplements, back_populates="order_items")
    choice_options = relationship("ChoiceOption", secondary=order_item_choice_options, back_populates="order_items")