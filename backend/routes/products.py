"""
Products Routes - CRUD operations for products
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("/")
async def get_all_products(category: str = None, skip: int = 0, limit: int = 100):
    """Get all products with optional filtering."""
    # Mock data for demo
    products = [
        {
            "id": "1",
            "name": "Robot Explorer",
            "brand": "TechToys",
            "price": 4999.99,
            "quantity": 15,
            "description": "Advanced robot with AI learning capabilities",
            "category": "Electronic",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK1teoV9A4Ruk4aCQ7E4606n0_uYrdAEfgLQ&s",
            "in_stock": True,
        },
        {
            "id": "2",
            "name": "Soft Teddy Bear",
            "brand": "CozyToys",
            "price": 1000.0,
            "quantity": 25,
            "description": "Ultra-soft plush teddy bear with embroidered details",
            "category": "Plush",
            "image": "https://theflowerstudio.pk/wp-content/uploads/2017/02/high-quality-80cm-huge-teddy-bear-stuffed-plush-kids-toys-cute-wear-sweater-bear-baby-appearse.jpg_640x640.jpg",
            "in_stock": True,
        },
        {
            "id": "3",
            "name": "Chess Master",
            "brand": "GamePro",
            "price": 3200,
            "quantity": 10,
            "description": "Classic chess set with magnetic pieces",
            "category": "BoardGame",
            "image": "https://m.media-amazon.com/images/I/81l0QFknYcL._AC_UF894,1000_QL80_.jpg",
            "in_stock": True,
        },
    ]

    if category:
        products = [p for p in products if p["category"] == category]

    return products


@router.get("/{product_id}")
async def get_product(product_id: str):
    """Get a single product by ID."""
    return {
        "id": product_id,
        "name": "Sample Product",
        "brand": "Brand",
        "price": 999,
        "quantity": 10,
        "description": "Sample description",
        "category": "Electronic",
        "image": "https://via.placeholder.com/300",
        "in_stock": True,
    }


@router.post("/")
async def create_product(name: str, brand: str, price: float, quantity: int, category: str, description: str, image: str = None):
    """Create a new product."""
    return {
        "id": "new-product-id",
        "name": name,
        "brand": brand,
        "price": price,
        "quantity": quantity,
        "category": category,
        "description": description,
        "image": image,
        "in_stock": True,
    }


@router.put("/{product_id}")
async def update_product(product_id: str, name: str = None, price: float = None, quantity: int = None, image: str = None):
    """Update a product."""
    return {
        "id": product_id,
        "name": name or "Updated Product",
        "price": price or 999,
        "quantity": quantity or 10,
        "image": image,
        "message": "Product updated successfully"
    }


@router.delete("/{product_id}")
async def delete_product(product_id: str):
    """Delete a product."""
    return {"message": f"Product {product_id} deleted successfully"}


@router.get("/search/{query}")
async def search_products(query: str):
    """Search products by name or description."""
    return {
        "query": query,
        "results": [],
        "count": 0
    }

