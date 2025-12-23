"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
Authentication routes.
"""
=======
Authentication Routes - Register, Login, and Get Current User
"""

>>>>>>> Stashed changes
=======
Authentication Routes - Register, Login, and Get Current User
"""

>>>>>>> Stashed changes
=======
Authentication Routes - Register, Login, and Get Current User
"""

>>>>>>> Stashed changes
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
from utils.deps import get_db, get_current_user
from utils.security import hash_password, verify_password, create_access_token
from schemas.auth import UserCreate, UserLogin, Token
from schemas.user import UserResponse
from db_models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from schemas.auth import UserCreate, UserLogin, Token
from schemas.user import UserResponse
from db_models.user import User
from utils.deps import get_db, get_current_user
from utils.security import get_password_hash, verify_password, create_access_token


router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user account.
    
    Args:
        user_data: User registration data (email, name, password)
        db: Database session
        
    Returns:
        Token: JWT access token and user info
    """
    # Check if email already exists
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    hashed_pw = hash_password(user_data.password)
    new_user = User(
        email=user_data.email,
        name=user_data.name,
        hashed_password=hashed_pw,
        role="customer"
    )
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        email=user_data.email,
        name=user_data.name,
        password_hash=hashed_password,
        role="customer"
    )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    access_token = create_access_token(data={"sub": str(new_user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    # Create access token
    access_token = create_access_token(data={
        "user_id": new_user.id,
        "email": new_user.email
    })
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user={
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            "id": str(new_user.id),
            "email": new_user.email,
            "name": new_user.name,
            "role": new_user.role,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            "createdAt": new_user.created_at.isoformat() if new_user.created_at else ""
        }
    }


@router.post("/login", response_model=Token)
async def login_oauth2(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """OAuth2 compatible login endpoint."""
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            "createdAt": new_user.created_at.isoformat() if new_user.created_at else None
        }
    )


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Login with email and password to get JWT token.
    Uses OAuth2 password flow (username field is used for email).
    
    Args:
        form_data: OAuth2 form with username (email) and password
        db: Database session
        
    Returns:
        Token: JWT access token and user info
    """
    # Find user by email (username field in OAuth2 form)
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.password_hash):
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login/json")
async def login_json(user_data: UserLogin, db: Session = Depends(get_db)):
    """JSON login endpoint returning user data with token."""
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    # Create access token
    access_token = create_access_token(data={
        "user_id": user.id,
        "email": user.email
    })
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user={
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            "id": str(user.id),
            "email": user.email,
            "name": user.name,
            "role": user.role,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            "createdAt": user.created_at.isoformat() if user.created_at else ""
        }
    }


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current authenticated user info."""
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            "createdAt": user.created_at.isoformat() if user.created_at else None
        }
    )


@router.post("/login/json", response_model=Token)
async def login_json(user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Login with JSON body (alternative to OAuth2 form).
    
    Args:
        user_data: Login data (email, password)
        db: Database session
        
    Returns:
        Token: JWT access token and user info
    """
    # Find user by email
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not verify_password(user_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(data={
        "user_id": user.id,
        "email": user.email
    })
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user={
            "id": str(user.id),
            "email": user.email,
            "name": user.name,
            "role": user.role,
            "createdAt": user.created_at.isoformat() if user.created_at else None
        }
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """
    Get the current authenticated user's information.
    
    Args:
        current_user: The authenticated user (from JWT)
        
    Returns:
        UserResponse: Current user's information
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
