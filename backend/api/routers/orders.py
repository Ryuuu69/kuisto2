from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.deps import get_db, get_admin_token
from schemas.schemas import OrderCreate, OrderUpdate, OrderResponse
from crud.crud_operations import order_crud
from models.models import OrderStatus

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order_in: OrderCreate,
    db: AsyncSession = Depends(get_db)
):
    return await order_crud.create(db, obj_in=order_in)

@router.get("/", response_model=List[OrderResponse])
async def read_orders(
    skip: int = 0,
    limit: int = 100,
    status: Optional[OrderStatus] = None, # Filter by status
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    return await order_crud.get_multi_with_relations(db, skip=skip, limit=limit, status=status)

@router.get("/{order_id}", response_model=OrderResponse)
async def read_order(
    order_id: int,
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    order = await order_crud.get_with_relations(db, id=order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order

@router.patch("/{order_id}", response_model=OrderResponse)
async def update_order_status(
    order_id: int,
    order_in: OrderUpdate, # Only status is expected to be updated here
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    order = await order_crud.get(db, id=order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    
    # Ensure only allowed fields are updated for PATCH, e.g., status
    if order_in.status:
        order.status = order_in.status
    
    # You can add more specific logic here if other fields are allowed to be patched
    # For now, only status is explicitly handled as per request.
    
    await db.commit()
    await db.refresh(order)
    return await order_crud.get_with_relations(db, id=order_id) # Return with relations