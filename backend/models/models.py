import enum
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum, DECIMAL, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.base import Base

# Association tables for many-to-many relationships with snapshots
order_item_choices_association = Table(
    'order_item_choices',
    Base.metadata,
    Column('order_item_id', Integer, ForeignKey('order_items.id'), primary_key=True),
    Column('choice_option_id', Integer, ForeignKey('choice_options.id'), primary_key=True),
    Column('choice_name_snapshot', String(100), nullable=False),
    Column('choice_price_modifier_snapshot', DECIMAL(10, 2), nullable=False),
    Column('created_at', DateTime(timezone=True), server_default=func.now())
)

order_item_supplements_association = Table(
    'order_item_supplements',
    Base.metadata,
    Column('order_item_id', Integer, ForeignKey('order_items.id'), primary_key=True),
    Column('supplement_id', Integer, ForeignKey('supplements.id'), primary_key=True),
    Column('supplement_name_snapshot', String(100), nullable=False),
    Column('supplement_price_snapshot', DECIMAL(10, 2), nullable=False),
    Column('created_at', DateTime(timezone=True), server_default=func.now())
)

class DeliveryMode(enum.Enum):
    maison = "maison"
    ubereats = "ubereats"

class PaymentMode(enum.Enum):
    cb = "cb"
    especes = "especes"

class OrderStatus(enum.Enum):
    pending = "pending"
    preparing = "preparing"
    ready = "ready"
    delivered = "delivered"
    cancelled = "cancelled"

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    base_price = Column(DECIMAL(10, 2), nullable=False)
    image_url = Column(String(500))
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    category = relationship("Category", back_populates="products")
    options = relationship("Option", back_populates="product")
    order_items = relationship("OrderItem", back_populates="product")

class Supplement(Base):
    __tablename__ = "supplements"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    order_items = relationship("OrderItem", secondary=order_item_supplements_association, back_populates="supplements")

class Option(Base):
    __tablename__ = "options"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    product = relationship("Product", back_populates="options")
    choice_options = relationship("ChoiceOption", back_populates="option")

class ChoiceOption(Base):
    __tablename__ = "choice_options"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    price_modifier = Column(DECIMAL(10, 2), nullable=False, default=0.0)
    option_id = Column(Integer, ForeignKey("options.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    option = relationship("Option", back_populates="choice_options")
    order_items = relationship("OrderItem", secondary=order_item_choices_association, back_populates="choice_options")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    address = Column(Text, nullable=False)
    phone = Column(String(20), nullable=False)
    delivery_mode = Column(Enum(DeliveryMode), nullable=False)
    payment_mode = Column(Enum(PaymentMode), nullable=False)
    fee = Column(DECIMAL(10, 2), nullable=False)
    total = Column(DECIMAL(10, 2), nullable=False)
    status = Column(Enum(OrderStatus), nullable=False, default=OrderStatus.pending)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    order_items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    product_name_snapshot = Column(String(200), nullable=False)
    base_price_snapshot = Column(DECIMAL(10, 2), nullable=False)
    quantity = Column(Integer, nullable=False)
    item_total = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items") # For fetching current product details if needed
    
    choice_options = relationship("ChoiceOption", secondary=order_item_choices_association, back_populates="order_items")
    supplements = relationship("Supplement", secondary=order_item_supplements_association, back_populates="order_items")