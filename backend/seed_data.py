"""
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
Seed data script to populate the database with sample products and users.
"""
from database import SessionLocal, engine, Base
from db_models import User, DBProduct
from utils.security import hash_password


def seed_database():
    """Seed the database with initial data."""
    Base.metadata.create_all(bind=engine)
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    
    db = SessionLocal()
    
    try:
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        existing_users = db.query(User).count()
        if existing_users > 0:
            print("Database already seeded. Skipping...")
            return
        
        print("🌱 Seeding database...")
        
        admin = User(
            email="admin@wonderland.com",
            name="Admin User",
            hashed_password=hash_password("admin123"),
            role="admin"
        )
        db.add(admin)
        
        demo_user = User(
            email="demo@example.com",
            name="Demo Customer",
            hashed_password=hash_password("demo123"),
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
            role="customer"
        )
        db.add(demo_user)
        
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        electronic_toys = [
            DBProduct(
                name="RC Racing Car",
                brand="SpeedMax",
                price=4999,
                quantity=25,
                description="High-speed remote control racing car with LED lights and turbo mode",
                category="Electronic",
                image="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400",
                category_attributes={"batteryType": "Rechargeable Li-ion", "voltage": "7.4V"}
            ),
            DBProduct(
                name="Interactive Robot Dog",
                brand="TechPet",
                price=7999,
                quantity=15,
                description="AI-powered robot dog that responds to voice commands and learns tricks",
                category="Electronic",
                image="https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=400",
                category_attributes={"batteryType": "AA Batteries x4", "voltage": "6V"}
            ),
            DBProduct(
                name="Drone Explorer",
                brand="SkyTech",
                price=12999,
                quantity=10,
                description="Beginner-friendly drone with HD camera and auto-hover feature",
                category="Electronic",
                image="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400",
                category_attributes={"batteryType": "Li-Po 3.7V", "voltage": "3.7V"}
            ),
        ]
        
        plush_toys = [
            DBProduct(
                name="Giant Teddy Bear",
                brand="CuddlePals",
                price=2499,
                quantity=30,
                description="Super soft 4-foot tall teddy bear perfect for hugging",
                category="Plush",
                image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
                category_attributes={"material": "Premium Polyester", "size": "Large (4ft)"}
            ),
            DBProduct(
                name="Unicorn Plushie",
                brand="MagicSoft",
                price=1299,
                quantity=40,
                description="Sparkly rainbow unicorn with soft mane and tail",
                category="Plush",
                image="https://images.unsplash.com/photo-1563901935883-cb61f5d49be4?w=400",
                category_attributes={"material": "Velvet Plush", "size": "Medium (18 inches)"}
            ),
            DBProduct(
                name="Dinosaur Collection Set",
                brand="DinoWorld",
                price=1999,
                quantity=20,
                description="Set of 5 adorable dinosaur plushies in different colors",
                category="Plush",
                image="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400",
                category_attributes={"material": "Cotton Blend", "size": "Small (8 inches each)"}
            ),
        ]
        
        board_games = [
            DBProduct(
                name="Treasure Hunt Quest",
                brand="FunGames",
                price=1499,
                quantity=35,
                description="Exciting adventure board game for the whole family",
                category="BoardGame",
                image="https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400",
                category_attributes={"ageRange": "8+", "numberOfPlayers": "2-6"}
            ),
            DBProduct(
                name="Strategy Masters",
                brand="BrainBox",
                price=2299,
                quantity=20,
                description="Complex strategy game that challenges your tactical thinking",
                category="BoardGame",
                image="https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400",
                category_attributes={"ageRange": "12+", "numberOfPlayers": "2-4"}
            ),
            DBProduct(
                name="Junior Detective",
                brand="KidsPlay",
                price=999,
                quantity=45,
                description="Mystery solving game designed for young detectives",
                category="BoardGame",
                image="https://images.unsplash.com/photo-1606503153255-59d8b2e4dc5e?w=400",
                category_attributes={"ageRange": "6+", "numberOfPlayers": "2-8"}
            ),
        ]
        
        for product in electronic_toys + plush_toys + board_games:
            db.add(product)
        
        db.commit()
        print("✅ Database seeded successfully!")
        print(f"   - Created 2 users (admin + demo)")
        print(f"   - Created {len(electronic_toys) + len(plush_toys) + len(board_games)} products")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
