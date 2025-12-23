"""
<<<<<<< Updated upstream
Database configuration and setup for Wonderland Toy Store.
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
=======
Database Configuration - SQLAlchemy setup for Wonderland Toy Store
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
>>>>>>> Stashed changes
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

<<<<<<< Updated upstream
# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./wonderland.db")

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
=======
# Database URL from environment or default to SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./wonderland.db")

# Create SQLAlchemy engine
# For SQLite, we need connect_args to allow multi-threading
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(DATABASE_URL)

# Create SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for declarative models
>>>>>>> Stashed changes
Base = declarative_base()


def get_db():
<<<<<<< Updated upstream
    """Dependency to get database session."""
=======
    """
    Dependency function to get database session.
    Yields a database session and ensures it's closed after use.
    """
>>>>>>> Stashed changes
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
<<<<<<< Updated upstream
    """Initialize the database by creating all tables."""
    from db_models import User, DBProduct, Order, OrderItem
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully!")
=======
    """
    Initialize the database by creating all tables.
    Called on application startup.
    """
    from db_models import user, product, order  # Import all models
    Base.metadata.create_all(bind=engine)
    print("[OK] Database tables created successfully!")
>>>>>>> Stashed changes
