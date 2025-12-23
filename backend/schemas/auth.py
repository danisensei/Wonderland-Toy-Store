"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
Authentication Pydantic schemas.
"""
from pydantic import BaseModel, EmailStr
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
Authentication Schemas - Pydantic models for auth requests/responses
"""

from pydantic import BaseModel, EmailStr, Field
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
from typing import Optional


class UserCreate(BaseModel):
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    email: EmailStr
    name: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: Optional[int] = None
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    """Schema for user registration request."""
    email: EmailStr = Field(..., description="User's email address")
    name: str = Field(..., min_length=2, max_length=100, description="User's full name")
    password: str = Field(..., min_length=6, description="User's password (min 6 characters)")

    class Config:
        json_schema_extra = {
            "example": {
                "email": "john@example.com",
                "name": "John Doe",
                "password": "securepassword123"
            }
        }


class UserLogin(BaseModel):
    """Schema for user login request."""
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., description="User's password")

    class Config:
        json_schema_extra = {
            "example": {
                "email": "john@example.com",
                "password": "securepassword123"
            }
        }


class Token(BaseModel):
    """Schema for JWT token response."""
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(default="bearer", description="Token type")
    user: Optional[dict] = Field(None, description="User information")

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "user": {
                    "id": "1",
                    "email": "john@example.com",
                    "name": "John Doe",
                    "role": "customer"
                }
            }
        }


class TokenData(BaseModel):
    """Schema for decoded JWT token payload."""
    user_id: Optional[int] = None
    email: Optional[str] = None
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
