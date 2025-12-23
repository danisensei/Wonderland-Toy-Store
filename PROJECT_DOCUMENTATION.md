# Wonderland Toy Store - Complete Project Documentation

**Project Name:** Wonderland Toy Store E-Commerce Management System  
**Version:** 1.0.0  
**Date:** December 23, 2025  
**Purpose:** A web-based object-oriented application for automating toy store operations and establishing a professional online marketplace.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [UML Diagrams](#uml-diagrams)
4. [Technology Stack](#technology-stack)
5. [Database Design](#database-design)
6. [API Endpoints](#api-endpoints)
7. [Frontend Components](#frontend-components)
8. [Object-Oriented Design Principles](#object-oriented-design-principles)
9. [Key Features](#key-features)
10. [Installation & Setup](#installation--setup)
11. [User Guide](#user-guide)

---

## 1. Project Overview

### Problem Statement
Wonderland Toy Store operates through manual stock control and over-the-counter sales, leading to:
- Delayed order handling
- Frequent record mismatches
- Limited business exposure
- No digital storefront

### Solution
A comprehensive web-based e-commerce platform that:
- **Automates inventory management**
- **Enables online order placement**
- **Provides admin control dashboard**
- **Implements real-time product synchronization**
- **Ensures data persistence**

### Target Users
1. **Customers** - Browse and purchase toys online
2. **Admins** - Manage inventory, products, and orders
3. **Store Managers** - Monitor sales and stock levels

---

## 2. System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (React.js)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Components: Header, ProductCard, CartPage, etc.    │   │
│  │  Context: AuthStore, CartStore, ProductStore       │   │
│  │  Services: API Client, Image Service                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER (FastAPI)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes: Auth, Products, Orders, Users, Admin       │   │
│  │  Middleware: CORS, Authentication, Validation       │   │
│  │  Port: 8000                                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ SQL
┌─────────────────────────────────────────────────────────────┐
│                  DATABASE LAYER (SQLite)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Tables: Users, Products, Orders, OrderItems        │   │
│  │  File: wonderland.db                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js 18+ | Dynamic UI Components |
| | TypeScript | Type-safe Code |
| | Tailwind CSS | Responsive Styling |
| | Zustand | State Management |
| **Backend** | FastAPI | REST API Framework |
| | Python 3.9+ | Backend Language |
| | SQLAlchemy | ORM |
| | Pydantic | Data Validation |
| **Database** | SQLite | Relational Database |
| **Security** | JWT | Token Authentication |
| | bcrypt | Password Hashing |
| | CORS | Cross-Origin Security |

---

## 3. UML Diagrams

### 3.1 Class Diagram - Core Domain Model

```
┌─────────────────────────────────────────────────────────────────┐
│                           USER                                   │
├─────────────────────────────────────────────────────────────────┤
│ - id: string (Primary Key)                                      │
│ - email: string (Unique)                                        │
│ - name: string                                                  │
│ - password_hash: string                                         │
│ - role: Enum [customer, admin]                                  │
│ - created_at: DateTime                                          │
│ - updated_at: DateTime                                          │
├─────────────────────────────────────────────────────────────────┤
│ + register(email, name, password): bool                         │
│ + login(email, password): Token                                 │
│ + update_profile(data): User                                    │
│ + change_password(old, new): bool                               │
│ + is_admin(): bool                                              │
└─────────────────────────────────────────────────────────────────┘
          ↑                                          ↑
          │ owns                                     │ places
          │                                          │
┌─────────────────────────────────┐    ┌──────────────────────────┐
│         PRODUCT                 │    │       ORDER              │
├─────────────────────────────────┤    ├──────────────────────────┤
│ - id: string                    │    │ - id: string             │
│ - name: string                  │    │ - order_number: string   │
│ - brand: string                 │    │ - user_id: FK            │
│ - price: float                  │    │ - total_amount: float    │
│ - quantity: int                 │    │ - status: Enum           │
│ - category: string              │    │ - delivery_address: str  │
│ - description: string           │    │ - city: string           │
│ - image: string (Base64)        │    │ - postal_code: string    │
│ - category_attributes: JSON     │    │ - created_at: DateTime   │
│ - created_at: DateTime          │    │ - updated_at: DateTime   │
├─────────────────────────────────┤    ├──────────────────────────┤
│ + create(): Product             │    │ + create(): Order        │
│ + update(data): Product         │    │ + cancel(): bool         │
│ + delete(): bool                │    │ + get_items(): list      │
│ + get_by_category(): list       │    │ + update_status(): bool  │
│ + search(query): list           │    └──────────────────────────┘
│ + is_in_stock(): bool           │              ↓
└─────────────────────────────────┘    ┌──────────────────────────┐
          ↓ contains                    │     ORDER_ITEM           │
          │                            ├──────────────────────────┤
          └────────────────────→ - order_id: FK
                                 - product_id: FK
                                 - quantity: int
                                 - price: float
                                 ├──────────────────────────┤
                                 + calculate_total(): float
                                 └──────────────────────────┘
```

### 3.2 Use Case Diagram - User Interactions

```
                              ╔════════════════════╗
                              ║   WONDERLAND       ║
                              ║   TOY STORE        ║
                              ╚════════════════════╝
                                       ↓

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │   CUSTOMER       │              │   ADMIN          │        │
│  └────────┬─────────┘              └────────┬─────────┘        │
│           │                                 │                   │
│           ├─ Browse Products ───────────────┼─ View Dashboard   │
│           │                                 │                   │
│           ├─ Search/Filter ────────┐        ├─ Add Product      │
│           │                        │        │                   │
│           ├─ View Product Details  │        ├─ Edit Product     │
│           │                        │        │                   │
│           ├─ Add to Cart ──────────┼───────── Upload Images    │
│           │                        │        │                   │
│           ├─ View Cart ────────────┼─ Delete Product           │
│           │                        │        │                   │
│           ├─ Checkout ─────────────┼─ Update Inventory         │
│           │                        │        │                   │
│           ├─ Place Order ──────────┼─ View Orders             │
│           │                        │        │                   │
│           ├─ View Orders ──────────┼─ Manage Order Status     │
│           │                        │        │                   │
│           └─ Update Profile ───────┴─ View Analytics          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Sequence Diagram - Login Flow

```
Customer          Frontend              Backend              Database
   │                 │                      │                    │
   │──────Login────→ │                      │                    │
   │                 │────POST /auth/login→ │                    │
   │                 │                      │──Query User────→   │
   │                 │                      │                    │
   │                 │                      │ ←─User Record─     │
   │                 │                      │                    │
   │                 │─Verify Password─┐   │                    │
   │                 │                 │   │                    │
   │                 │←─────Token──────┤   │                    │
   │                 │                      │                    │
   │←─────JWT────── │ ←─────Response─ │   │                    │
   │                 │                      │                    │
   │──Save Token──→  │                      │                    │
   │  (localStorage) │                      │                    │
   │                 │                      │                    │
   │─────Redirect──→ │                      │                    │
   │  (/admin)       │                      │                    │
   │                 │                      │                    │
```

### 3.4 State Diagram - Order Status

```
                    ┌─────────────┐
                    │  PENDING    │ ← Order Created
                    └──────┬──────┘
                           │ Admin Confirms
                           ↓
                    ┌─────────────┐
                    │ PROCESSING  │ ← Preparing Items
                    └──────┬──────┘
                           │ Ready to Ship
                           ↓
                    ┌─────────────┐
                    │  SHIPPED    │ ← Sent to Customer
                    └──────┬──────┘
                           │ Delivered
                           ↓
                    ┌─────────────┐
                    │ DELIVERED   │ ← Complete
                    └─────────────┘

                    Any Status ← Cancel Request
                           │
                           ↓
                    ┌─────────────┐
                    │ CANCELLED   │
                    └─────────────┘
```

### 3.5 Component Diagram - Frontend Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                         REACT FRONTEND                             │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────┐         ┌──────────────────┐               │
│  │  UI COMPONENTS   │         │  PAGES           │               │
│  ├──────────────────┤         ├──────────────────┤               │
│  │ • Header         │         │ • HomePage       │               │
│  │ • ProductCard    │         │ • ProductsPage   │               │
│  │ • CategoryFilter │────────→│ • CartPage       │               │
│  │ • Footer         │         │ • OrdersPage     │               │
│  │ • ProtectedRoute │         │ • ProfilePage    │               │
│  └──────────────────┘         │ • LoginPage      │               │
│           ↑                   │ • AdminDashboard │               │
│           │                   └──────────────────┘               │
│           │                          ↑                          │
│           │                          │                          │
│  ┌────────┴──────────┐      ┌────────┴─────────────┐            │
│  │  STATE MANAGEMENT │      │  API SERVICES        │            │
│  │  (Zustand Store)  │      ├──────────────────────┤            │
│  ├───────────────────┤      │ • apiClient          │            │
│  │ • authStore       │      │ • productService     │            │
│  │ • cartStore       │      │ • orderService       │            │
│  │ • productStore    │      │ • authService        │            │
│  └───────────────────┘      │ • imageService       │            │
│                             └──────────────────────┘            │
│                                      ↓                          │
│                            ┌──────────────────┐                │
│                            │  HTTP REQUESTS   │                │
│                            │  (to Backend)    │                │
│                            └──────────────────┘                │
│                                                                │
└────────────────────────────────────────────────────────────────────┘
```

### 3.6 Activity Diagram - Product Purchase Flow

```
                              ┌─────────┐
                              │ START   │
                              └────┬────┘
                                   ↓
                          ┌────────────────┐
                          │ Browse Products│
                          └────────┬───────┘
                                   ↓
                          ┌────────────────┐
                          │ Select Product │
                          └────────┬───────┘
                                   ↓
                          ┌────────────────┐
                        ╱ │ In Stock?      │ ╲
                    YES╱  └────────┬───────┘  ╲NO
                    ╱             │           ╲
              ┌────▼────┐     ┌────▼───────┐
              │Add to   │     │Show Error  │
              │Cart     │     │Out of Stock│
              └────┬────┘     └────┬───────┘
                   ↓              │
              ┌────────────────┐  │
              │View Cart       │◄─┘
              └────────┬───────┘
                       ↓
                    ╱─────╲
            YES    ╱ More  ╲   NO
                ╱ Shopping?╲
            ┌──▼──┐      ┌──▼──┐
            │Browse  │     │Checkout
            │Again   │     └──┬──┘
            └───┬────┘        │
                │         ┌───▼────────┐
                │         │Verify Cart │
                │         └───┬────────┘
                │             ↓
                │         ┌───────────────┐
                │    ╱────│Stock Enough?  │────╲
                │  YES    └───┬───────────┘    NO
                │        ┌────▼──┐         ┌───▼──┐
                │        │Confirm│        │Show  │
                │        │Order  │        │Error │
                │        └────┬──┘        └───┬──┘
                │             │              │
                │         ┌───▼────────────┐ │
                │         │Order Created   │◄┘
                │         │Status: Pending │
                │         └───┬────────────┘
                │             ↓
                ↓         ┌────────────┐
            ┌────────┐    │Send Email  │
            │ END    │    │Confirmation│
            └────────┘    └────┬───────┘
                               ↓
                          ┌────────────┐
                          │    END     │
                          └────────────┘
```

---

## 4. Database Design

### Entity-Relationship Diagram (ERD)

```
┌──────────────────────┐         ┌─────────────────────┐
│      USERS           │         │     PRODUCTS        │
├──────────────────────┤         ├─────────────────────┤
│ PK id                │         │ PK id               │
│    email (UNIQUE)    │         │    name             │
│    name              │         │    brand            │
│    password_hash     │         │    price            │
│    role              │         │    quantity         │
│    created_at        │         │    category         │
│    updated_at        │         │    description      │
└──────────────────────┘         │    image            │
         │                       │    categoryAttributes
         │ 1                     │    created_at       │
         │                       └─────────────────────┘
         │ M
         │
         │ 1
         │
    ┌────▼──────────────────┐
    │      ORDERS           │
    ├───────────────────────┤
    │ PK id                 │
    │ FK user_id            │
    │    order_number       │
    │    total_amount       │
    │    status             │
    │    delivery_address   │
    │    city               │
    │    postal_code        │
    │    created_at         │
    │    updated_at         │
    └───────┬───────────────┘
            │ 1
            │
            │ M
            │
    ┌───────▼────────────────┐
    │   ORDER_ITEMS          │
    ├────────────────────────┤
    │ PK order_id            │
    │ PK product_id          │
    │ FK order_id            │
    │ FK product_id          │
    │    quantity            │
    │    price               │
    └────────────────────────┘
            │ M
            │
            │ 1
            │
            └─────→ PRODUCTS
```

### Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    password_hash VARCHAR NOT NULL,
    role VARCHAR DEFAULT 'customer',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    brand VARCHAR NOT NULL,
    price FLOAT NOT NULL,
    quantity INTEGER NOT NULL,
    category VARCHAR NOT NULL,
    description VARCHAR,
    image LONGTEXT,
    category_attributes JSON,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id VARCHAR PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    order_number VARCHAR UNIQUE,
    total_amount FLOAT,
    status VARCHAR DEFAULT 'pending',
    delivery_address VARCHAR,
    city VARCHAR,
    postal_code VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id VARCHAR NOT NULL,
    product_id VARCHAR NOT NULL,
    quantity INTEGER,
    price FLOAT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

---

## 5. API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| POST | `/register` | Register new user | `{email, name, password}` | `{access_token, user}` |
| POST | `/login` | Login user | `{email, password}` | `{access_token, user}` |
| POST | `/logout` | Logout user | - | `{message}` |
| GET | `/me` | Get current user | Bearer Token | `{user}` |
| PUT | `/profile` | Update profile | `{name?, email?}` | `{user}` |
| POST | `/change-password` | Change password | `{old_password, new_password}` | `{message}` |

### Products Routes (`/api/products`)

| Method | Endpoint | Description | Query/Body | Response |
|--------|----------|-------------|-----------|----------|
| GET | `/` | Get all products | `?category=&skip=&limit=` | `[products]` |
| GET | `/{id}` | Get single product | - | `{product}` |
| POST | `/` | Create product | `{name, brand, price, ...}` | `{product}` |
| PUT | `/{id}` | Update product | `{updates}` | `{product}` |
| DELETE | `/{id}` | Delete product | - | `{message}` |
| GET | `/search/{query}` | Search products | - | `[products]` |

### Orders Routes (`/api/orders`)

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| POST | `/` | Create order | `{items[], address, city}` | `{order}` |
| GET | `/my-orders` | Get user's orders | Bearer Token | `[orders]` |
| GET | `/{id}` | Get order details | - | `{order}` |
| PUT | `/{id}/cancel` | Cancel order | - | `{order}` |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/dashboard` | View dashboard stats | `{stats}` |
| GET | `/orders` | Get all orders | `[orders]` |
| GET | `/analytics` | Get sales analytics | `{analytics}` |
| PUT | `/orders/{id}/status` | Update order status | `{order}` |

---

## 6. Frontend Components

### Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── CartIcon
│   └── UserMenu
├── Main Content (Routes)
│   ├── HomePage
│   │   ├── Hero Section
│   │   └── Featured Products
│   ├── ProductsPage
│   │   ├── CategoryFilter
│   │   ├── ProductGrid
│   │   │   └── ProductCard[]
│   │   └── Pagination
│   ├── CartPage
│   │   ├── CartItems
│   │   ├── CartSummary
│   │   └── CheckoutForm
│   ├── OrdersPage
│   │   └── OrderList[]
│   ├── ProfilePage
│   │   ├── UserInfo
│   │   └── EditForm
│   ├── AdminDashboard
│   │   ├── ProductManagement
│   │   ├── OrderManagement
│   │   └── Analytics
│   └── LoginPage
│       └── LoginForm
└── Footer
    ├── Links
    └── Copyright
```

### Key Components

```typescript
// ProductCard Component
ProductCard
├── Props: product: Product
├── State: quantity: number
├── Methods: 
│   ├── addToCart()
│   ├── viewDetails()
│   └── updateQuantity()
└── Renders: Image, Name, Price, AddButton

// Header Component
Header
├── Props: none
├── State: isMobileMenuOpen: boolean
├── Context: useAuthStore, useCartStore
├── Methods:
│   ├── handleLogout()
│   └── toggleMenu()
└── Renders: Logo, Nav, UserMenu, Cart

// AdminDashboard Component
AdminDashboard
├── Props: none
├── State: selectedTab: string
├── Context: useProductStore, useAuthStore
├── Methods:
│   ├── handleAddProduct()
│   ├── handleEditProduct()
│   ├── handleDeleteProduct()
│   └── handleUploadImage()
└── Renders: ProductForm, ProductTable
```

---

## 7. Object-Oriented Design Principles

### 1. **Encapsulation**
- **Frontend**: State management encapsulated in Zustand stores
  ```typescript
  // authStore.ts - encapsulates user authentication logic
  const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    login: async (email, password) => { ... },
    logout: () => { ... },
    isAdmin: () => { ... }
  }));
  ```

- **Backend**: Data models encapsulate attributes and methods
  ```python
  # User model encapsulates user-related operations
  class User(Base):
      id: str
      email: str
      name: str
      password_hash: str
      role: str
      
      def verify_password(self, password: str) -> bool:
          return verify_password(password, self.password_hash)
  ```

### 2. **Inheritance**
- **Product Categories** - Polymorphic handling of product types:
  ```
  Product (Base)
  ├── ElectronicToy (batteryType, voltage)
  ├── PlushToy (material, size)
  └── BoardGame (ageRange, numberOfPlayers)
  ```

### 3. **Abstraction**
- **Service Layer** - Abstract API interactions
  ```typescript
  // productService abstracts backend API calls
  export const productService = {
    getAllProducts: async () => { ... },
    createProduct: async (data) => { ... },
    updateProduct: async (id, data) => { ... }
  }
  ```

### 4. **Polymorphism**
- **Component Composition** - Different forms use same interface:
  ```typescript
  interface FormProps {
    onSubmit: (data: FormData) => Promise<void>;
    initialData?: FormData;
  }
  
  // LoginForm, SignupForm, ProfileForm all use FormProps
  ```

### 5. **Low Coupling, High Cohesion**
- **Separation of Concerns**:
  - Components handle UI rendering
  - Services handle API calls
  - Stores handle state management
  - Models handle data structure

---

## 8. Key Features

### ✅ Implemented Features

#### Customer Features
- [x] User registration and login
- [x] Browse products with search and filter
- [x] Add products to shopping cart
- [x] Real-time cart updates
- [x] Order checkout and placement
- [x] Order history view
- [x] User profile management
- [x] Product image viewing

#### Admin Features
- [x] Admin authentication
- [x] Product CRUD operations
- [x] Product image upload
- [x] Inventory management
- [x] Real-time product synchronization
- [x] Order management
- [x] Dashboard with statistics

#### Technical Features
- [x] JWT authentication
- [x] CORS enabled
- [x] Data persistence (localStorage)
- [x] Real-time state synchronization
- [x] Responsive design
- [x] Error handling and validation

### 📊 Category-Specific Attributes

```
Electronic Toys:
├── batteryType (AA, AAA, USB, Solar)
├── voltage (3V, 6V, 12V)
└── compatibility (age range)

Plush Toys:
├── material (cotton, polyester, fleece)
├── size (small, medium, large)
└── washable (yes/no)

Board Games:
├── ageRange (3-5, 5-8, 8-12, 12+)
├── numberOfPlayers (2-4, 4-6, 2+)
└── difficulty (easy, medium, hard)
```

---

## 9. Installation & Setup

### Prerequisites
- Node.js 16+
- Python 3.9+
- npm or yarn
- Git

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env

# Start development server
npm start
# Runs on http://localhost:3000
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "SECRET_KEY=your-secret-key-here" > .env
echo "DATABASE_URL=sqlite:///./wonderland.db" >> .env

# Start server
python -m uvicorn main:app --host 0.0.0.0 --port 8000
# Runs on http://localhost:8000
```

### Access the Application

```
Frontend: http://localhost:3000
Backend API: http://localhost:8000
API Docs: http://localhost:8000/docs
```

---

## 10. User Guide

### For Customers

#### Registration
1. Click "Sign Up" on homepage
2. Enter email, name, and password
3. Click "Register"
4. You'll be logged in automatically

#### Shopping
1. Browse products on "Products" page
2. Use search bar to find specific items
3. Filter by category (Electronic, Plush, BoardGame)
4. Click on product to see details and image
5. Add desired quantity to cart
6. View cart summary
7. Click checkout
8. Enter delivery information
9. Place order

#### Viewing Orders
1. Go to "My Orders" page (requires login)
2. View all your placed orders
3. Check order status (pending, processing, shipped, delivered)
4. See order details and items

### For Admins

#### Login
1. Go to http://localhost:3000/login
2. Enter credentials:
   - Email: `admin@wonderland.com`
   - Password: `admin123`
3. You'll be redirected to admin dashboard

#### Managing Products
1. **Add Product**:
   - Click "Add Product"
   - Fill product details (name, brand, price, quantity, category)
   - Upload product image
   - Click "Save"

2. **Edit Product**:
   - Click "Edit" on product
   - Modify details
   - Upload new image if needed
   - Click "Update"

3. **Delete Product**:
   - Click "Delete" on product
   - Confirm deletion

#### Managing Inventory
1. View all products with quantities
2. Update product quantities directly
3. Track stock levels
4. Set products as in/out of stock

#### Viewing Orders
1. Go to "Orders" section
2. View all customer orders
3. Update order status
4. View order details and items

---

## Testing

### Test Credentials

```
Admin Account:
Email: admin@wonderland.com
Password: admin123

Customer Account:
Email: customer@example.com
Password: customer123
```

### Test Scenarios

#### Test 1: Customer Registration & Login
1. Sign up with new email
2. Verify user is created
3. Login with credentials
4. Verify redirected to home page

#### Test 2: Product Management
1. Login as admin
2. Add new product with image
3. Verify product appears on products page
4. Edit product details
5. Delete product
6. Verify deletion

#### Test 3: Shopping Flow
1. Login as customer
2. Browse products
3. Add product to cart
4. Update quantity
5. Checkout
6. Place order
7. View order in my orders

#### Test 4: Real-time Sync
1. Open admin dashboard in one window
2. Open products page in another window
3. Add product in admin
4. Verify it appears in products page without refresh

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Backend not running** | Start: `python -m uvicorn main:app --port 8000` |
| **Frontend can't connect** | Check .env REACT_APP_API_URL is correct |
| **Login fails** | Verify backend is running and credentials are correct |
| **Images not showing** | Check image upload is successful and base64 is valid |
| **Port already in use** | Change port or kill process using port |
| **Module not found** | Run `npm install` (frontend) or `pip install -r requirements.txt` (backend) |

---

## Performance Considerations

### Frontend Optimization
- Component memoization to prevent unnecessary re-renders
- Lazy loading for images
- Code splitting for routes
- Zustand for efficient state updates

### Backend Optimization
- Database indexing on frequently queried fields
- Query optimization with SQLAlchemy
- Connection pooling for database
- Caching for frequently accessed data

### Scalability Improvements
- Move to PostgreSQL for production
- Implement Redis caching
- Use CDN for images
- Add API rate limiting
- Implement database replication

---

## Conclusion

The Wonderland Toy Store e-commerce platform successfully demonstrates:
- ✅ Complete full-stack web application
- ✅ Modern technologies (React, FastAPI, TypeScript)
- ✅ Object-oriented design principles
- ✅ Professional UI/UX
- ✅ Secure authentication
- ✅ Real-time data synchronization
- ✅ Scalable architecture

This project provides a solid foundation for a production-ready e-commerce system and can be extended with additional features like payment integration, advanced analytics, and machine learning recommendations.

---

**Document Version:** 1.0  
**Last Updated:** December 23, 2025  
**Author:** Development Team  
**For:** Academic Submission

