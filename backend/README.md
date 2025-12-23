# Wonderland Toy Store - Backend API

A FastAPI-powered REST API for the Wonderland Toy Store e-commerce application.

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- pip (Python package manager)

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Seed the database with sample data:**
   ```bash
   python seed_data.py
   ```

5. **Start the server:**
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

6. **Access the API:**
   - API: http://localhost:8000
   - Swagger Docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login (OAuth2 form) |
| POST | `/api/auth/login/json` | Login (JSON body) |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products?category=Electronic` | Filter by category |
| GET | `/api/products/search?q=robot` | Search products |
| GET | `/api/products/{id}` | Get single product |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/{id}` | Update product (admin) |
| DELETE | `/api/products/{id}` | Delete product (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/my-orders` | Get user's orders |
| GET | `/api/orders/{id}` | Get order details |
| PUT | `/api/orders/{id}/cancel` | Cancel order |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update profile |

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@wonderland.com | admin123 |
| Customer | demo@example.com | demo123 |

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI entry point
├── database.py             # Database configuration
├── requirements.txt        # Python dependencies
├── seed_data.py           # Database seeding script
├── .env                   # Environment variables
├── db_models/             # SQLAlchemy models
│   ├── user.py
│   ├── product.py
│   └── order.py
├── schemas/               # Pydantic schemas
│   ├── auth.py
│   ├── user.py
│   ├── product.py
│   └── order.py
├── routes/                # API routes
│   ├── auth.py
│   ├── products.py
│   ├── orders.py
│   └── users.py
├── utils/                 # Utilities
│   ├── security.py        # JWT & password hashing
│   └── deps.py           # FastAPI dependencies
└── models/               # OOP product models
    ├── product.py
    ├── electronic_toy.py
    ├── plush_toy.py
    └── board_game.py
```

## ⚙️ Environment Variables

Create a `.env` file with the following:

```env
DATABASE_URL=sqlite:///./wonderland.db
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

## 🧪 Testing the API

You can test the API using the Swagger UI at `http://localhost:8000/docs` or using curl:

```bash
# Register a new user
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "name": "Test User", "password": "test123"}'

# Login
curl -X POST "http://localhost:8000/api/auth/login/json" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'

# Get all products
curl "http://localhost:8000/api/products"

# Get products by category
curl "http://localhost:8000/api/products?category=Electronic"
```
