"""
Order Pydantic schemas.
"""
from pydantic import BaseModel
from typing import List, Optional


class OrderItemCreate(BaseModel):
    productId: str
    quantity: int


class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    deliveryAddress: str
    city: Optional[str] = ""
    postalCode: Optional[str] = ""


class OrderItemResponse(BaseModel):
    id: str
    productId: str
    name: str
    quantity: int
    price: float


class OrderResponse(BaseModel):
    id: str
    orderNumber: str
    userId: str
    userName: Optional[str] = None
    userEmail: Optional[str] = None
    items: List[OrderItemResponse]
    totalAmount: float
    status: str
    deliveryAddress: str
    city: Optional[str] = ""
    postalCode: Optional[str] = ""
    createdAt: str
    updatedAt: str
