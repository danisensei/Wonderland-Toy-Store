"""
Product schemas.
"""
from pydantic import BaseModel, field_validator
from typing import Optional, Dict, Any, Literal


class ProductCreate(BaseModel):
    name: str
    brand: str
    price: float
    quantity: int
    description: str
    category: Literal['Electronic', 'Plush', 'BoardGame']
    image: str
    categoryAttributes: Optional[Dict[str, Any]] = None

    @field_validator('price')
    @classmethod
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Price must be positive')
        return v

    @field_validator('quantity')
    @classmethod
    def quantity_must_be_non_negative(cls, v):
        if v < 0:
            raise ValueError('Quantity cannot be negative')
        return v


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    description: Optional[str] = None
    category: Optional[Literal['Electronic', 'Plush', 'BoardGame']] = None
    image: Optional[str] = None
    categoryAttributes: Optional[Dict[str, Any]] = None


class ProductResponse(BaseModel):
    id: str
    name: str
    brand: str
    price: float
    quantity: int
    description: str
    category: str
    image: str
    in_stock: bool
    categoryAttributes: Optional[Dict[str, Any]] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
