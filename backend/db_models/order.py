"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
Order and OrderItem database models.
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base
import uuid


def generate_order_number():
    """Generate a unique order number."""
    from datetime import datetime
    date_part = datetime.now().strftime("%Y%m%d")
    unique_part = str(uuid.uuid4().hex)[:6].upper()
    return f"ORD-{date_part}-{unique_part}"


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, index=True, default=generate_order_number)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    total_amount = Column(Float, nullable=False, default=0)
    status = Column(String(50), default="pending")
    delivery_address = Column(String(500))
    city = Column(String(100))
    postal_code = Column(String(20))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Order(id={self.id}, order_number='{self.order_number}', status='{self.status}')>"


class OrderItem(Base):
=======
=======
>>>>>>> Stashed changes
Order Database Models - SQLAlchemy models for orders and order items
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import Base


class OrderStatus(str, enum.Enum):
    """Enum for order statuses"""
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class Order(Base):
    """
    Order model for customer orders.
    
    Attributes:
        id: Unique identifier
        order_number: Human-readable order number
        user_id: Foreign key to user
        total_amount: Total order amount
        status: Order status
        delivery_address: Delivery address
        created_at: Order creation timestamp
        updated_at: Last update timestamp
    """
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    total_amount = Column(Float, nullable=False, default=0.0)
    status = Column(String(50), default=OrderStatus.PENDING.value)
    delivery_address = Column(Text)
    city = Column(String(100))
    postal_code = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Order(id={self.id}, order_number={self.order_number}, status={self.status})>"

    def to_dict(self) -> dict:
        """Convert order to dictionary for API responses."""
        return {
            "id": str(self.id),
            "orderNumber": self.order_number,
            "userId": str(self.user_id),
            "items": [item.to_dict() for item in self.items],
            "totalAmount": self.total_amount,
            "status": self.status,
            "deliveryAddress": self.delivery_address,
            "city": self.city,
            "postalCode": self.postal_code,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
            "updatedAt": self.updated_at.isoformat() if self.updated_at else None
        }


class OrderItem(Base):
    """
    OrderItem model for items within an order.
    
    Attributes:
        id: Unique identifier
        order_id: Foreign key to order
        product_id: Foreign key to product
        quantity: Quantity ordered
        price: Price at time of order
        product_name: Product name at time of order
    """
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    price_at_time = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")

    def __repr__(self):
        return f"<OrderItem(id={self.id}, product_id={self.product_id}, quantity={self.quantity})>"
=======
=======
>>>>>>> Stashed changes
    price = Column(Float, nullable=False)
    product_name = Column(String(255))  # Store product name at time of order

    # Relationships
    order = relationship("Order", back_populates="items")
    product = relationship("DBProduct", back_populates="order_items")

    def __repr__(self):
        return f"<OrderItem(id={self.id}, product_id={self.product_id}, quantity={self.quantity})>"

    def to_dict(self) -> dict:
        """Convert order item to dictionary for API responses."""
        return {
            "id": str(self.id),
            "productId": str(self.product_id),
            "name": self.product_name,
            "quantity": self.quantity,
            "price": self.price
        }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
