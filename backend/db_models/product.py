"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
Product database model.
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.sql import func
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
Product Database Model - SQLAlchemy model for products
"""

from sqlalchemy import Column, Integer, String, Float, Text, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
from database import Base


class DBProduct(Base):
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    brand = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)
    description = Column(String(1000))
    category = Column(String(50), nullable=False)  # Electronic, Plush, BoardGame
    image = Column(String(500))
    category_attributes = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<DBProduct(id={self.id}, name='{self.name}', category='{self.category}')>"
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    """
    Product model for storing all toy products.
    Uses JSON field for category-specific attributes.
    
    Attributes:
        id: Unique identifier
        name: Product name
        brand: Product brand
        price: Product price
        quantity: Available stock
        description: Product description
        image_url: URL to product image
        category: Product category (Electronic, Plush, BoardGame)
        category_attributes: JSON field for category-specific data
        created_at: Creation timestamp
        updated_at: Last update timestamp
    """
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    brand = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)
    description = Column(Text)
    image_url = Column(String(500))
    category = Column(String(50), nullable=False, index=True)
    
    # JSON field for category-specific attributes
    # For Electronic: {"battery_type": "AA", "voltage": "6V"}
    # For Plush: {"material": "Polyester", "size": "Medium"}
    # For BoardGame: {"age_range": "8+", "number_of_players": "2-4"}
    category_attributes = Column(JSON, default={})
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to order items
    order_items = relationship("OrderItem", back_populates="product")

    def __repr__(self):
        return f"<DBProduct(id={self.id}, name={self.name}, category={self.category})>"

    def is_in_stock(self) -> bool:
        """Check if product is available in stock."""
        return self.quantity > 0

    def to_dict(self) -> dict:
        """Convert product to dictionary for API responses."""
        return {
            "id": str(self.id),
            "name": self.name,
            "brand": self.brand,
            "price": self.price,
            "quantity": self.quantity,
            "description": self.description,
            "image": self.image_url,
            "category": self.category,
            "categoryAttributes": self.category_attributes,
            "in_stock": self.is_in_stock(),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
