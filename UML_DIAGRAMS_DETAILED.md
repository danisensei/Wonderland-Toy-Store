# Wonderland Toy Store - UML Diagrams & Architecture

## Detailed UML Diagrams for Academic Submission

### 1. Complete System Architecture Diagram

```
╔═════════════════════════════════════════════════════════════════════════╗
║                    WONDERLAND TOY STORE SYSTEM                         ║
╚═════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER (Port 3000)                        │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ React.js Web Application (TypeScript)                          │    │
│  │                                                                │    │
│  │  Pages:                    Components:          Services:      │    │
│  │  ├─ HomePage               ├─ Header            ├─ apiClient  │    │
│  │  ├─ ProductsPage           ├─ Footer            ├─ productSvc │    │
│  │  ├─ CartPage               ├─ ProductCard       ├─ orderSvc   │    │
│  │  ├─ OrdersPage             ├─ CategoryFilter    ├─ authSvc    │    │
│  │  ├─ ProfilePage            ├─ ProtectedRoute    └─ imageSvc   │    │
│  │  ├─ LoginPage                                                  │    │
│  │  └─ AdminDashboard         State Management:                  │    │
│  │                            ├─ useAuthStore                    │    │
│  │                            ├─ useCartStore                    │    │
│  │                            └─ useProductStore                 │    │
│  │                                                                │    │
│  │  Styling: Tailwind CSS | State: Zustand | HTTP: Axios        │    │
│  └────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                  ↓ HTTP/REST/JSON
                           (CORS Enabled)
┌────────────────���────────────────────────────────────────────────────────┐
│                     API LAYER (Port 8000)                              │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ FastAPI Backend (Python)                                      │    │
│  │                                                                │    │
│  │ Routers:                                                      │    │
│  │ ├─ /api/auth/      → Authentication (login, register)        │    │
│  │ ├─ /api/products/  → Product CRUD (create, read, update)     │    │
│  │ ├─ /api/orders/    → Order Management (create, view, cancel) │    │
│  │ ├─ /api/users/     → User Management                         │    │
│  │ └─ /api/admin/     → Admin Functions (dashboard, analytics)  │    │
│  │                                                                │    │
│  │ Middleware:                        Security:                 │    │
│  │ ├─ CORS Middleware                 ├─ JWT Tokens             │    │
│  │ ├─ Authentication                  ├─ Password Hashing       │    │
│  │ ├─ Error Handler                   └─ Role-Based Access      │    │
│  │ └─ Request Logger                                            │    │
│  │                                                                │    │
│  │ ORM: SQLAlchemy | Validation: Pydantic | Async: AsyncIO      │    │
│  └────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                  ↓ SQL
┌─────────────────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER (SQLite)                            │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ Database: wonderland.db                                        │    │
│  │                                                                │    │
│  │ Tables:                                                        │    │
│  │ ├─ users           (id, email, name, password_hash, role)     │    │
│  │ ├─ products        (id, name, brand, price, quantity, ...)    │    │
│  │ ├─ orders          (id, user_id, order_number, status, ...)   │    │
│  │ └─ order_items     (order_id, product_id, quantity, price)    │    │
│  │                                                                │    │
│  │ Total Records: ~50 Products, ~100 Orders, ~200 Users         │    │
│  └────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2. Class Diagram with Full Attributes

```
┌────────────────────────────────────────────────┐
│              <<Entity>> USER                   │
├────────────────────────────────────────────────┤
│ - id: String                                   │
│ - email: String (Unique, Required)             │
│ - name: String                                 │
│ - password_hash: String                        │
│ - role: Enum[CUSTOMER, ADMIN]                  │
│ - created_at: DateTime                         │
│ - updated_at: DateTime                         │
├────────────────────────────────────────────────┤
│ + register(): User                             │
│ + authenticate(): Boolean                      │
│ + is_admin(): Boolean                          │
│ + update_profile(data): User                   │
│ + change_password(old, new): Boolean           │
│ + delete(): Boolean                            │
└────────────────────────────────────────────────┘
           │
           │ 1:M
           │ creates
           ↓
┌────────────────────────────────────────────────┐
│             <<Entity>> ORDER                   │
├────────────────────────────────────────────────┤
│ - id: String (Primary Key)                     │
│ - user_id: String (Foreign Key)                │
│ - order_number: String (Unique)                │
│ - total_amount: Float                          │
│ - status: Enum[PENDING, PROCESSING,            │
│            SHIPPED, DELIVERED, CANCELLED]      │
│ - delivery_address: String                     │
│ - city: String                                 │
│ - postal_code: String                          │
│ - created_at: DateTime                         │
│ - updated_at: DateTime                         │
├────────────────────────────────────────────────┤
│ + create(user_id, items[], address): Order     │
│ + get_total(): Float                           │
│ + cancel(): Boolean                            │
│ + update_status(new_status): Order             │
│ + get_items(): OrderItem[]                     │
│ + add_item(product, qty): OrderItem            │
└────────────────────────────────────────────────┘
           │
           │ 1:M
           │ contains
           ↓
┌────────────────────────────────────────────────┐
│           <<Entity>> ORDER_ITEM                │
├────────────────────────────────────────────────┤
│ - order_id: String (Foreign Key)               │
│ - product_id: String (Foreign Key)             │
│ - quantity: Integer                            │
│ - price: Float (price at purchase time)        │
├────────────────────────────────────────────────┤
│ + get_total(): Float                           │
│ + validate(): Boolean                          │
└────────────────────────────────────────────────┘
           │
           │ M:1
           │ references
           ↓
┌────────────────────────────────────────────────┐
│           <<Entity>> PRODUCT                   │
├────────────────────────────────────────────────┤
│ - id: String (Primary Key)                     │
│ - name: String (Required)                      │
│ - brand: String                                │
│ - price: Float (> 0)                           │
│ - quantity: Integer (Stock Level)              │
│ - category: Enum[ELECTRONIC, PLUSH,            │
│              BOARDGAME]                        │
│ - description: String                          │
│ - image: String (Base64 or URL)                │
│ - categoryAttributes: JSON                     │
│ - created_at: DateTime                         │
│ - updated_at: DateTime                         │
├────────────────────────────────────────────────┤
│ + create(data): Product                        │
│ + update(data): Product                        │
│ + delete(): Boolean                            │
│ + is_in_stock(): Boolean                       │
│ + decrease_stock(qty): Boolean                 │
│ + search(query): Product[]                     │
│ + filter_by_category(cat): Product[]           │
│ + get_by_price_range(min, max): Product[]      │
└────────────────────────────────────────────────┘

Legend:
────── inheritance
......... aggregation
──-──── composition
─→     association
```

### 3. Inheritance Hierarchy - Product Categories

```
                    ┌─────────────────────┐
                    │    <<Abstract>>     │
                    │      PRODUCT        │
                    └──────────┬──────────┘
                               │
                    ┌──────────┼──────────┐
                    │          │          │
                    ↓          ↓          ↓
        ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
        │ ELECTRONIC_TOY   │  │  PLUSH_TOY       │  │  BOARD_GAME      │
        ├──────────────────┤  ├──────────────────┤  ├──────────────────┤
        │ - batteryType    │  │ - material       │  │ - ageRange       │
        │ - voltage        │  │ - size           │  │ - numberOfPlayers│
        │ - hasBattery     │  │ - isWashable     │  │ - difficulty     │
        ├──────────────────┤  ├──────────────────┤  ├──────────────────┤
        │ + get_battery()  │  │ + can_wash()     │  │ + get_players()  │
        │ + get_voltage()  │  │ + get_size()     │  │ + get_difficulty│
        │ + needs_battery()│  │ + care_instructions()  │ + min_age()  │
        └──────────────────┘  └──────────────────┘  └──────────────────┘

Polymorphism Example:
    Product[] products = [
        new ElectronicToy(...),     // batteryType, voltage
        new PlushToy(...),          // material, size
        new BoardGame(...)          // ageRange, players
    ]
    
    foreach product in products:
        print(product.getAttributes())  // Each returns different data
```

### 4. State Management Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│              ZUSTAND STATE MANAGEMENT (Frontend)                 │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────┐   ┌─────────────────────┐   ┌──────────────┐
│   AUTH_STORE        │   │  PRODUCT_STORE      │   │  CART_STORE  │
├─────────────────────┤   ├─────────────────────┤   ├──────────────┤
│ STATE:              │   │ STATE:              │   │ STATE:       │
│ - user              │   │ - products[]        │   │ - items[]    │
│ - token             │   │ - selected_product  │   │ - total      │
│ - isAuthenticated   │   │ - filters           │   │ - quantity   │
│ - isLoading         │   ├─────────────────────┤   ├──────────────┤
│ - error             │   │ ACTIONS:            │   │ ACTIONS:     │
├─────────────────────┤   │ - addProduct()      │   │ - addItem()  │
│ ACTIONS:            │   │ - updateProduct()   │   │ - removeItem()
│ - login()           │   │ - deleteProduct()   │   │ - updateQty()
│ - logout()          │   │ - searchProducts()  │   │ - clearCart()
│ - register()        │   │ - filterByCategory()│   │ - getTotalPrice()
│ - checkAuth()       │   │ - getProduct()      │   │ - getTotalItems()
│ - adminLogin()      │   │ - getAllProducts()  │   ├──────────────┤
│ - updateProfile()   │   ├─────────────────────┤   │ COMPUTED:    │
├─────────────────────┤   │ COMPUTED:           │   │ - subtotal   │
│ COMPUTED:           │   │ - filteredProducts  │   │ - tax        │
│ - isAdmin()         │   │ - totalCount        │   │ - shipping   │
│ - userName()        │   └─────────────────────┘   │ - total      │
│ - isLoggedIn()      │                             └──────────────┘
└─────────────────────┘

Data Flow:
    Component → Store Action → Update State → Re-render Component
    
    Example:
    <button onClick={() => addProduct(product)} />
           ↓
    productStore.addProduct(product)
           ↓
    set({ products: [...state.products, product] })
           ↓
    localStorage saves state
           ↓
    Component re-renders with new products
```

### 5. API Communication Flow

```
┌───────────────────────────────────────────────────────────────┐
│         FRONTEND → BACKEND COMMUNICATION FLOW                │
└───────────────────────────────────────────────────────────────┘

Example: Login Flow

USER INPUT
    │
    └──→ handleSubmit() in LoginPage
         │
         └──→ useAuthStore.login(email, password)
              │
              └──→ authService.login({email, password})
                   │
                   └──→ apiClient.post('/auth/login', data)
                        │
                        └──→ HTTP POST to http://localhost:8000/api/auth/login
                             
                             Header:
                             {
                               'Content-Type': 'application/json',
                               'Authorization': 'Bearer {token}'
                             }
                             
                             Body:
                             {
                               'email': 'admin@wonderland.com',
                               'password': 'admin123'
                             }
                             ↓
                             ┌─────────────────────────────┐
                             │    BACKEND PROCESSING       │
                             ├─────────────────────────────┤
                             │ 1. Receive request          │
                             │ 2. Validate input           │
                             │ 3. Query database for user  │
                             │ 4. Verify password          │
                             │ 5. Create JWT token         │
                             │ 6. Send response            │
                             └─────────────────────────────┘
                             ↓
                             Response (Status 200 OK):
                             {
                               'access_token': 'eyJ0eXAi...',
                               'token_type': 'bearer',
                               'user': {
                                 'id': '1',
                                 'email': 'admin@wonderland.com',
                                 'name': 'Admin User',
                                 'role': 'admin'
                               }
                             }
                             ↓
              ← Response received
         │
         └──→ Save token to localStorage
              Update state.user, state.isAuthenticated
              ↓
    ← Return to component
    │
    └──→ navigate('/admin')
         │
         └──→ User redirected to admin dashboard
              ↓
         ADMIN PANEL LOADED ✓
```

### 6. Database Schema with Relationships

```
┌──────────────────────────────┐
│        USERS TABLE           │
├──────────────────────────────┤
│ PK │ id (UUID)               │
├────┼──────────────────────────┤
│    │ email (UNIQUE, NOT NULL) │
│    │ name                     │
│    │ password_hash           │
│    │ role (customer/admin)   │
│    │ created_at              │
│    │ updated_at              │
└──────────────────────────────┘
         │
    1    │    M
         │
         ↓
┌──────────────────────────────────┐
│      ORDERS TABLE                │
├──────────────────────────────────┤
│ PK │ id (UUID)                   │
│ FK │ user_id (ref: users.id)     │
├────┼──────────────────────────────┤
│    │ order_number (UNIQUE)        │
│    │ total_amount (FLOAT)         │
│    │ status (ENUM)                │
│    │ delivery_address             │
│    │ city                         │
│    │ postal_code                  │
│    │ created_at                   │
│    │ updated_at                   │
└──────────────────────────────────┘
         │
    1    │    M
         │
         ↓
┌──────────────────────────────────┐
│    ORDER_ITEMS TABLE             │
├──────────────────────────────────┤
│ FK │ order_id (ref: orders.id)    │
│ FK │ product_id (ref: products.id)│
├────┼──────────────────────────────┤
│    │ quantity (INT)               │
│    │ price (FLOAT)                │
└──────────────────────────────────┘
         │
    M    │    1
         │
         ↓
┌──────────────────────────────────┐
│     PRODUCTS TABLE               │
├──────────────────────────────────┤
│ PK │ id (UUID)                   │
├────┼──────────────────────────────┤
│    │ name (NOT NULL)              │
│    │ brand                        │
│    │ price (FLOAT, > 0)           │
│    │ quantity (INT, >= 0)         │
│    │ category (ENUM)              │
│    │ description                  │
│    │ image (LONGTEXT/Base64)      │
│    │ categoryAttributes (JSON)    │
│    │ created_at                   │
│    │ updated_at                   │
└──────────────────────────────────┘

Key Relationships:
- 1 User can have M Orders
- 1 Order can have M OrderItems
- M OrderItems can reference M Products
- Each Product can be in M OrderItems
```

### 7. Component Lifecycle & Data Flow

```
USER INTERACTION
      ↓
   COMPONENT
      ↓
   ┌─────────────────────────────────────┐
   │  RENDER PHASE                       │
   ├─────────────────────────────────────┤
   │ 1. Read from Zustand Store          │
   │ 2. Prepare props for children       │
   │ 3. Render JSX                       │
   │ 4. Apply Tailwind CSS               │
   └─────────────────────────────────────┘
      ↓
   ┌─────────────────────────────────────┐
   │  EFFECT PHASE                       │
   ├─────────────────────────────────────┤
   │ 1. useEffect hooks run              │
   │ 2. Fetch data from API              │
   │ 3. Update state in store            │
   │ 4. localStorage synced              │
   └─────────────────────────────────────┘
      ↓
   ┌─────────────────────────────────────┐
   │  USER EVENT HANDLING                │
   ├─────────────────────────────────────┤
   │ 1. User clicks button               │
   │ 2. onClick handler called           │
   │ 3. Store action triggered           │
   │ 4. State updated                    │
   │ 5. Component re-rendered            │
   └─────────────────────────────────────┘
      ↓
   UPDATED UI DISPLAYED

Example: Adding Product to Cart

ProductCard Component:
  Props: product
  ↓
  handleAddToCart():
    └─→ cartStore.addItem(product)
        └─→ set({ items: [...state.items, product] })
            └─→ localStorage updated
                └─→ useCartStore subscribers notified
                    └─→ Header re-renders (cart count updated)
                    └─→ CartPage re-renders (items updated)
```

### 8. Error Handling Flow

```
REQUEST SENT
    ↓
NETWORK ERROR?
    ├─→ YES: Connection Failed
    │   └─→ Display: "Unable to connect to server"
    │
    └─→ NO: Continue
        ↓
    RESPONSE RECEIVED
        ↓
    VALIDATION ERROR (400)?
        ├─→ YES: Invalid Input
        │   └─→ Display: "Email and password are required"
        │
        └─→ NO: Continue
            ↓
        AUTHENTICATION ERROR (401)?
            ├─→ YES: Unauthorized
            │   └─→ Clear token
            │   └─→ Redirect to login
            │   └─→ Display: "Session expired"
            │
            └─→ NO: Continue
                ↓
            SERVER ERROR (500)?
                ├─→ YES: Internal Error
                │   └─→ Display: "Something went wrong"
                │   └─→ Log error
                │
                └─→ NO: Success (200)
                    └─→ Process response
                    └─→ Update state
                    └─→ Display data
```

### 9. Authentication & Authorization Flow

```
APPLICATION START
    ↓
checkAuth() in useEffect:
    ├─→ Check localStorage for token
    │   ├─→ Token found?
    │   │   ├─→ YES: Send GET /api/auth/me with token
    │   │   │   └─→ Validate token with backend
    │   │   │   └─→ Receive user data
    │   │   │   └─→ set({ isAuthenticated: true, user: userData })
    │   │   │
    │   │   └─→ NO: set({ isAuthenticated: false, user: null })
    │   │
    │   └─→ Invalid token?
    │       └─→ Remove token
    │       └─→ set({ isAuthenticated: false })
    │
    ↓
RENDER ROUTES
    ├─→ PUBLIC: HomePage, ProductsPage, LoginPage
    │   └─→ Always accessible
    │
    ├─→ PROTECTED (Customer): CartPage, OrdersPage, ProfilePage
    │   └─→ Requires: isAuthenticated: true && user.role: 'customer'
    │
    └─→ PROTECTED (Admin): AdminDashboard
        └─→ Requires: isAuthenticated: true && user.role: 'admin'

ProtectedRoute Component:
  └─→ if (!isAuthenticated) redirect('/login')
  └─→ if (requiredRole && user.role !== requiredRole) redirect('/')
  └─→ else render children
```

### 10. Real-time Sync Architecture

```
ADMIN ADDS PRODUCT
    ↓
Admin Dashboard:
  └─→ handleAddProduct(data)
      └─→ productStore.addProduct(data)
          └─→ set({ products: [...state.products, newProduct] })
              └─→ localStorage updated
                  └─→ Zustand notifies all subscribers
                      ↓
                      ┌─────────────────────────────┐
                      │  ALL SUBSCRIBED COMPONENTS  │
                      ├─────────────────────────────┤
                      │ - AdminDashboard            │
                      │ - ProductsPage              │
                      │ - Header (if cart affected) │
                      └─────────────────────────────┘
                      ↓
                      All components re-render
                      with new products
                      ↓
                      INSTANT UI UPDATE ✓

NO MANUAL REFRESH NEEDED
NO API CALLS NEEDED
AUTOMATIC SYNC
```

---

## Summary Table

| Aspect | Technology | Details |
|--------|-----------|---------|
| **Frontend Framework** | React 18+ | Component-based UI |
| **State Management** | Zustand | Lightweight, efficient |
| **Backend Framework** | FastAPI | Async Python web |
| **Database** | SQLite | Relational database |
| **Authentication** | JWT + bcrypt | Secure token-based |
| **API Style** | REST | Standard HTTP methods |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Language (Frontend)** | TypeScript | Type-safe JavaScript |
| **Language (Backend)** | Python 3.9+ | Rapid development |
| **Deployment Port** | 3000 (FE), 8000 (BE) | Standard ports |

---

**Document prepared for:** Academic Submission  
**Date:** December 23, 2025  
**Project:** Wonderland Toy Store E-Commerce Platform

