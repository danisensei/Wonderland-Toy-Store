"""
Seed Data Script - Populate database with sample products and admin user
Run this script to initialize the database with test data.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, init_db
from db_models.user import User
from db_models.product import DBProduct
from utils.security import get_password_hash


def seed_database():
    """Seed the database with sample data."""
    
    # Initialize database tables
    init_db()
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing_products = db.query(DBProduct).count()
        if existing_products > 0:
            print("[SKIP] Database already has data. Skipping seed.")
            return
        
        print("[INFO] Seeding database with sample data...")
        
        # Create admin user
        admin_user = User(
            email="admin@wonderland.com",
            name="Admin User",
            password_hash=get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin_user)
        
        # Create demo customer user
        demo_user = User(
            email="demo@example.com",
            name="Demo User",
            password_hash=get_password_hash("demo123"),
            role="customer"
        )
        db.add(demo_user)
        
        # Sample Products - Electronic Toys
        electronic_products = [
            DBProduct(
                name="Robot Explorer",
                brand="TechToys",
                price=49.99,
                quantity=15,
                description="Advanced robot with AI learning capabilities. Features voice commands, obstacle avoidance, and programmable movements.",
                image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK1teoV9A4Ruk4aCQ7E4606n0_uYrdAEfgLQ&s",
                category="Electronic",
                category_attributes={"batteryType": "AA", "voltage": "6V"}
            ),
            DBProduct(
                name="LED Light Robot",
                brand="FutureTech",
                price=59.99,
                quantity=8,
                description="Robot with stunning LED lights and realistic sound effects. Perfect for entertainment and learning.",
                image_url="https://5.imimg.com/data5/SELLER/Default/2025/4/504041787/ZO/ER/HB/223634207/o1cn01bssfiy1aclrom0pmf-946173350-0-cib-500x500.jpg",
                category="Electronic",
                category_attributes={"batteryType": "AAA", "voltage": "4.5V"}
            ),
            DBProduct(
                name="Smart Drone",
                brand="SkyTech",
                price=79.99,
                quantity=5,
                description="Mini drone with HD camera and smartphone app control. Features auto-hover, flips, and 10-minute flight time.",
                image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW-ODxzzj2SgfES2N9JB0DVdR-wtfdTXqDFw&s",
                category="Electronic",
                category_attributes={"batteryType": "Rechargeable", "voltage": "7.7V"}
            ),
            DBProduct(
                name="RC Racing Car",
                brand="SpeedMaster",
                price=44.99,
                quantity=12,
                description="High-speed remote control racing car with 2.4GHz remote. Reaches speeds up to 20 mph!",
                image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7uWFD_UpRjwaPEX-oeLyJNfhn43n3Fa62g&s",
                category="Electronic",
                category_attributes={"batteryType": "Rechargeable", "voltage": "7.4V"}
            ),
        ]
        
        # Sample Products - Plush Toys
        plush_products = [
            DBProduct(
                name="Soft Teddy Bear",
                brand="CozyToys",
                price=24.99,
                quantity=25,
                description="Ultra-soft plush teddy bear with embroidered details. Perfect cuddle companion for all ages.",
                image_url="https://theflowerstudio.pk/wp-content/uploads/2017/02/high-quality-80cm-huge-teddy-bear-stuffed-plush-kids-toys-cute-wear-sweater-bear-baby-appearse.jpg_640x640.jpg",
                category="Plush",
                category_attributes={"material": "Polyester", "size": "Medium"}
            ),
            DBProduct(
                name="Plush Bunny",
                brand="CuddleCare",
                price=19.99,
                quantity=30,
                description="Adorable plush bunny with floppy ears. Made with hypoallergenic materials, safe for babies.",
                image_url="https://cuddlespk.com/cdn/shop/files/IMG_6057.jpg?v=1754898491&width=1445",
                category="Plush",
                category_attributes={"material": "Cotton", "size": "Small"}
            ),
            DBProduct(
                name="Dinosaur Plush",
                brand="JurassicToys",
                price=29.99,
                quantity=18,
                description="Soft and huggable dinosaur toy. Features realistic details and super soft fleece material.",
                image_url="https://m.media-amazon.com/images/I/61FgnR4VAuL._AC_UF894,1000_QL80_.jpg",
                category="Plush",
                category_attributes={"material": "Fleece", "size": "Large"}
            ),
            DBProduct(
                name="Unicorn Plush",
                brand="MagicToys",
                price=34.99,
                quantity=20,
                description="Sparkly unicorn with rainbow mane. Includes glittery horn and wings. Perfect gift for unicorn lovers!",
                image_url="https://www.eurokidsindia.com/blog/wp-content/uploads/2024/03/plush-toys.jpg",
                category="Plush",
                category_attributes={"material": "Velvet", "size": "Medium"}
            ),
        ]
        
        # Sample Products - Board Games
        boardgame_products = [
            DBProduct(
                name="Chess Master",
                brand="GamePro",
                price=34.99,
                quantity=10,
                description="Classic chess set with magnetic wooden pieces. Includes folding board for easy storage and travel.",
                image_url="https://m.media-amazon.com/images/I/81l0QFknYcL._AC_UF894,1000_QL80_.jpg",
                category="BoardGame",
                category_attributes={"ageRange": "8+", "numberOfPlayers": "2"}
            ),
            DBProduct(
                name="Family Game Night",
                brand="FunGames",
                price=44.99,
                quantity=12,
                description="Collection of 10 classic board games in one box. Includes Ludo, Snakes & Ladders, and more!",
                image_url="https://thetoyfactory.pk/cdn/shop/files/Scrabble_Game_Board_with_Rack_and_Alphabet_Tiles_Close-Up_370x.jpg?v=1760967452%20370w",
                category="BoardGame",
                category_attributes={"ageRange": "5+", "numberOfPlayers": "2-6"}
            ),
            DBProduct(
                name="Monopoly Classic",
                brand="Hasbro",
                price=39.99,
                quantity=15,
                description="The classic property trading game. Buy, sell, and scheme your way to riches!",
                image_url="https://m.media-amazon.com/images/I/6112nCtg60L._SS400_.jpg",
                category="BoardGame",
                category_attributes={"ageRange": "8+", "numberOfPlayers": "2-8"}
            ),
            DBProduct(
                name="Puzzle Adventure",
                brand="BrainGames",
                price=24.99,
                quantity=22,
                description="1000-piece puzzle featuring a magical fantasy landscape. Great for family bonding!",
                image_url="https://m.media-amazon.com/images/I/81l0QFknYcL._AC_UF894,1000_QL80_.jpg",
                category="BoardGame",
                category_attributes={"ageRange": "10+", "numberOfPlayers": "1+"}
            ),
        ]
        
        # Add all products to database
        all_products = electronic_products + plush_products + boardgame_products
        for product in all_products:
            db.add(product)
        
        db.commit()
        
        print("[OK] Database seeded successfully!")
        print(f"   - Created {len(all_products)} products")
        print("   - Created admin user: admin@wonderland.com / admin123")
        print("   - Created demo user: demo@example.com / demo123")
        
    except Exception as e:
        print(f"[ERROR] Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
