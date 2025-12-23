"""
ElectronicToy Model - Specialized product class for electronic toys
Inherits from Product and adds electronic-specific attributes
"""

from datetime import datetime
from typing import Dict, Any, Optional
from product import Product


class ElectronicToy(Product):
    """
    Specialized product class for electronic toys.
    Extends Product with battery and power specifications.

    Additional Attributes:
        battery_type (str): Type of batteries required (e.g., "AA", "AAA", "Rechargeable")
        voltage (str): Operating voltage specifications (e.g., "3V", "5V")
    """

    # Class variable to define valid battery types
    VALID_BATTERY_TYPES = ["AA", "AAA", "C", "D", "9V", "Rechargeable", "USB-C", "Solar", "None"]

    def __init__(
        self,
        id: int,
        name: str,
        brand: str,
        price: float,
        quantity: int,
        description: str,
        image_url: str,
        battery_type: str,
        voltage: str,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None
    ):
        """
        Initialize an ElectronicToy instance.

        Args:
            battery_type (str): Type of batteries required
            voltage (str): Operating voltage
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
            category="Electronic",
            created_at=created_at,
            updated_at=updated_at
        )

        # Electronic-specific attributes (private for encapsulation)
        self._battery_type = battery_type
        self._voltage = voltage

        # Validate electronic-specific attributes
        self.validate_electronic_specs()

    # Properties for encapsulation
    @property
    def battery_type(self) -> str:
        """Get battery type."""
        return self._battery_type

    @battery_type.setter
    def battery_type(self, value: str) -> None:
        """
        Set battery type with validation.

        Args:
            value (str): Battery type

        Raises:
            ValueError: If battery type is invalid
        """
        if not value or len(value.strip()) == 0:
            raise ValueError("Battery type cannot be empty")
        self._battery_type = value
        self._updated_at = datetime.now()

    @property
    def voltage(self) -> str:
        """Get voltage specification."""
        return self._voltage

    @voltage.setter
    def voltage(self, value: str) -> None:
        """
        Set voltage with validation.

        Args:
            value (str): Voltage specification

        Raises:
            ValueError: If voltage is invalid
        """
        if not value or len(value.strip()) == 0:
            raise ValueError("Voltage cannot be empty")
        self._voltage = value
        self._updated_at = datetime.now()

    # Electronic-specific validation methods
    def validate_electronic_specs(self) -> bool:
        """
        Validate electronic-specific specifications.
        Ensures battery type and voltage are properly specified.

        Returns:
            bool: True if valid, raises exception otherwise
        """
        if not self._battery_type or len(self._battery_type.strip()) == 0:
            raise ValueError("Battery type is required for electronic toys")

        if not self._voltage or len(self._voltage.strip()) == 0:
            raise ValueError("Voltage specification is required for electronic toys")

        # Optional: Validate against known battery types
        if self._battery_type not in self.VALID_BATTERY_TYPES:
            raise ValueError(
                f"Invalid battery type: {self._battery_type}. "
                f"Valid types: {', '.join(self.VALID_BATTERY_TYPES)}"
            )

        return True

    def validate_power_specs(self) -> Dict[str, Any]:
        """
        Validate and return power specifications summary.
        This is a polymorphic method specific to electronic toys.

        Returns:
            dict: Power specification validation result
        """
        return {
            'battery_type': self._battery_type,
            'voltage': self._voltage,
            'requires_batteries': self._battery_type != "None",
            'is_rechargeable': self._battery_type == "Rechargeable",
            'is_valid': True
        }

    def get_power_requirements(self) -> str:
        """
        Get human-readable power requirements string.

        Returns:
            str: Power requirements description
        """
        if self._battery_type == "None":
            return "No batteries required"
        elif self._battery_type == "Rechargeable":
            return f"Rechargeable battery required ({self._voltage})"
        else:
            return f"{self._battery_type} batteries required ({self._voltage})"

    def get_details(self) -> Dict[str, Any]:
        """
        Override parent method to include electronic-specific details.
        This demonstrates polymorphism - same method name, different behavior.

        Returns:
            dict: Complete product and electronic toy details
        """
        # Get parent class details
        details = super().get_details()

        # Add electronic-specific details
        details.update({
            'battery_type': self._battery_type,
            'voltage': self._voltage,
            'power_requirements': self.get_power_requirements(),
            'power_specs': self.validate_power_specs()
        })

        return details

    def validate_product(self) -> bool:
        """
        Override parent validation to include electronic specs.
        Demonstrates method overriding for polymorphism.

        Returns:
            bool: True if all validations pass
        """
        # Call parent validation
        super().validate_product()

        # Add electronic-specific validation
        self.validate_electronic_specs()

        return True

    def __str__(self) -> str:
        """String representation including electronic details."""
        return (f"ElectronicToy(id={self._id}, name={self._name}, "
                f"battery_type={self._battery_type}, voltage={self._voltage})")

