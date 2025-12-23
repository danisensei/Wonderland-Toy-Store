"""
Wonderland Toy Store Models Package
Contains all product models with OOP inheritance hierarchy
"""

from .product import Product
from .electronic_toy import ElectronicToy
from .plush_toy import PlushToy
from .board_game import BoardGame

__all__ = [
    'Product',
    'ElectronicToy',
    'PlushToy',
    'BoardGame'
]

