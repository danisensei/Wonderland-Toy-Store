"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
Product routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from utils.deps import get_db, get_current_admin_user
from schemas.product import ProductCreate, ProductUpdate, ProductResponse
from db_models import DBProduct, User

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=List[ProductResponse])
async def get_products(
    category: Optional[str] = None,
    q: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all products with optional filtering."""
    query = db.query(DBProduct)
    
    if category:
        query = query.filter(DBProduct.category == category)
    
    if q:
        search = f"%{q}%"
        query = query.filter(
            (DBProduct.name.ilike(search)) |
            (DBProduct.brand.ilike(search)) |
            (DBProduct.description.ilike(search))
        )
    
    products = query.offset(skip).limit(limit).all()
    
    return [
        ProductResponse(
            id=str(p.id),
            name=p.name,
            brand=p.brand,
            price=p.price,
            quantity=p.quantity,
            description=p.description or "",
            category=p.category,
            image=p.image or "",
            in_stock=p.quantity > 0,
            categoryAttributes=p.category_attributes,
            created_at=p.created_at.isoformat() if p.created_at else None,
            updated_at=p.updated_at.isoformat() if p.updated_at else None
        )
        for p in products
    ]


@router.get("/search", response_model=List[ProductResponse])
async def search_products(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    """Search products by name, brand, or description."""
    search = f"%{q}%"
    products = db.query(DBProduct).filter(
        (DBProduct.name.ilike(search)) |
        (DBProduct.brand.ilike(search)) |
        (DBProduct.description.ilike(search))
    ).all()
    
    return [
        ProductResponse(
            id=str(p.id),
            name=p.name,
            brand=p.brand,
            price=p.price,
            quantity=p.quantity,
            description=p.description or "",
            category=p.category,
            image=p.image or "",
            in_stock=p.quantity > 0,
            categoryAttributes=p.category_attributes
        )
        for p in products
    ]


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get a single product by ID."""
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
Product Routes - CRUD operations for products
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from schemas.product import ProductCreate, ProductUpdate, ProductResponse
from db_models.product import DBProduct
from db_models.user import User
from utils.deps import get_db, get_current_admin, get_current_user_optional


router = APIRouter(prefix="/api/products", tags=["Products"])


@router.get("", response_model=List[dict])
async def get_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, alias="q", description="Search query"),
    skip: int = Query(0, ge=0, description="Number of items to skip"),
    limit: int = Query(100, ge=1, le=100, description="Number of items to return"),
    db: Session = Depends(get_db)
):
    """
    Get all products with optional filtering.
    
    Args:
        category: Filter by product category (Electronic, Plush, BoardGame)
        search: Search query for name, brand, or description
        skip: Number of items to skip for pagination
        limit: Maximum number of items to return
        db: Database session
        
    Returns:
        List of products
    """
    query = db.query(DBProduct)
    
    # Filter by category if provided
    if category:
        query = query.filter(DBProduct.category == category)
    
    # Search in name, brand, description if search query provided
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (DBProduct.name.ilike(search_term)) |
            (DBProduct.brand.ilike(search_term)) |
            (DBProduct.description.ilike(search_term))
        )
    
    # Order by created_at descending (newest first)
    query = query.order_by(DBProduct.created_at.desc())
    
    # Apply pagination
    products = query.offset(skip).limit(limit).all()
    
    return [product.to_dict() for product in products]


@router.get("/search", response_model=List[dict])
async def search_products(
    q: str = Query(..., min_length=1, description="Search query"),
    db: Session = Depends(get_db)
):
    """
    Search products by name, brand, or description.
    
    Args:
        q: Search query string
        db: Database session
        
    Returns:
        List of matching products
    """
    search_term = f"%{q}%"
    products = db.query(DBProduct).filter(
        (DBProduct.name.ilike(search_term)) |
        (DBProduct.brand.ilike(search_term)) |
        (DBProduct.description.ilike(search_term))
    ).all()
    
    return [product.to_dict() for product in products]


@router.get("/{product_id}", response_model=dict)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Get a single product by ID.
    
    Args:
        product_id: The product ID
        db: Database session
        
    Returns:
        Product details
    """
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    return ProductResponse(
        id=str(product.id),
        name=product.name,
        brand=product.brand,
        price=product.price,
        quantity=product.quantity,
        description=product.description or "",
        category=product.category,
        image=product.image or "",
        in_stock=product.quantity > 0,
        categoryAttributes=product.category_attributes
    )


@router.post("", response_model=ProductResponse)
async def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new product (admin only)."""
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    return product.to_dict()


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """
    Create a new product (admin only).
    
    Args:
        product_data: Product data
        db: Database session
        current_user: Authenticated admin user
        
    Returns:
        Created product
    """
    # Convert category attributes to dict if provided
    category_attrs = {}
    if product_data.categoryAttributes:
        category_attrs = product_data.categoryAttributes.model_dump(exclude_none=True)
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    new_product = DBProduct(
        name=product_data.name,
        brand=product_data.brand,
        price=product_data.price,
        quantity=product_data.quantity,
        description=product_data.description,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        category=product_data.category,
        image=product_data.image,
        category_attributes=product_data.categoryAttributes or {}
    )
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        image_url=product_data.image,
        category=product_data.category,
        category_attributes=category_attrs
    )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    return ProductResponse(
        id=str(new_product.id),
        name=new_product.name,
        brand=new_product.brand,
        price=new_product.price,
        quantity=new_product.quantity,
        description=new_product.description or "",
        category=new_product.category,
        image=new_product.image or "",
        in_stock=new_product.quantity > 0,
        categoryAttributes=new_product.category_attributes
    )


@router.put("/{product_id}", response_model=ProductResponse)
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    return new_product.to_dict()


@router.put("/{product_id}", response_model=dict)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    current_user: User = Depends(get_current_admin_user)
):
    """Update a product (admin only)."""
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    current_user: User = Depends(get_current_admin)
):
    """
    Update an existing product (admin only).
    
    Args:
        product_id: The product ID
        product_data: Updated product data
        db: Database session
        current_user: Authenticated admin user
        
    Returns:
        Updated product
    """
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    update_data = product_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if key == "categoryAttributes":
            setattr(product, "category_attributes", value)
        else:
            setattr(product, key, value)
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    # Update fields that are provided
    update_data = product_data.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        if field == "image":
            setattr(product, "image_url", value)
        elif field == "categoryAttributes" and value:
            product.category_attributes = value if isinstance(value, dict) else value.model_dump(exclude_none=True)
        else:
            setattr(product, field, value)
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    
    db.commit()
    db.refresh(product)
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    return ProductResponse(
        id=str(product.id),
        name=product.name,
        brand=product.brand,
        price=product.price,
        quantity=product.quantity,
        description=product.description or "",
        category=product.category,
        image=product.image or "",
        in_stock=product.quantity > 0,
        categoryAttributes=product.category_attributes
    )


@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a product (admin only)."""
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    return product.to_dict()


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """
    Delete a product (admin only).
    
    Args:
        product_id: The product ID
        db: Database session
        current_user: Authenticated admin user
    """
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    db.delete(product)
    db.commit()
    
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    return {"message": "Product deleted successfully"}
=======
    return None
>>>>>>> Stashed changes
=======
    return None
>>>>>>> Stashed changes
=======
    return None
>>>>>>> Stashed changes
