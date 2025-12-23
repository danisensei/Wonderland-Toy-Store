"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
User routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from utils.deps import get_db, get_current_user
from schemas.user import UserResponse, UserUpdate
from db_models import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile."""
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
User Routes - User profile management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from schemas.user import UserResponse, UserUpdate
from db_models.user import User
from utils.deps import get_db, get_current_user


router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/profile", response_model=UserResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    """
    Get the current user's profile.
    
    Args:
        current_user: Authenticated user
        
    Returns:
        User profile information
    """
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        name=current_user.name,
        role=current_user.role,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        createdAt=current_user.created_at.isoformat() if current_user.created_at else ""
    )


@router.put("/me", response_model=UserResponse)
async def update_profile(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update current user profile."""
    if update_data.email:
        existing = db.query(User).filter(
            User.email == update_data.email,
            User.id != current_user.id
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use by another account"
            )
        current_user.email = update_data.email
    
    if update_data.name:
        current_user.name = update_data.name
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        createdAt=current_user.created_at.isoformat() if current_user.created_at else None
    )


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update the current user's profile.
    
    Args:
        user_data: Updated user data
        db: Database session
        current_user: Authenticated user
        
    Returns:
        Updated user profile
    """
    # Check if email is being changed and if it's already in use
    if user_data.email and user_data.email != current_user.email:
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use"
            )
        current_user.email = user_data.email
    
    # Update name if provided
    if user_data.name:
        current_user.name = user_data.name
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    
    db.commit()
    db.refresh(current_user)
    
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        name=current_user.name,
        role=current_user.role,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        createdAt=current_user.created_at.isoformat() if current_user.created_at else ""
=======
        createdAt=current_user.created_at.isoformat() if current_user.created_at else None
>>>>>>> Stashed changes
=======
        createdAt=current_user.created_at.isoformat() if current_user.created_at else None
>>>>>>> Stashed changes
=======
        createdAt=current_user.created_at.isoformat() if current_user.created_at else None
>>>>>>> Stashed changes
    )
