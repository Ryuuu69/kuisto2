from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.deps import get_db, get_admin_token
from schemas.schemas import SupplementCreate, SupplementUpdate, SupplementResponse
from crud.crud_operations import supplement_crud

router = APIRouter(prefix="/supplements", tags=["Supplements"])

@router.post("/", response_model=SupplementResponse, status_code=status.HTTP_201_CREATED)
async def create_supplement(
    supplement_in: SupplementCreate,
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    return await supplement_crud.create(db, obj_in=supplement_in)

@router.get("/", response_model=List[SupplementResponse])
async def read_supplements(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    return await supplement_crud.get_multi(db, skip=skip, limit=limit)

@router.get("/{supplement_id}", response_model=SupplementResponse)
async def read_supplement(
    supplement_id: int,
    db: AsyncSession = Depends(get_db)
):
    supplement = await supplement_crud.get(db, id=supplement_id)
    if not supplement:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplement not found")
    return supplement

@router.put("/{supplement_id}", response_model=SupplementResponse)
async def update_supplement(
    supplement_id: int,
    supplement_in: SupplementUpdate,
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    supplement = await supplement_crud.get(db, id=supplement_id)
    if not supplement:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplement not found")
    return await supplement_crud.update(db, db_obj=supplement, obj_in=supplement_in)

@router.delete("/{supplement_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_supplement(
    supplement_id: int,
    db: AsyncSession = Depends(get_db),
    admin_token: str = Depends(get_admin_token) # Admin protected
):
    supplement = await supplement_crud.remove(db, id=supplement_id)
    if not supplement:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplement not found")
    return {"message": "Supplement deleted successfully"}