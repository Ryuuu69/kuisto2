from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime
from models import DeliveryMode, OrderStatus

# Category Schemas
class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int

# Product Schemas
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image: Optional[str] = None
    category_id: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    category: CategoryResponse

# Supplement Schemas
class SupplementBase(BaseModel):
    name: str
    price: float = 0.0

class SupplementCreate(SupplementBase):
    pass

class SupplementUpdate(SupplementBase):
    pass

class SupplementResponse(SupplementBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int

# ChoiceOption Schemas
class ChoiceOptionBase(BaseModel):
    name: str
    additional_price: float = 0.0
    option_id: int

class ChoiceOptionCreate(ChoiceOptionBase):
    pass

class ChoiceOptionUpdate(ChoiceOptionBase):
    pass

class ChoiceOptionResponse(ChoiceOptionBase):
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

class OptionResponse(OptionBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    choice_options: List[ChoiceOptionResponse] = []

# OrderItem Schemas
class OrderItemBase(BaseModel):
    product_id: int
    quantity: int = 1
    unit_price: float

class OrderItemCreate(OrderItemBase):
    supplement_ids: List[int] = []
    choice_option_ids: List[int] = []

class OrderItemUpdate(OrderItemBase):
    supplement_ids: List[int] = []
    choice_option_ids: List[int] = []

class OrderItemResponse(OrderItemBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    order_id: int
    product: ProductResponse
    supplements: List[SupplementResponse] = []
    choice_options: List[ChoiceOptionResponse] = []

# Order Schemas
class OrderBase(BaseModel):
    total: float
    delivery_address: Optional[str] = None
    phone: Optional[str] = None
    delivery_mode: DeliveryMode = DeliveryMode.RESTAURANT
    status: OrderStatus = OrderStatus.PENDING

class OrderCreate(OrderBase):
    order_items: List[OrderItemCreate] = []

class OrderUpdate(BaseModel):
    total: Optional[float] = None
    delivery_address: Optional[str] = None
    phone: Optional[str] = None
    delivery_mode: Optional[DeliveryMode] = None
    status: Optional[OrderStatus] = None

class OrderResponse(OrderBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    order_items: List[OrderItemResponse] = []