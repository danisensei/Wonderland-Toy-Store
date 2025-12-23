"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
Security utilities for password hashing and JWT tokens.
"""
import os
=======
Security Utilities - Password hashing and JWT token management
"""

>>>>>>> Stashed changes
=======
Security Utilities - Password hashing and JWT token management
"""

>>>>>>> Stashed changes
=======
Security Utilities - Password hashing and JWT token management
"""

>>>>>>> Stashed changes
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "wonderland-secret-key")
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "wonderland-toy-store-secret-key")
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))


<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password.
    
    Args:
        plain_password: The plain text password
        hashed_password: The hashed password from database
        
    Returns:
        bool: True if password matches, False otherwise
    """
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    return bcrypt.checkpw(
        plain_password.encode('utf-8'),
        hashed_password.encode('utf-8')
    )


<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
def get_password_hash(password: str) -> str:
    """
    Hash a password using bcrypt.
    
    Args:
        password: The plain text password
        
    Returns:
        str: The hashed password
    """
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token.
    
    Args:
        data: Dictionary containing data to encode (e.g., user_id, email)
        expires_delta: Optional custom expiration time
        
    Returns:
        str: Encoded JWT token
    """
    to_encode = data.copy()
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    return encoded_jwt


def verify_token(token: str) -> Optional[dict]:
    """Verify and decode a JWT token."""
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    
    return encoded_jwt


def decode_access_token(token: str) -> Optional[dict]:
    """
    Decode and verify a JWT access token.
    
    Args:
        token: The JWT token to decode
        
    Returns:
        dict: Decoded token payload if valid, None if invalid
    """
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
