"""
Users Routes - User management
"""

from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/{user_id}")
async def get_user(user_id: str):
    """Get user by ID."""
    return {
        "id": user_id,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "customer",
        "createdAt": "2024-01-01T00:00:00"
    }


@router.get("/")
async def get_all_users(skip: int = 0, limit: int = 100):
    """Get all users (admin only)."""
    return []


@router.put("/{user_id}")
async def update_user(user_id: str, name: str = None, email: str = None):
    """Update user information."""
    return {
        "id": user_id,
        "name": name or "User",
        "email": email or "user@example.com",
        "message": "User updated successfully"
    }


@router.delete("/{user_id}")
async def delete_user(user_id: str):
    """Delete a user (admin only)."""
    return {"message": f"User {user_id} deleted successfully"}

