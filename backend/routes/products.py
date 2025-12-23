"""
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
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
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
    new_product = DBProduct(
        name=product_data.name,
        brand=product_data.brand,
        price=product_data.price,
        quantity=product_data.quantity,
        description=product_data.description,
        category=product_data.category,
        image=product_data.image,
        category_attributes=product_data.categoryAttributes or {}
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
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
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update a product (admin only)."""
    product = db.query(DBProduct).filter(DBProduct.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Update fields if provided
    update_data = product_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if key == "categoryAttributes":
            setattr(product, "category_attributes", value)
        else:
            setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    
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
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    db.delete(product)
    db.commit()
    
    return {"message": "Product deleted successfully"}
