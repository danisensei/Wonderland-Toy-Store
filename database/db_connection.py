"""
Database Connection Utility for Wonderland Toy Store
Handles PostgreSQL connections and queries
"""

import psycopg2
from psycopg2 import sql, Error
from psycopg2.pool import SimpleConnectionPool
import os
from typing import Optional, List, Dict, Any


class DatabaseConfig:
    """Database configuration"""

    def __init__(self,
                 host: str = "localhost",
                 port: int = 5432,
                 database: str = "wonderland_toy_store",
                 user: str = "postgres",
                 password: str = ""):
        """
        Initialize database configuration

        Args:
            host: Database host
            port: Database port
            database: Database name
            user: Database user
            password: Database password
        """
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password

    def get_connection_string(self) -> str:
        """Get PostgreSQL connection string"""
        return f"postgresql://{self.user}:{self.password}@{self.host}:{self.port}/{self.database}"

    def get_psycopg2_dict(self) -> Dict[str, Any]:
        """Get connection parameters as dictionary for psycopg2"""
        return {
            'host': self.host,
            'port': self.port,
            'database': self.database,
            'user': self.user,
            'password': self.password
        }


class DatabaseConnection:
    """Database connection manager"""

    def __init__(self, config: DatabaseConfig):
        """
        Initialize database connection

        Args:
            config: DatabaseConfig instance
        """
        self.config = config
        self.connection = None
        self.cursor = None

    def connect(self) -> bool:
        """
        Establish database connection

        Returns:
            bool: True if connection successful
        """
        try:
            self.connection = psycopg2.connect(**self.config.get_psycopg2_dict())
            self.cursor = self.connection.cursor()
            print(f"✓ Connected to database: {self.config.database}")
            return True
        except Error as e:
            print(f"✗ Connection Error: {e}")
            return False

    def disconnect(self) -> None:
        """Close database connection"""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
        print("✓ Disconnected from database")

    def execute_query(self, query: str, params: tuple = None) -> List[tuple]:
        """
        Execute SELECT query

        Args:
            query: SQL query
            params: Query parameters

        Returns:
            List of results
        """
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            return self.cursor.fetchall()
        except Error as e:
            print(f"✗ Query Error: {e}")
            return []

    def execute_query_single(self, query: str, params: tuple = None) -> Optional[tuple]:
        """
        Execute SELECT query returning single result

        Args:
            query: SQL query
            params: Query parameters

        Returns:
            Single result row or None
        """
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            return self.cursor.fetchone()
        except Error as e:
            print(f"✗ Query Error: {e}")
            return None

    def execute_update(self, query: str, params: tuple = None) -> bool:
        """
        Execute INSERT/UPDATE/DELETE query

        Args:
            query: SQL query
            params: Query parameters

        Returns:
            bool: True if successful
        """
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            self.connection.commit()
            return True
        except Error as e:
            self.connection.rollback()
            print(f"✗ Update Error: {e}")
            return False

    def get_products(self) -> List[Dict[str, Any]]:
        """Get all products from database"""
        query = """
            SELECT p.id, p.name, p.brand, p.price, p.quantity, p.description, 
                   p.image_url, p.category, p.rating, p.created_at
            FROM products p
            WHERE p.is_active = TRUE
            ORDER BY p.created_at DESC;
        """
        results = self.execute_query(query)
        products = []
        for row in results:
            products.append({
                'id': row[0],
                'name': row[1],
                'brand': row[2],
                'price': float(row[3]),
                'quantity': row[4],
                'description': row[5],
                'image_url': row[6],
                'category': row[7],
                'rating': row[8],
                'created_at': row[9]
            })
        return products

    def get_product_by_id(self, product_id: int) -> Optional[Dict[str, Any]]:
        """Get product by ID"""
        query = """
            SELECT p.id, p.name, p.brand, p.price, p.quantity, p.description, 
                   p.image_url, p.category, p.rating
            FROM products p
            WHERE p.id = %s AND p.is_active = TRUE;
        """
        result = self.execute_query_single(query, (product_id,))
        if result:
            return {
                'id': result[0],
                'name': result[1],
                'brand': result[2],
                'price': float(result[3]),
                'quantity': result[4],
                'description': result[5],
                'image_url': result[6],
                'category': result[7],
                'rating': result[8]
            }
        return None

    def get_products_by_category(self, category: str) -> List[Dict[str, Any]]:
        """Get products by category"""
        query = """
            SELECT p.id, p.name, p.brand, p.price, p.quantity, p.description, 
                   p.image_url, p.category, p.rating
            FROM products p
            WHERE p.category = %s AND p.is_active = TRUE
            ORDER BY p.created_at DESC;
        """
        results = self.execute_query(query, (category,))
        products = []
        for row in results:
            products.append({
                'id': row[0],
                'name': row[1],
                'brand': row[2],
                'price': float(row[3]),
                'quantity': row[4],
                'description': row[5],
                'image_url': row[6],
                'category': row[7],
                'rating': row[8]
            })
        return products

    def search_products(self, query_text: str) -> List[Dict[str, Any]]:
        """Search products by name, brand, or description"""
        query = """
            SELECT p.id, p.name, p.brand, p.price, p.quantity, p.description, 
                   p.image_url, p.category, p.rating
            FROM products p
            WHERE (p.name ILIKE %s OR p.brand ILIKE %s OR p.description ILIKE %s)
            AND p.is_active = TRUE
            ORDER BY p.created_at DESC;
        """
        search_term = f"%{query_text}%"
        results = self.execute_query(query, (search_term, search_term, search_term))
        products = []
        for row in results:
            products.append({
                'id': row[0],
                'name': row[1],
                'brand': row[2],
                'price': float(row[3]),
                'quantity': row[4],
                'description': row[5],
                'image_url': row[6],
                'category': row[7],
                'rating': row[8]
            })
        return products

    def get_low_stock_products(self, threshold: int = 10) -> List[Dict[str, Any]]:
        """Get products with low stock"""
        query = """
            SELECT p.id, p.name, p.brand, p.price, p.quantity, p.category
            FROM products p
            WHERE p.quantity < %s AND p.is_active = TRUE
            ORDER BY p.quantity ASC;
        """
        results = self.execute_query(query, (threshold,))
        products = []
        for row in results:
            products.append({
                'id': row[0],
                'name': row[1],
                'brand': row[2],
                'price': float(row[3]),
                'quantity': row[4],
                'category': row[5]
            })
        return products

    def create_order(self, user_id: int, total_amount: float, items: List[Dict]) -> bool:
        """
        Create a new order

        Args:
            user_id: User ID
            total_amount: Total order amount
            items: List of order items

        Returns:
            bool: True if successful
        """
        try:
            # Generate order number
            order_number = f"ORD-{user_id}-{int(__import__('time').time())}"

            # Insert order
            insert_order = """
                INSERT INTO orders (order_number, user_id, total_amount, status)
                VALUES (%s, %s, %s, 'Pending')
                RETURNING id;
            """
            self.cursor.execute(insert_order, (order_number, user_id, total_amount))
            order_id = self.cursor.fetchone()[0]

            # Insert order items
            for item in items:
                insert_item = """
                    INSERT INTO order_items (order_id, product_id, quantity, price)
                    VALUES (%s, %s, %s, %s);
                """
                self.cursor.execute(insert_item, (
                    order_id,
                    item['product_id'],
                    item['quantity'],
                    item['price']
                ))

                # Reduce product stock
                update_stock = """
                    UPDATE products
                    SET quantity = quantity - %s
                    WHERE id = %s;
                """
                self.cursor.execute(update_stock, (item['quantity'], item['product_id']))

            self.connection.commit()
            print(f"✓ Order created: {order_number}")
            return True
        except Error as e:
            self.connection.rollback()
            print(f"✗ Order Creation Error: {e}")
            return False

    def health_check(self) -> bool:
        """Check database connection health"""
        try:
            result = self.execute_query_single("SELECT 1;")
            return result is not None
        except:
            return False


# Example usage
if __name__ == "__main__":
    # Create configuration
    config = DatabaseConfig(
        host="localhost",
        port=5432,
        database="wonderland_toy_store",
        user="postgres",
        password="your_password"
    )

    # Connect to database
    db = DatabaseConnection(config)

    if db.connect():
        # Get all products
        products = db.get_products()
        print(f"\nTotal Products: {len(products)}")

        # Get products by category
        electronic = db.get_products_by_category("Electronic")
        print(f"Electronic Toys: {len(electronic)}")

        # Search products
        search_results = db.search_products("robot")
        print(f"Search Results for 'robot': {len(search_results)}")

        # Low stock
        low_stock = db.get_low_stock_products(10)
        print(f"Low Stock Products: {len(low_stock)}")

        # Check health
        is_healthy = db.health_check()
        print(f"Database Health: {'✓ Healthy' if is_healthy else '✗ Unhealthy'}")

        db.disconnect()

