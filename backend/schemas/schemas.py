from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime
from decimal import Decimal
from models.models import DeliveryMode, PaymentMode, OrderStatus

# Base schemas for common fields
class TimestampMixin(BaseModel):
    created_at: datetime
    updated_at: Optional[datetime] = None

# Category Schemas
class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryResponse(CategoryBase, TimestampMixin):
    model_config = ConfigDict(from_attributes=True)
    id: int

# Product Schemas
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    base_price: Decimal
    image_url: Optional[str] = None
    category_id: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductResponse(ProductBase, TimestampMixin):
    model_config = ConfigDict(from_attributes=True)
    id: int
    category: Optional[CategoryResponse] = None # Nested category

# Supplement Schemas
class SupplementBase(BaseModel):
    name: str
    price: Decimal

class SupplementCreate(SupplementBase):
    pass

class SupplementUpdate(SupplementBase):
    pass

class SupplementResponse(SupplementBase, TimestampMixin):
    model_config = ConfigDict(from_attributes=True)
    id: int

# ChoiceOption Schemas
class ChoiceOptionBase(BaseModel):
    name: str
    price_modifier: Decimal = Decimal('0.00')
    option_id: int

class ChoiceOptionCreate(ChoiceOptionBase):
    pass

class ChoiceOptionUpdate(ChoiceOptionBase):
    pass

class ChoiceOptionResponse(ChoiceOptionBase, TimestampMixin):
    model_config = ConfigDict(from_attributes=True)
    id: int

# Option Schemas
class OptionBase(BaseModel):
    name: str
    product_id: int

class OptionCreate(OptionBase):
    pass

class OptionUpdate(OptionBase):
    pass

class OptionResponse(OptionBase, TimestampMixin):
    model_config = ConfigDict(from_attributes=True)
    id: int
    choice_options: List[ChoiceOptionResponse] = [] # Nested choice options

# OrderItem Schemas for request
class OrderItemChoiceRequest(BaseModel):
    option_id: int
    choice_id: int

class OrderItemRequest(BaseModel):
    product_id: int
    quantity: int
    choices: Optional[List[OrderItemChoiceRequest]] = None
    supplements: Optional[List[int]] = None # List of supplement IDs

# OrderItem Schemas for response (with snapshots)
class OrderItemChoiceSnapshotResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    choice_option_id: int
    choice_name_snapshot: str
    choice_price_modifier_snapshot: Decimal

class OrderItemSupplementSnapshotResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    supplement_id: int
    supplement_name_snapshot: str
    supplement_price_snapshot: Decimal

class OrderItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    order_id: int
    product_id: int
    product_name_snapshot: str
    base_price_snapshot: Decimal
    quantity: int
    item_total: Decimal
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    # Nested snapshots for choices and supplements
    choice_options: List[OrderItemChoiceSnapshotResponse] = []
    supplements: List[OrderItemSupplementSnapshotResponse] = []
    
    # Optional: Include full product details if needed for display
    product: Optional[ProductResponse] = None

# Order Schemas
class OrderBase(BaseModel):
    name: str
    address: str
    phone: str
    delivery_mode: DeliveryMode
    payment_mode: PaymentMode
    fee: Optional[Decimal] = None # Frontend can suggest, backend recalculates
    latitude: Optional[float] = None # For geocoding
    longitude: Optional[float] = None # For geocoding

class OrderCreate(OrderBase):
    items: List[OrderItemRequest]

class OrderUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    delivery_mode: Optional[DeliveryMode] = None
    payment_mode: Optional[PaymentMode] = None
    status: Optional[OrderStatus] = None

class OrderResponse(OrderBase, TimestampMixin):
    model_config = ConfigDict(from_attributes=True)
    id: int
    total: Decimal
    status: OrderStatus
    order_items: List[OrderItemResponse] = [] # Nested order items