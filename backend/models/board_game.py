"""
BoardGame Model - Specialized product class for board games
Inherits from Product and adds game-specific attributes
"""

from datetime import datetime
from typing import Dict, Any, Optional, List
from product import Product


class BoardGame(Product):
    """
    Specialized product class for board games.
    Extends Product with game-specific attributes.

    Additional Attributes:
        age_range (str): Recommended age range (e.g., "3+", "5-10", "8+")
        number_of_players (str): Number of players (e.g., "2-4", "1+")
    """

    # Class variables for valid values
    VALID_AGE_RANGES = ["3+", "5+", "8+", "10+", "12+", "14+", "16+", "18+"]

    def __init__(
        self,
        id: int,
        name: str,
        brand: str,
        price: float,
        quantity: int,
        description: str,
        image_url: str,
        age_range: str,
        number_of_players: str,
        created_at: Optional[datetime] = None,
        updated_at: Optional[datetime] = None
    ):
        """
        Initialize a BoardGame instance.

        Args:
            age_range (str): Recommended minimum age
            number_of_players (str): Number of players supported
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
            category="BoardGame",
            created_at=created_at,
            updated_at=updated_at
        )

        # Board game-specific attributes (private for encapsulation)
        self._age_range = age_range
        self._number_of_players = number_of_players

        # Validate game-specific attributes
        self.validate_game_specs()

    # Properties for encapsulation
    @property
    def age_range(self) -> str:
        """Get recommended age range."""
        return self._age_range

    @age_range.setter
    def age_range(self, value: str) -> None:
        """
        Set age range with validation.

        Args:
            value (str): Age range specification

        Raises:
            ValueError: If age range is invalid
        """
        if not value or len(value.strip()) == 0:
            raise ValueError("Age range cannot be empty")
        self._age_range = value
        self._updated_at = datetime.now()

    @property
    def number_of_players(self) -> str:
        """Get number of players."""
        return self._number_of_players

    @number_of_players.setter
    def number_of_players(self, value: str) -> None:
        """
        Set number of players with validation.

        Args:
            value (str): Number of players specification

        Raises:
            ValueError: If format is invalid
        """
        if not value or len(value.strip()) == 0:
            raise ValueError("Number of players cannot be empty")
        self._number_of_players = value
        self._updated_at = datetime.now()

    # Game-specific validation methods
    def validate_game_specs(self) -> bool:
        """
        Validate game-specific specifications.
        Ensures age range and player count are properly specified.

        Returns:
            bool: True if valid, raises exception otherwise
        """
        if not self._age_range or len(self._age_range.strip()) == 0:
            raise ValueError("Age range is required for board games")

        if not self._number_of_players or len(self._number_of_players.strip()) == 0:
            raise ValueError("Number of players is required for board games")

        # Optional: Validate against known age ranges
        if self._age_range not in self.VALID_AGE_RANGES:
            raise ValueError(
                f"Invalid age range: {self._age_range}. "
                f"Valid ranges: {', '.join(self.VALID_AGE_RANGES)}"
            )

        return True

    def validate_player_count(self) -> Dict[str, Any]:
        """
        Validate and return player count specifications.
        This is a polymorphic method specific to board games.

        Returns:
            dict: Player count validation result
        """
        return {
            'number_of_players': self._number_of_players,
            'supports_single_player': 'Solo' in self._number_of_players or '1' in self._number_of_players,
            'supports_multiplayer': '-' in self._number_of_players or '+' in self._number_of_players,
            'is_valid': True
        }

    def get_age_recommendation(self) -> Dict[str, Any]:
        """
        Get detailed age recommendation information.

        Returns:
            dict: Age recommendation with category
        """
        age_categories = {
            "3+": {"min_age": 3, "category": "Toddler/Preschool", "cognitive_level": "Basic"},
            "5+": {"min_age": 5, "category": "Kindergarten", "cognitive_level": "Simple"},
            "8+": {"min_age": 8, "category": "Early Elementary", "cognitive_level": "Intermediate"},
            "10+": {"min_age": 10, "category": "Late Elementary", "cognitive_level": "Advanced"},
            "12+": {"min_age": 12, "category": "Middle School", "cognitive_level": "Complex"},
            "14+": {"min_age": 14, "category": "High School", "cognitive_level": "Very Complex"},
            "16+": {"min_age": 16, "category": "Older Teen", "cognitive_level": "Strategic"},
            "18+": {"min_age": 18, "category": "Adult", "cognitive_level": "Expert"}
        }

        return age_categories.get(self._age_range, {
            "min_age": None,
            "category": "Custom",
            "cognitive_level": "Unknown"
        })

    def get_ideal_group_size(self) -> str:
        """
        Get human-readable group size recommendation.

        Returns:
            str: Group size description
        """
        return f"Ideal for {self._number_of_players} players"

    def get_details(self) -> Dict[str, Any]:
        """
        Override parent method to include board game-specific details.
        Demonstrates polymorphism - same method name, different behavior.

        Returns:
            dict: Complete product and board game details
        """
        # Get parent class details
        details = super().get_details()

        # Add board game-specific details
        details.update({
            'age_range': self._age_range,
            'number_of_players': self._number_of_players,
            'age_recommendation': self.get_age_recommendation(),
            'player_specs': self.validate_player_count(),
            'group_size': self.get_ideal_group_size()
        })

        return details

    def validate_product(self) -> bool:
        """
        Override parent validation to include game specs.
        Demonstrates method overriding for polymorphism.

        Returns:
            bool: True if all validations pass
        """
        # Call parent validation
        super().validate_product()

        # Add board game-specific validation
        self.validate_game_specs()

        return True

    def is_suitable_for_age(self, age: int) -> bool:
        """
        Check if game is suitable for a specific age.

        Args:
            age (int): Person's age

        Returns:
            bool: True if age is within recommended range
        """
        age_rec = self.get_age_recommendation()
        min_age = age_rec.get("min_age")

        if min_age is None:
            return True  # Unknown recommendation, assume suitable

        return age >= min_age

    def __str__(self) -> str:
        """String representation including game details."""
        return (f"BoardGame(id={self._id}, name={self._name}, "
                f"age_range={self._age_range}, players={self._number_of_players})")

