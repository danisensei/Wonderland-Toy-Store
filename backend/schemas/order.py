"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
Order Schemas - Pydantic models for order requests/responses
"""

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class OrderItemCreate(BaseModel):
    """Schema for creating an order item."""
    productId: str = Field(..., description="Product ID")
    quantity: int = Field(..., gt=0, description="Quantity to order")

    class Config:
        json_schema_extra = {
            "example": {
                "productId": "1",
                "quantity": 2
            }
        }


class OrderCreate(BaseModel):
    """Schema for creating a new order."""
    items: List[OrderItemCreate] = Field(..., min_length=1, description="List of order items")
    deliveryAddress: str = Field(..., min_length=5, description="Delivery address")
    city: Optional[str] = Field(None, description="City")
    postalCode: Optional[str] = Field(None, description="Postal code")

    class Config:
        json_schema_extra = {
            "example": {
                "items": [
                    {"productId": "1", "quantity": 2},
                    {"productId": "3", "quantity": 1}
                ],
                "deliveryAddress": "123 Main Street, Apt 4B",
                "city": "New York",
                "postalCode": "10001"
            }
        }


class OrderItemResponse(BaseModel):
    """Schema for order item response."""
    id: str = Field(..., description="Order item ID")
    productId: str = Field(..., description="Product ID")
    name: Optional[str] = Field(None, description="Product name")
    quantity: int = Field(..., description="Quantity ordered")
    price: float = Field(..., description="Price at time of order")


class OrderResponse(BaseModel):
    """Schema for order response."""
    id: str = Field(..., description="Order ID")
    orderNumber: str = Field(..., description="Human-readable order number")
    userId: str = Field(..., description="User ID")
    items: List[OrderItemResponse] = Field(..., description="List of order items")
    totalAmount: float = Field(..., description="Total order amount")
    status: str = Field(..., description="Order status")
    deliveryAddress: Optional[str] = Field(None, description="Delivery address")
    city: Optional[str] = Field(None, description="City")
    postalCode: Optional[str] = Field(None, description="Postal code")
    createdAt: Optional[str] = Field(None, description="Order creation timestamp")
    updatedAt: Optional[str] = Field(None, description="Last update timestamp")

    class Config:
        from_attributes = True
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
