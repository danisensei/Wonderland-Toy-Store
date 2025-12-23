"""
Product Model - Base class for all toy products
Implements abstraction, encapsulation, and serves as parent for inheritance
"""

from datetime import datetime
from typing import Dict, Any, Optional


class Product:
    """
    Base class for all products in the Wonderland Toy Store.
    Implements core product attributes and methods.

    Attributes:
        id (int): Unique product identifier
        name (str): Product name
        brand (str): Product brand
        price (float): Product price in PKR (Pakistani Rupee)
        quantity (int): Available stock quantity
        description (str): Product description
        image_url (str): URL to product image
        category (str): Product category type
        created_at (datetime): Creation timestamp
        updated_at (datetime): Last update timestamp
    """

    def __init__(
        self,
        id: int,
        name: str,
        brand: str,
        price: float,
        quantity: int,
        description: str,
        image_url: str,
        category: str,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None
    ):
        """Initialize a Product instance with core attributes."""
        self._id = id
        self._name = name
        self._brand = brand
        self._price = price
        self._quantity = quantity
        self._description = description
        self._image_url = image_url
        self._category = category
        self._created_at = created_at or datetime.now()
        self._updated_at = updated_at or datetime.now()

    # Properties with getters and setters for encapsulation
    @property
    def id(self) -> int:
        """Get product ID."""
        return self._id

    @property
    def name(self) -> str:
        """Get product name."""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        """Set product name."""
        if not value or len(value.strip()) == 0:
            raise ValueError("Product name cannot be empty")
        self._name = value
        self._updated_at = datetime.now()

    @property
    def brand(self) -> str:
        """Get product brand."""
        return self._brand

    @brand.setter
    def brand(self, value: str) -> None:
        """Set product brand."""
        if not value or len(value.strip()) == 0:
            raise ValueError("Product brand cannot be empty")
        self._brand = value
        self._updated_at = datetime.now()

    @property
    def price(self) -> float:
        """Get product price."""
        return self._price

    @price.setter
    def price(self, value: float) -> None:
        """Set product price."""
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = value
        self._updated_at = datetime.now()

    @property
    def quantity(self) -> int:
        """Get available stock quantity."""
        return self._quantity

    @quantity.setter
    def quantity(self, value: int) -> None:
        """Set stock quantity."""
        if value < 0:
            raise ValueError("Quantity cannot be negative")
        self._quantity = value
        self._updated_at = datetime.now()

    @property
    def description(self) -> str:
        """Get product description."""
        return self._description

    @description.setter
    def description(self, value: str) -> None:
        """Set product description."""
        self._description = value
        self._updated_at = datetime.now()

    @property
    def image_url(self) -> str:
        """Get product image URL."""
        return self._image_url

    @image_url.setter
    def image_url(self, value: str) -> None:
        """Set product image URL."""
        self._image_url = value
        self._updated_at = datetime.now()

    @property
    def category(self) -> str:
        """Get product category."""
        return self._category

    @property
    def created_at(self) -> datetime:
        """Get creation timestamp."""
        return self._created_at

    @property
    def updated_at(self) -> datetime:
        """Get last update timestamp."""
        return self._updated_at

    # Business logic methods
    def is_in_stock(self) -> bool:
        """
        Check if product is available in stock.

        Returns:
            bool: True if quantity > 0, False otherwise
        """
        return self._quantity > 0

    def reduce_stock(self, quantity: int) -> bool:
        """
        Reduce stock by specified quantity.
        Validates before reducing to prevent overselling.

        Args:
            quantity (int): Amount to reduce

        Returns:
            bool: True if reduction successful, False if insufficient stock
        """
        if quantity <= 0:
            raise ValueError("Quantity to reduce must be positive")

        if self._quantity < quantity:
            return False

        self._quantity -= quantity
        self._updated_at = datetime.now()
        return True

    def increase_stock(self, quantity: int) -> None:
        """
        Increase stock by specified quantity (for restocking).

        Args:
            quantity (int): Amount to add
        """
        if quantity <= 0:
            raise ValueError("Quantity to increase must be positive")

        self._quantity += quantity
        self._updated_at = datetime.now()

    def get_details(self) -> Dict[str, Any]:
        """
        Get all product details as dictionary.
        Base implementation - can be overridden in subclasses.

        Returns:
            dict: Product information
        """
        return {
            'id': self._id,
            'name': self._name,
            'brand': self._brand,
            'price': self._price,
            'quantity': self._quantity,
            'description': self._description,
            'image_url': self._image_url,
            'category': self._category,
            'in_stock': self.is_in_stock(),
            'created_at': self._created_at.isoformat(),
            'updated_at': self._updated_at.isoformat()
        }

    def validate_product(self) -> bool:
        """
        Validate product data integrity.
        Base validation - subclasses can add specific validations.

        Returns:
            bool: True if valid, raises exception otherwise
        """
        if not self._name or len(self._name.strip()) == 0:
            raise ValueError("Product name is required")
        if not self._brand or len(self._brand.strip()) == 0:
            raise ValueError("Product brand is required")
        if self._price < 0:
            raise ValueError("Product price cannot be negative")
        if self._quantity < 0:
            raise ValueError("Product quantity cannot be negative")
        return True

    def __str__(self) -> str:
        """String representation of product."""
        return f"Product(id={self._id}, name={self._name}, brand={self._brand}, price=PKR {self._price:,.0f}, quantity={self._quantity})"

    def __repr__(self) -> str:
        """Developer-friendly representation."""
        return self.__str__()

    # ========== DISCOUNT & PRICING METHODS ==========
    def apply_discount(self, discount_percent: float) -> float:
        """
        Apply discount to product and return discounted price.

        Args:
            discount_percent (float): Discount percentage (0-100)

        Returns:
            float: Discounted price

        Raises:
            ValueError: If discount is invalid
        """
        if discount_percent < 0 or discount_percent > 100:
            raise ValueError("Discount must be between 0 and 100")

        discount_amount = self._price * (discount_percent / 100)
        return round(self._price - discount_amount, 2)

    def get_discounted_price(self, discount_percent: float) -> Dict[str, Any]:
        """
        Get detailed discount information.

        Args:
            discount_percent (float): Discount percentage

        Returns:
            dict: Original price, discount amount, and final price
        """
        discounted = self.apply_discount(discount_percent)
        discount_amount = self._price - discounted

        return {
            'original_price': self._price,
            'discount_percent': discount_percent,
            'discount_amount': round(discount_amount, 2),
            'final_price': discounted
        }

    # ========== RATING & REVIEW SYSTEM ==========
    def set_rating(self, rating: float) -> None:
        """
        Set product rating (1-5 stars).

        Args:
            rating (float): Rating value

        Raises:
            ValueError: If rating is out of range
        """
        if rating < 1 or rating > 5:
            raise ValueError("Rating must be between 1 and 5")

        self._rating = rating
        self._updated_at = datetime.now()

    def get_rating(self) -> Optional[float]:
        """Get product rating if available."""
        return getattr(self, '_rating', None)

    def is_highly_rated(self, threshold: float = 4.0) -> bool:
        """
        Check if product meets rating threshold.

        Args:
            threshold (float): Minimum rating required

        Returns:
            bool: True if rated above threshold
        """
        rating = self.get_rating()
        return rating is not None and rating >= threshold

    # ========== SEARCH & FILTER HELPERS ==========
    def matches_search(self, query: str) -> bool:
        """
        Check if product matches search query.

        Args:
            query (str): Search term

        Returns:
            bool: True if product matches
        """
        query_lower = query.lower()
        return (
            query_lower in self._name.lower() or
            query_lower in self._brand.lower() or
            query_lower in self._description.lower() or
            query_lower in self._category.lower()
        )

    def is_within_price_range(self, min_price: float, max_price: float) -> bool:
        """
        Check if product is within price range.

        Args:
            min_price (float): Minimum price
            max_price (float): Maximum price

        Returns:
            bool: True if price is in range
        """
        return min_price <= self._price <= max_price

    def get_search_keywords(self) -> list:
        """
        Get searchable keywords from product.

        Returns:
            list: Keywords for search indexing
        """
        keywords = []
        keywords.extend(self._name.lower().split())
        keywords.extend(self._brand.lower().split())
        keywords.extend(self._description.lower().split())
        keywords.append(self._category.lower())

        return list(set(keywords))  # Remove duplicates

    # ========== PRODUCT COMPARISON ==========
    def __eq__(self, other: 'Product') -> bool:
        """
        Check if two products are the same (by ID).

        Args:
            other: Another Product instance

        Returns:
            bool: True if same product
        """
        if not isinstance(other, Product):
            return False
        return self._id == other._id

    def __lt__(self, other: 'Product') -> bool:
        """Compare products by price (less than)."""
        if not isinstance(other, Product):
            return NotImplemented
        return self._price < other._price

    def __le__(self, other: 'Product') -> bool:
        """Compare products by price (less than or equal)."""
        if not isinstance(other, Product):
            return NotImplemented
        return self._price <= other._price

    def __gt__(self, other: 'Product') -> bool:
        """Compare products by price (greater than)."""
        if not isinstance(other, Product):
            return NotImplemented
        return self._price > other._price

    def __ge__(self, other: 'Product') -> bool:
        """Compare products by price (greater than or equal)."""
        if not isinstance(other, Product):
            return NotImplemented
        return self._price >= other._price

    def __hash__(self) -> int:
        """Make product hashable by ID."""
        return hash(self._id)

    # ========== INVENTORY OPERATIONS ==========
    def is_low_stock(self, threshold: int = 5) -> bool:
        """
        Check if product stock is below threshold.

        Args:
            threshold (int): Minimum stock level

        Returns:
            bool: True if stock is low
        """
        return self._quantity < threshold

    def get_stock_percentage(self, initial_stock: int) -> float:
        """
        Get remaining stock as percentage of initial stock.

        Args:
            initial_stock (int): Original stock quantity

        Returns:
            float: Percentage remaining (0-100)
        """
        if initial_stock <= 0:
            return 0.0
        return round((self._quantity / initial_stock) * 100, 2)

    def calculate_restock_quantity(self, target_stock: int) -> int:
        """
        Calculate how much to restock to reach target quantity.

        Args:
            target_stock (int): Desired stock level

        Returns:
            int: Quantity needed to order
        """
        if target_stock <= self._quantity:
            return 0
        return target_stock - self._quantity

    # ========== DATA EXPORT ==========
    def to_json(self) -> Dict[str, Any]:
        """
        Convert product to JSON-serializable dictionary.

        Returns:
            dict: Product data as dictionary
        """
        return self.get_details()

    def to_csv_row(self) -> list:
        """
        Convert product to CSV row format.

        Returns:
            list: Product data as list for CSV
        """
        return [
            self._id,
            self._name,
            self._brand,
            self._price,
            self._quantity,
            self._description,
            self._image_url,
            self._category,
            self._created_at.isoformat(),
            self._updated_at.isoformat()
        ]

    @staticmethod
    def csv_headers() -> list:
        """Get CSV column headers."""
        return [
            'ID', 'Name', 'Brand', 'Price', 'Quantity',
            'Description', 'Image URL', 'Category',
            'Created At', 'Updated At'
        ]
