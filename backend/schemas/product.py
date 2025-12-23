"""
Product Pydantic schemas.
"""
from pydantic import BaseModel
from typing import Optional, Dict, Any


class ProductCreate(BaseModel):
    name: str
    brand: str
    price: float
    quantity: int = 0
    description: Optional[str] = ""
    category: str  # Electronic, Plush, BoardGame
    image: Optional[str] = ""
    categoryAttributes: Optional[Dict[str, Any]] = {}


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    description: Optional[str] = None
    category: Optional[str] = None
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
    in_stock: bool = True
    categoryAttributes: Optional[Dict[str, Any]] = {}
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
