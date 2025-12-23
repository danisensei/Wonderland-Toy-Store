"""
Product database model.
"""
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, JSON
from sqlalchemy.sql import func
from database import Base


class DBProduct(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    brand = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)
    description = Column(Text)
    image = Column(String(500))
    category = Column(String(50), nullable=False)  # Electronic, Plush, BoardGame
    category_attributes = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    @property
    def in_stock(self):
        return self.quantity > 0

    def __repr__(self):
        return f"<DBProduct(id={self.id}, name='{self.name}', category='{self.category}')>"
