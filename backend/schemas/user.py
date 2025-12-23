"""
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
