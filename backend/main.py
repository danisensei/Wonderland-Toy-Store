"""
Wonderland Toy Store - FastAPI Backend
<<<<<<< Updated upstream
<<<<<<< Updated upstream
Main application entry point.
"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import engine, Base
from routes import auth_router, products_router, orders_router, users_router, admin_router

# Load environment variables
load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    print("🏪 Starting Wonderland Toy Store API...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    yield
    print("👋 Shutting down Wonderland Toy Store API...")


app = FastAPI(
    title="Wonderland Toy Store API",
    description="Backend API for the Wonderland Toy Store e-commerce platform",
=======
=======
>>>>>>> Stashed changes
Main application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import database and routes
from database import init_db
from routes.auth import router as auth_router
from routes.products import router as products_router
from routes.orders import router as orders_router
from routes.users import router as users_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    print("[START] Starting Wonderland Toy Store API...")
    init_db()
    print("[OK] Database initialized!")
    print("[DOCS] API Documentation available at: http://localhost:8000/docs")
    yield
    # Shutdown
    print("[STOP] Shutting down Wonderland Toy Store API...")


# Create FastAPI application
app = FastAPI(
    title="Wonderland Toy Store API",
    description="""
    **Wonderland Toy Store** - E-commerce API for toys and games.
    
    ## Features
    - User authentication (Register, Login, JWT)
    - Product management (CRUD operations)
    - Order management
    - User profiles
    
    ## Categories
    - **Electronic** - Interactive and tech-filled toys
    - **Plush** - Soft and cuddly companions
    - **BoardGame** - Fun games for families and friends
    """,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
<<<<<<< Updated upstream
<<<<<<< Updated upstream
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
=======
=======
>>>>>>> Stashed changes
# Allow the frontend to make requests to this API
origins = [
    "http://localhost:3000",      # React dev server
    "http://localhost:3001",      # Alternative port
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< Updated upstream
<<<<<<< Updated upstream
# Include routers with /api prefix
app.include_router(auth_router, prefix="/api")
app.include_router(products_router, prefix="/api")
app.include_router(orders_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(admin_router, prefix="/api")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to Wonderland Toy Store API! 🧸",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "wonderland-api"}
=======
=======
>>>>>>> Stashed changes
# Include routers
app.include_router(auth_router)
app.include_router(products_router)
app.include_router(orders_router)
app.include_router(users_router)


@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - API health check and welcome message.
    """
    return {
        "message": "Welcome to Wonderland Toy Store API!",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "healthy"
    }


@app.get("/api/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring.
    """
    return {
        "status": "healthy",
        "service": "wonderland-toy-store-api"
    }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes


if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    print(f"🚀 Starting server on http://{host}:{port}")
    print(f"📚 API Docs available at http://{host}:{port}/docs")
    
=======
    print(f"[START] Starting server on http://{host}:{port}")
>>>>>>> Stashed changes
=======
    print(f"[START] Starting server on http://{host}:{port}")
>>>>>>> Stashed changes
    uvicorn.run("main:app", host=host, port=port, reload=debug)
