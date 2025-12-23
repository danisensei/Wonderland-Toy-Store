"""
Seed data script to populate the database with sample products and users.
"""
from database import SessionLocal, engine, Base
from db_models import User, DBProduct
from utils.security import hash_password


def seed_database():
    """Seed the database with initial data."""
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
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
            role="customer"
        )
        db.add(demo_user)
        
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
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
