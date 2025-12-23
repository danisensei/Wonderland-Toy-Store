"""
Authentication Routes - Register, Login, and Get Current User
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import jwt
from passlib.context import CryptContext

load_dotenv()

# Pydantic models
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    name: str
    password: str

router = APIRouter()

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def hash_password(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None):
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/register")
async def register(user_data: RegisterRequest):
    """Register a new user."""
    return {
        "message": "User registered successfully",
        "user": {
            "id": "1",
            "email": user_data.email,
            "name": user_data.name,
            "role": "customer",
            "createdAt": datetime.utcnow().isoformat()
        },
        "access_token": create_access_token({"sub": user_data.email}),
        "token_type": "bearer"
    }


@router.post("/login")
async def login(login_data: LoginRequest):
    """Login user."""
    # For demo purposes, accept any credentials
    return {
        "access_token": create_access_token({"sub": login_data.email}),
        "token_type": "bearer",
        "user": {
            "id": "1",
            "email": login_data.email,
            "name": login_data.email.split("@")[0],
            "role": "customer",
            "createdAt": datetime.utcnow().isoformat()
        }
    }


@router.post("/logout")
async def logout():
    """Logout user."""
    return {"message": "Logged out successfully"}


@router.get("/me")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Get current user information."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

    return {
        "id": "1",
        "email": email,
        "name": email.split("@")[0],
        "role": "customer",
        "createdAt": datetime.utcnow().isoformat()
    }


@router.put("/profile")
async def update_profile(name: str = None, email: str = None, token: str = Depends(oauth2_scheme)):
    """Update user profile."""
    return {
        "message": "Profile updated",
        "user": {
            "id": "1",
            "email": email or "user@example.com",
            "name": name or "User",
            "role": "customer"
        }
    }


@router.post("/change-password")
async def change_password(old_password: str, new_password: str, token: str = Depends(oauth2_scheme)):
    """Change user password."""
    return {"message": "Password changed successfully"}

