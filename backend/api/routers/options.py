from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.deps import get_db, get_admin_token
from schemas.schemas import OptionCreate, OptionUpdate, OptionResponse
from crud.crud_operations import option_crud

router = APIRouter(prefix="/options", tags=["Options"])

@router.post("/", response_model=OptionResponse, status_code=status.HTTP_201_CREATED)
async def create_option(
    option_in: OptionCreate,
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    return await option_crud.create(db, obj_in=option_in)

@router.get("/", response_model=List[OptionResponse])
async def read_options(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await option_crud.get_multi_with_relations(db, skip=skip, limit=limit)

@router.get("/{option_id}", response_model=OptionResponse)
async def read_option(
    option_id: int,
    db: AsyncSession = Depends(get_db)
):
    option = await option_crud.get_with_relations(db, id=option_id)
    if not option:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    return option

@router.put("/{option_id}", response_model=OptionResponse)
async def update_option(
    option_id: int,
    option_in: OptionUpdate,
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    option = await option_crud.get(db, id=option_id)
    if not option:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    return await option_crud.update(db, db_obj=option, obj_in=option_in)

@router.delete("/{option_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_option(
    option_id: int,
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    option = await option_crud.remove(db, id=option_id)
    if not option:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    return {"message": "Option deleted successfully"}