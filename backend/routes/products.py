"""
Products Routes - CRUD operations for products
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/")
async def get_all_products(category: str = None, skip: int = 0, limit: int = 100):
    """Get all products with optional filtering."""
    # Mock data for demo
    products = [
        # Electronic Toys
        {
            "id": "1",
            "name": "Robot Explorer",
            "brand": "TechToys",
            "price": 49.99,
            "quantity": 15,
            "description": "Advanced robot with AI learning capabilities. Features voice commands, obstacle avoidance, and programmable movements.",
            "category": "Electronic",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK1teoV9A4Ruk4aCQ7E4606n0_uYrdAEfgLQ&s",
            "in_stock": True,
        },
        {
            "id": "2",
            "name": "LED Light Robot",
            "brand": "FutureTech",
            "price": 59.99,
            "quantity": 8,
            "description": "Robot with stunning LED lights and realistic sound effects. Perfect for entertainment and learning.",
            "category": "Electronic",
            "image": "https://5.imimg.com/data5/SELLER/Default/2025/4/504041787/ZO/ER/HB/223634207/o1cn01bssfiy1aclrom0pmf-946173350-0-cib-500x500.jpg",
            "in_stock": True,
        },
        {
            "id": "3",
            "name": "Smart Drone",
            "brand": "SkyTech",
            "price": 79.99,
            "quantity": 5,
            "description": "Mini drone with HD camera and smartphone app control. Features auto-hover, flips, and 10-minute flight time.",
            "category": "Electronic",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW-ODxzzj2SgfES2N9JB0DVdR-wtfdTXqDFw&s",
            "in_stock": True,
        },
        {
            "id": "4",
            "name": "RC Racing Car",
            "brand": "SpeedMaster",
            "price": 44.99,
            "quantity": 12,
            "description": "High-speed remote control racing car with 2.4GHz remote. Reaches speeds up to 20 mph!",
            "category": "Electronic",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7uWFD_UpRjwaPEX-oeLyJNfhn43n3Fa62g&s",
            "in_stock": True,
        },
        # Plush Toys
        {
            "id": "5",
            "name": "Soft Teddy Bear",
            "brand": "CozyToys",
            "price": 24.99,
            "quantity": 25,
            "description": "Ultra-soft plush teddy bear with embroidered details. Perfect cuddle companion for all ages.",
            "category": "Plush",
            "image": "https://theflowerstudio.pk/wp-content/uploads/2017/02/high-quality-80cm-huge-teddy-bear-stuffed-plush-kids-toys-cute-wear-sweater-bear-baby-appearse.jpg_640x640.jpg",
            "in_stock": True,
        },
        {
            "id": "6",
            "name": "Plush Bunny",
            "brand": "CuddleCare",
            "price": 19.99,
            "quantity": 30,
            "description": "Adorable plush bunny with floppy ears. Made with hypoallergenic materials, safe for babies.",
            "category": "Plush",
            "image": "https://cuddlespk.com/cdn/shop/files/IMG_6057.jpg?v=1754898491&width=1445",
            "in_stock": True,
        },
        {
            "id": "7",
            "name": "Dinosaur Plush",
            "brand": "JurassicToys",
            "price": 29.99,
            "quantity": 18,
            "description": "Soft and huggable dinosaur toy. Features realistic details and super soft fleece material.",
            "category": "Plush",
            "image": "https://m.media-amazon.com/images/I/61FgnR4VAuL._AC_UF894,1000_QL80_.jpg",
            "in_stock": True,
        },
        {
            "id": "8",
            "name": "Unicorn Plush",
            "brand": "MagicToys",
            "price": 34.99,
            "quantity": 20,
            "description": "Sparkly unicorn with rainbow mane. Includes glittery horn and wings. Perfect gift for unicorn lovers!",
            "category": "Plush",
            "image": "https://www.eurokidsindia.com/blog/wp-content/uploads/2024/03/plush-toys.jpg",
            "in_stock": True,
        },
        # Board Games
        {
            "id": "9",
            "name": "Chess Master",
            "brand": "GamePro",
            "price": 34.99,
            "quantity": 10,
            "description": "Classic chess set with magnetic wooden pieces. Includes folding board for easy storage and travel.",
            "category": "BoardGame",
            "image": "https://m.media-amazon.com/images/I/81l0QFknYcL._AC_UF894,1000_QL80_.jpg",
            "in_stock": True,
        },
        {
            "id": "10",
            "name": "Family Game Night",
            "brand": "FunGames",
            "price": 44.99,
            "quantity": 12,
            "description": "Collection of 10 classic board games in one box. Includes Ludo, Snakes & Ladders, and more!",
            "category": "BoardGame",
            "image": "https://thetoyfactory.pk/cdn/shop/files/Scrabble_Game_Board_with_Rack_and_Alphabet_Tiles_Close-Up_370x.jpg?v=1760967452%20370w",
            "in_stock": True,
        },
        {
            "id": "11",
            "name": "Monopoly Classic",
            "brand": "Hasbro",
            "price": 39.99,
            "quantity": 15,
            "description": "The classic property trading game. Buy, sell, and scheme your way to riches!",
            "category": "BoardGame",
            "image": "https://m.media-amazon.com/images/I/6112nCtg60L._SS400_.jpg",
            "in_stock": True,
        },
        {
            "id": "12",
            "name": "Puzzle Adventure",
            "brand": "BrainGames",
            "price": 24.99,
            "quantity": 22,
            "description": "1000-piece puzzle featuring a magical fantasy landscape. Great for family bonding!",
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

