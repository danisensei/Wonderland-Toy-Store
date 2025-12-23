"""
Order schemas.
"""
from pydantic import BaseModel
from typing import List, Optional


class OrderItemCreate(BaseModel):
    productId: str
    quantity: int


class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    deliveryAddress: str
    city: Optional[str] = None
    postalCode: Optional[str] = None


class OrderItemResponse(BaseModel):
    id: str
    productId: str
    name: Optional[str] = None
    quantity: int
    price: float


class OrderResponse(BaseModel):
    id: str
    orderNumber: str
    userId: str
    items: List[OrderItemResponse]
    totalAmount: float
    status: str
    deliveryAddress: str
    city: Optional[str] = None
    postalCode: Optional[str] = None
    createdAt: str
    updatedAt: str

    class Config:
        from_attributes = True
