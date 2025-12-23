#!/usr/bin/env python3
"""
PostgreSQL Database Setup Script for Wonderland Toy Store
This script creates the database and all necessary tables
"""

import psycopg2
from psycopg2 import sql
import sys
from getpass import getpass

def create_database():
    """Create the PostgreSQL database and tables"""

    # Database connection parameters
    print("=" * 80)
    print("Wonderland Toy Store - PostgreSQL Database Setup")
    print("=" * 80)
    print()

    # Get connection details
    host = input("Enter PostgreSQL host (default: localhost): ").strip() or "localhost"
    port = input("Enter PostgreSQL port (default: 5432): ").strip() or "5432"
    user = input("Enter PostgreSQL user (default: postgres): ").strip() or "postgres"
    password = getpass("Enter PostgreSQL password: ")

    print("\nConnecting to PostgreSQL server...")

    try:
        # Connect to PostgreSQL server (default database)
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database="postgres"
        )

        conn.autocommit = True
        cursor = conn.cursor()
        print("✓ Connected to PostgreSQL server")

        # Check if database exists
        cursor.execute(
            "SELECT 1 FROM pg_database WHERE datname = %s",
            ("wonderland_toy_store",)
        )

        if cursor.fetchone():
            print("\nDatabase 'wonderland_toy_store' already exists!")
            drop = input("Do you want to drop and recreate it? (y/n): ").lower()
            if drop == 'y':
                cursor.execute("DROP DATABASE wonderland_toy_store;")
                print("✓ Database dropped")
            else:
                cursor.close()
                conn.close()
                print("Exiting without making changes.")
                return False

        # Create database
        cursor.execute("CREATE DATABASE wonderland_toy_store;")
        print("✓ Database 'wonderland_toy_store' created")

        cursor.close()
        conn.close()

        # Connect to new database
        print("\nConnecting to new database...")
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database="wonderland_toy_store"
        )

        cursor = conn.cursor()
        print("✓ Connected to 'wonderland_toy_store' database")

        # Create tables
        print("\nCreating tables...")

        # Users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                address TEXT,
                city VARCHAR(100),
                country VARCHAR(100),
                postal_code VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE
            );
        """)
        print("  ✓ users table created")

        # Create index on email
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_email ON users(email);")

        # Products table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                brand VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
                quantity INT DEFAULT 0 CHECK (quantity >= 0),
                category VARCHAR(50) NOT NULL CHECK (category IN ('Electronic', 'Plush', 'BoardGame')),
                image_url VARCHAR(500),
                rating FLOAT DEFAULT NULL CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE
            );
        """)
        print("  ✓ products table created")

        # Create indexes on products
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_category ON products(category);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_name ON products(name);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_brand ON products(brand);")

        # Electronic toys table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS electronic_toys (
                product_id INT PRIMARY KEY,
                battery_type VARCHAR(255) NOT NULL,
                voltage VARCHAR(255) NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            );
        """)
        print("  ✓ electronic_toys table created")

        # Plush toys table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS plush_toys (
                product_id INT PRIMARY KEY,
                material VARCHAR(255) NOT NULL,
                size VARCHAR(100) NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            );
        """)
        print("  ✓ plush_toys table created")

        # Board games table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS board_games (
                product_id INT PRIMARY KEY,
                age_range VARCHAR(100) NOT NULL,
                number_of_players VARCHAR(100) NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            );
        """)
        print("  ✓ board_games table created")

        # Orders table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                order_number VARCHAR(50) UNIQUE NOT NULL,
                user_id INT NOT NULL,
                total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
                status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')),
                shipping_address TEXT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        """)
        print("  ✓ orders table created")

        # Create indexes on orders
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_order_number ON orders(order_number);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_user_id ON orders(user_id);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_status ON orders(status);")

        # Order items table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL CHECK (quantity > 0),
                price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id)
            );
        """)
        print("  ✓ order_items table created")

        # Create indexes on order_items
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_order_id ON order_items(order_id);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_product_id ON order_items(product_id);")

        # Favorites table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS favorites (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                UNIQUE (user_id, product_id)
            );
        """)
        print("  ✓ favorites table created")

        # Reviews table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                product_id INT NOT NULL,
                user_id INT NOT NULL,
                rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        """)
        print("  ✓ reviews table created")

        # Inventory logs table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS inventory_logs (
                id SERIAL PRIMARY KEY,
                product_id INT NOT NULL,
                quantity_before INT NOT NULL,
                quantity_after INT NOT NULL,
                change_type VARCHAR(50) NOT NULL CHECK (change_type IN ('Sale', 'Restock', 'Adjustment', 'Return')),
                reference_id INT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            );
        """)
        print("  ✓ inventory_logs table created")

        # Insert sample data
        print("\nInserting sample data...")

        # Sample users
        cursor.execute("""
            INSERT INTO users (name, email, password, phone, address, city, country, postal_code)
            VALUES 
                (%s, %s, %s, %s, %s, %s, %s, %s),
                (%s, %s, %s, %s, %s, %s, %s, %s),
                (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            'Ali Khan', 'ali@example.com', 'hashed_password_1', '03001234567', '123 Main Street', 'Karachi', 'Pakistan', '74000',
            'Fatima Ahmed', 'fatima@example.com', 'hashed_password_2', '03119876543', '456 Defense Road', 'Lahore', 'Pakistan', '54000',
            'Hassan Admin', 'admin@wonderland.com', 'hashed_password_admin', '03335551234', '789 Mall Road', 'Islamabad', 'Pakistan', '44000'
        ))
        print("  ✓ Sample users inserted")

        # Sample electronic toys
        cursor.execute("""
            INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            'Smart Robot', 'TechToys', 'Interactive robot with voice commands and LED display', 4999, 15, 'Electronic', 'https://via.placeholder.com/300?text=Smart+Robot', 4.5
        ))

        cursor.execute("""
            INSERT INTO electronic_toys (product_id, battery_type, voltage)
            VALUES ((SELECT id FROM products WHERE name = %s LIMIT 1), %s, %s)
            ON CONFLICT DO NOTHING;
        """, ('Smart Robot', 'AA', '3V'))

        cursor.execute("""
            INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            'LED Robot Car', 'FutureBot', 'Remote control robot car with LED lights', 3499, 20, 'Electronic', 'https://via.placeholder.com/300?text=Robot+Car', 4.2
        ))

        cursor.execute("""
            INSERT INTO electronic_toys (product_id, battery_type, voltage)
            VALUES ((SELECT id FROM products WHERE name = %s ORDER BY id DESC LIMIT 1), %s, %s)
            ON CONFLICT DO NOTHING;
        """, ('LED Robot Car', 'AAA', '1.5V'))

        # Sample plush toys
        cursor.execute("""
            INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            'Cuddly Teddy Bear', 'SoftCare', 'Super soft teddy bear perfect for hugs', 2499, 30, 'Plush', 'https://via.placeholder.com/300?text=Teddy+Bear', 4.7
        ))

        cursor.execute("""
            INSERT INTO plush_toys (product_id, material, size)
            VALUES ((SELECT id FROM products WHERE name = %s LIMIT 1), %s, %s)
            ON CONFLICT DO NOTHING;
        """, ('Cuddly Teddy Bear', 'Plush', 'Large'))

        cursor.execute("""
            INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            'Fluffy Bunny', 'CuddlePets', 'Adorable fluffy bunny with soft ears', 1999, 25, 'Plush', 'https://via.placeholder.com/300?text=Bunny', 4.6
        ))

        cursor.execute("""
            INSERT INTO plush_toys (product_id, material, size)
            VALUES ((SELECT id FROM products WHERE name = %s ORDER BY id DESC LIMIT 1), %s, %s)
            ON CONFLICT DO NOTHING;
        """, ('Fluffy Bunny', 'Cotton', 'Medium'))

        # Sample board games
        cursor.execute("""
            INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            'Advanced Chess Set', 'GameMaster', 'Professional chess set with premium wooden pieces', 3499, 10, 'BoardGame', 'https://via.placeholder.com/300?text=Chess', 4.9
        ))

        cursor.execute("""
            INSERT INTO board_games (product_id, age_range, number_of_players)
            VALUES ((SELECT id FROM products WHERE name = %s LIMIT 1), %s, %s)
            ON CONFLICT DO NOTHING;
        """, ('Advanced Chess Set', '10+', '2'))

        cursor.execute("""
            INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            'Ludo Board Game', 'FamilyFun', 'Classic ludo game for family entertainment', 1499, 22, 'BoardGame', 'https://via.placeholder.com/300?text=Ludo', 4.3
        ))

        cursor.execute("""
            INSERT INTO board_games (product_id, age_range, number_of_players)
            VALUES ((SELECT id FROM products WHERE name = %s ORDER BY id DESC LIMIT 1), %s, %s)
            ON CONFLICT DO NOTHING;
        """, ('Ludo Board Game', '5+', '2-4'))

        cursor.execute("""
            INSERT INTO products (name, brand, description, price, quantity, category, image_url, rating)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT DO NOTHING;
        """, (
            'Monopoly Pakistan Edition', 'BoardKing', 'Classic monopoly game with Pakistan theme', 4499, 5, 'BoardGame', 'https://via.placeholder.com/300?text=Monopoly', 4.8
        ))

        cursor.execute("""
            INSERT INTO board_games (product_id, age_range, number_of_players)
            VALUES ((SELECT id FROM products WHERE name = %s ORDER BY id DESC LIMIT 1), %s, %s)
            ON CONFLICT DO NOTHING;
        """, ('Monopoly Pakistan Edition', '8+', '2-8'))

        print("  ✓ Sample data inserted")

        # Commit changes
        conn.commit()
        cursor.close()
        conn.close()

        print("\n" + "=" * 80)
        print("✓ Database setup completed successfully!")
        print("=" * 80)
        print("\nDatabase Details:")
        print(f"  Host: {host}")
        print(f"  Port: {port}")
        print(f"  Database: wonderland_toy_store")
        print(f"  User: {user}")
        print("\nTables Created: 11")
        print("  - users")
        print("  - products")
        print("  - electronic_toys")
        print("  - plush_toys")
        print("  - board_games")
        print("  - orders")
        print("  - order_items")
        print("  - favorites")
        print("  - reviews")
        print("  - inventory_logs")
        print("\nSample Data:")
        print("  - 3 Users")
        print("  - 9 Products (3 Electronic, 3 Plush, 3 Board Games)")
        print("\nTo connect with psql:")
        print(f"  psql -h {host} -p {port} -U {user} -d wonderland_toy_store")
        print("\n" + "=" * 80)

        return True

    except psycopg2.Error as e:
        print(f"\n✗ Database Error: {e}")
        return False
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user.")
        return False
    except Exception as e:
        print(f"\n✗ Error: {e}")
        return False


if __name__ == "__main__":
    success = create_database()
    sys.exit(0 if success else 1)

