"""
<<<<<<< Updated upstream
User Pydantic schemas.
"""
from pydantic import BaseModel, EmailStr
from typing import Optional


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    createdAt: Optional[str] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
=======
User Schemas - Pydantic models for user requests/responses
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserResponse(BaseModel):
    """Schema for user response (public user info)."""
    id: str = Field(..., description="User ID")
    email: EmailStr = Field(..., description="User's email address")
    name: str = Field(..., description="User's full name")
    role: str = Field(..., description="User role (customer/admin)")
    createdAt: Optional[str] = Field(None, description="Account creation date")

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "1",
                "email": "john@example.com",
                "name": "John Doe",
                "role": "customer",
                "createdAt": "2024-01-01T00:00:00"
            }
        }


class UserUpdate(BaseModel):
    """Schema for updating user profile."""
    name: Optional[str] = Field(None, min_length=2, max_length=100, description="User's full name")
    email: Optional[EmailStr] = Field(None, description="User's email address")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Updated",
                "email": "john.updated@example.com"
            }
        }
>>>>>>> Stashed changes
