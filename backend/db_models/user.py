"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
User database model.
"""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base


class User(Base):
=======
=======
>>>>>>> Stashed changes
User Database Model - SQLAlchemy model for user accounts
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import Base


class UserRole(str, enum.Enum):
    """Enum for user roles"""
    CUSTOMER = "customer"
    ADMIN = "admin"


class User(Base):
    """
    User model for authentication and authorization.
    
    Attributes:
        id: Unique identifier
        email: User's email (unique)
        name: User's full name
        password_hash: Hashed password
        role: User role (customer/admin)
        created_at: Account creation timestamp
        updated_at: Last update timestamp
    """
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="customer")  # customer or admin
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
=======
=======
>>>>>>> Stashed changes
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default=UserRole.CUSTOMER.value)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to orders
    orders = relationship("Order", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
