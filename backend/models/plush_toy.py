"""
PlushToy Model - Specialized product class for plush toys
Inherits from Product and adds plush-specific attributes
"""

from datetime import datetime
from typing import Dict, Any, Optional
from product import Product


class PlushToy(Product):
    """
    Specialized product class for plush toys.
    Extends Product with material and size specifications.

    Additional Attributes:
        material (str): Material used (e.g., "Polyester", "Cotton", "Fleece")
        size (str): Physical size (e.g., "Small", "Medium", "Large", "10cm", "30cm")
    """

    # Class variables for valid values
    VALID_MATERIALS = ["Polyester", "Cotton", "Fleece", "Velvet", "Plush", "Mixed"]
    VALID_SIZES = ["Micro", "Small", "Medium", "Large", "Extra Large"]

    def __init__(
        self,
        id: int,
        name: str,
        brand: str,
        price: float,
        quantity: int,
        description: str,
        image_url: str,
        material: str,
        size: str,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None
    ):
        """
        Initialize a PlushToy instance.

        Args:
            material (str): Material used in the plush toy
            size (str): Size of the plush toy
        """
        # Call parent class constructor
        super().__init__(
            id=id,
            name=name,
            brand=brand,
            price=price,
            quantity=quantity,
            description=description,
            image_url=image_url,
            category="Plush",
            created_at=created_at,
            updated_at=updated_at
        )

        # Plush-specific attributes (private for encapsulation)
        self._material = material
        self._size = size

        # Validate plush-specific attributes
        self.validate_plush_specs()

    # Properties for encapsulation
    @property
    def material(self) -> str:
        """Get plush material."""
        return self._material

    @material.setter
    def material(self, value: str) -> None:
        """
        Set material with validation.

        Args:
            value (str): Material type

        Raises:
            ValueError: If material is invalid
        """
        if not value or len(value.strip()) == 0:
            raise ValueError("Material cannot be empty")
        self._material = value
        self._updated_at = datetime.now()

    @property
    def size(self) -> str:
        """Get plush size."""
        return self._size

    @size.setter
    def size(self, value: str) -> None:
        """
        Set size with validation.

        Args:
            value (str): Size specification

        Raises:
            ValueError: If size is invalid
        """
        if not value or len(value.strip()) == 0:
            raise ValueError("Size cannot be empty")
        self._size = value
        self._updated_at = datetime.now()

    # Plush-specific validation methods
    def validate_plush_specs(self) -> bool:
        """
        Validate plush-specific specifications.
        Ensures material and size are properly specified.

        Returns:
            bool: True if valid, raises exception otherwise
        """
        if not self._material or len(self._material.strip()) == 0:
            raise ValueError("Material is required for plush toys")

        if not self._size or len(self._size.strip()) == 0:
            raise ValueError("Size is required for plush toys")

        # Optional: Validate against known materials
        if self._material not in self.VALID_MATERIALS:
            raise ValueError(
                f"Invalid material: {self._material}. "
                f"Valid materials: {', '.join(self.VALID_MATERIALS)}"
            )

        # Optional: Validate against known sizes
        if self._size not in self.VALID_SIZES:
            raise ValueError(
                f"Invalid size: {self._size}. "
                f"Valid sizes: {', '.join(self.VALID_SIZES)}"
            )

        return True

    def validate_size(self) -> Dict[str, Any]:
        """
        Validate and return size specifications.
        This is a polymorphic method specific to plush toys.

        Returns:
            dict: Size validation result with dimensions
        """
        size_mapping = {
            "Micro": {"height_cm": 5, "description": "Keychain size"},
            "Small": {"height_cm": 15, "description": "Hand-palm size"},
            "Medium": {"height_cm": 30, "description": "Standard stuffed animal"},
            "Large": {"height_cm": 60, "description": "Big cuddle buddy"},
            "Extra Large": {"height_cm": 100, "description": "Full-body size"}
        }

        size_info = size_mapping.get(self._size, {"height_cm": None, "description": "Custom size"})

        return {
            'size': self._size,
            'height_cm': size_info["height_cm"],
            'description': size_info["description"],
            'is_valid': True
        }

    def get_care_instructions(self) -> str:
        """
        Get care instructions based on material.

        Returns:
            str: Care instructions for the plush toy
        """
        care_map = {
            "Polyester": "Machine wash warm, gentle cycle. Tumble dry low.",
            "Cotton": "Machine wash warm, gentle cycle. Air dry recommended.",
            "Fleece": "Gentle hand wash recommended. Air dry only.",
            "Velvet": "Professional dry cleaning recommended.",
            "Plush": "Dry clean only.",
            "Mixed": "Check care label. Generally hand wash and air dry."
        }

        return care_map.get(self._material, "Follow care label instructions")

    def get_details(self) -> Dict[str, Any]:
        """
        Override parent method to include plush-specific details.
        Demonstrates polymorphism - same method name, different behavior.

        Returns:
            dict: Complete product and plush toy details
        """
        # Get parent class details
        details = super().get_details()

        # Add plush-specific details
        details.update({
            'material': self._material,
            'size': self._size,
            'size_specs': self.validate_size(),
            'care_instructions': self.get_care_instructions()
        })

        return details

    def validate_product(self) -> bool:
        """
        Override parent validation to include plush specs.
        Demonstrates method overriding for polymorphism.

        Returns:
            bool: True if all validations pass
        """
        # Call parent validation
        super().validate_product()

        # Add plush-specific validation
        self.validate_plush_specs()

        return True

    def __str__(self) -> str:
        """String representation including plush details."""
        return (f"PlushToy(id={self._id}, name={self._name}, "
                f"material={self._material}, size={self._size})")

