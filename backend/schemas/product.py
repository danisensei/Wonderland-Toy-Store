"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
Product Schemas - Pydantic models for product requests/responses
"""

from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, Literal
from datetime import datetime


class CategoryAttributes(BaseModel):
    """Schema for category-specific attributes."""
    # Electronic attributes
    batteryType: Optional[str] = Field(None, description="Battery type for electronic toys")
    voltage: Optional[str] = Field(None, description="Voltage for electronic toys")
    
    # Plush attributes
    material: Optional[str] = Field(None, description="Material for plush toys")
    size: Optional[str] = Field(None, description="Size for plush toys")
    
    # BoardGame attributes
    ageRange: Optional[str] = Field(None, description="Age range for board games")
    numberOfPlayers: Optional[str] = Field(None, description="Number of players for board games")


class ProductCreate(BaseModel):
    """Schema for creating a new product."""
    name: str = Field(..., min_length=2, max_length=255, description="Product name")
    brand: str = Field(..., min_length=2, max_length=255, description="Product brand")
    price: float = Field(..., gt=0, description="Product price")
    quantity: int = Field(default=0, ge=0, description="Available stock quantity")
    description: Optional[str] = Field(None, description="Product description")
    image: Optional[str] = Field(None, description="Product image URL")
    category: Literal["Electronic", "Plush", "BoardGame"] = Field(..., description="Product category")
    categoryAttributes: Optional[CategoryAttributes] = Field(None, description="Category-specific attributes")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Robot Explorer",
                "brand": "TechToys",
                "price": 49.99,
                "quantity": 15,
                "description": "Advanced robot with AI learning capabilities",
                "image": "https://example.com/robot.jpg",
                "category": "Electronic",
                "categoryAttributes": {
                    "batteryType": "AA",
                    "voltage": "6V"
                }
            }
        }


class ProductUpdate(BaseModel):
    """Schema for updating an existing product."""
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    brand: Optional[str] = Field(None, min_length=2, max_length=255)
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)
    description: Optional[str] = None
    image: Optional[str] = None
    category: Optional[Literal["Electronic", "Plush", "BoardGame"]] = None
    categoryAttributes: Optional[CategoryAttributes] = None


class ProductResponse(BaseModel):
    """Schema for product response."""
    id: str = Field(..., description="Product ID")
    name: str = Field(..., description="Product name")
    brand: str = Field(..., description="Product brand")
    price: float = Field(..., description="Product price")
    quantity: int = Field(..., description="Available stock quantity")
    description: Optional[str] = Field(None, description="Product description")
    image: Optional[str] = Field(None, description="Product image URL")
    category: str = Field(..., description="Product category")
    categoryAttributes: Optional[Dict[str, Any]] = Field(None, description="Category-specific attributes")
    in_stock: bool = Field(..., description="Whether product is in stock")
    created_at: Optional[str] = Field(None, description="Creation timestamp")
    updated_at: Optional[str] = Field(None, description="Last update timestamp")

    class Config:
        from_attributes = True
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
