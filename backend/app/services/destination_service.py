import json
import os
from typing import List, Optional, Dict, Any
from app.models.destination import Destination, UserFilters, FilterOptions
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class DestinationService:
    """
    Service for managing destination data, filtering, and data operations.
    """
    
    def __init__(self):
        self.destinations: List[Destination] = []
        self.data_file_path = settings.DATA_FILE_PATH
        self._load_destinations()
    
    def _load_destinations(self):
        """Load destinations from JSON file."""
        try:
            # Try to load from the specified path
            if os.path.exists(self.data_file_path):
                with open(self.data_file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            else:
                # Fallback to default data
                data = self._get_default_destinations()
            
            self.destinations = [Destination(**dest) for dest in data]
            logger.info(f"Loaded {len(self.destinations)} destinations")
            
        except Exception as e:
            logger.error(f"Error loading destinations: {e}")
            self.destinations = []
    
    def _get_default_destinations(self) -> List[Dict[str, Any]]:
        """Get default destination data if file doesn't exist."""
        return [
            {
                "id": "bali-indonesia",
                "name": "Bali",
                "country": "Indonesia",
                "continent": "asia",
                "climate": "tropical",
                "terrain": "island",
                "activities": ["beach", "cultural", "relaxation", "adventure"],
                "budget_range": "medium",
                "popularity_score": 9.2,
                "safety_score": 7.5,
                "accessibility_score": 8.0,
                "weather_type": "tropical",
                "package_type": ["family", "solo", "honeymoon"],
                "images": [
                    "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
                    "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800"
                ],
                "booking_url": "https://www.makemytrip.com/holidays-indonesia/bali-travel-packages.html",
                "latitude": -8.3405,
                "longitude": 115.0920,
                "description": "Tropical paradise with beautiful beaches and rich culture",
                "best_time_to_visit": "April to October"
            },
            {
                "id": "paris-france",
                "name": "Paris",
                "country": "France",
                "continent": "europe",
                "climate": "temperate",
                "terrain": "urban",
                "activities": ["cultural", "food", "shopping", "nightlife"],
                "budget_range": "high",
                "popularity_score": 9.5,
                "safety_score": 8.0,
                "accessibility_score": 9.0,
                "weather_type": "temperate",
                "package_type": ["family", "solo", "honeymoon", "business"],
                "images": [
                    "https://images.unsplash.com/photo-1502602898535-892ad260d538?w=800",
                    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800"
                ],
                "booking_url": "https://www.makemytrip.com/holidays-france/paris-travel-packages.html",
                "latitude": 48.8566,
                "longitude": 2.3522,
                "description": "City of love with iconic landmarks and rich history",
                "best_time_to_visit": "April to June, September to October"
            },
            {
                "id": "tokyo-japan",
                "name": "Tokyo",
                "country": "Japan",
                "continent": "asia",
                "climate": "temperate",
                "terrain": "urban",
                "activities": ["cultural", "food", "shopping", "nightlife"],
                "budget_range": "high",
                "popularity_score": 9.0,
                "safety_score": 9.5,
                "accessibility_score": 9.5,
                "weather_type": "temperate",
                "package_type": ["family", "solo", "business"],
                "images": [
                    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
                    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800"
                ],
                "booking_url": "https://www.makemytrip.com/holidays-japan/tokyo-travel-packages.html",
                "latitude": 35.6762,
                "longitude": 139.6503,
                "description": "Modern metropolis with traditional culture",
                "best_time_to_visit": "March to May, September to November"
            }
        ]
    
    def get_all_destinations(self) -> List[Destination]:
        """Get all destinations."""
        return self.destinations.copy()
    
    def get_destination_by_id(self, destination_id: str) -> Optional[Destination]:
        """Get destination by ID."""
        for destination in self.destinations:
            if destination.id == destination_id:
                return destination
        return None
    
    def filter_destinations(self, filters: UserFilters) -> List[Destination]:
        """
        Filter destinations based on user preferences.
        
        Args:
            filters: User filter preferences
            
        Returns:
            Filtered list of destinations
        """
        filtered_destinations = self.destinations.copy()
        
        # Filter by continents
        if filters.continents:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.continent in filters.continents
            ]
        
        # Filter by countries
        if filters.countries:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.country in filters.countries
            ]
        
        # Filter by climates
        if filters.climates:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.climate in filters.climates
            ]
        
        # Filter by terrains
        if filters.terrains:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.terrain in filters.terrains
            ]
        
        # Filter by activities (at least one activity should match)
        if filters.activities:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if any(activity in dest.activities for activity in filters.activities)
            ]
        
        # Filter by budget ranges
        if filters.budget_ranges:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.budget_range in filters.budget_ranges
            ]
        
        # Filter by package types (at least one package type should match)
        if filters.package_types:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if any(pkg_type in dest.package_type for pkg_type in filters.package_types)
            ]
        
        # Filter by weather types
        if filters.weather_types:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.weather_type in filters.weather_types
            ]
        
        # Filter by popularity range
        if filters.min_popularity is not None:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.popularity_score >= filters.min_popularity
            ]
        
        if filters.max_popularity is not None:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.popularity_score <= filters.max_popularity
            ]
        
        # Filter by safety range
        if filters.min_safety is not None:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.safety_score >= filters.min_safety
            ]
        
        if filters.max_safety is not None:
            filtered_destinations = [
                dest for dest in filtered_destinations 
                if dest.safety_score <= filters.max_safety
            ]
        
        logger.info(f"Filtered destinations: {len(filtered_destinations)} results")
        return filtered_destinations
    
    def get_filter_options(self) -> FilterOptions:
        """
        Get all available filter options from the destination data.
        
        Returns:
            FilterOptions object with all available options
        """
        continents = list(set(dest.continent for dest in self.destinations))
        countries = list(set(dest.country for dest in self.destinations))
        climates = list(set(dest.climate for dest in self.destinations))
        terrains = list(set(dest.terrain for dest in self.destinations))
        
        # Get all unique activities
        all_activities = set()
        for dest in self.destinations:
            all_activities.update(dest.activities)
        activities = list(all_activities)
        
        budget_ranges = list(set(dest.budget_range for dest in self.destinations))
        
        # Get all unique package types
        all_package_types = set()
        for dest in self.destinations:
            all_package_types.update(dest.package_type)
        package_types = list(all_package_types)
        
        weather_types = list(set(dest.weather_type for dest in self.destinations))
        
        return FilterOptions(
            continents=continents,
            countries=countries,
            climates=climates,
            terrains=terrains,
            activities=activities,
            budget_ranges=budget_ranges,
            package_types=package_types,
            weather_types=weather_types
        )
    
    def search_destinations(self, query: str) -> List[Destination]:
        """
        Search destinations by name or country.
        
        Args:
            query: Search query string
            
        Returns:
            List of matching destinations
        """
        query_lower = query.lower()
        matching_destinations = []
        
        for destination in self.destinations:
            if (query_lower in destination.name.lower() or 
                query_lower in destination.country.lower()):
                matching_destinations.append(destination)
        
        return matching_destinations
    
    def get_destinations_by_continent(self, continent: str) -> List[Destination]:
        """Get destinations by continent."""
        return [dest for dest in self.destinations if dest.continent == continent]
    
    def get_destinations_by_country(self, country: str) -> List[Destination]:
        """Get destinations by country."""
        return [dest for dest in self.destinations if dest.country == country]
    
    def get_popular_destinations(self, limit: int = 10) -> List[Destination]:
        """Get top popular destinations."""
        sorted_destinations = sorted(
            self.destinations, 
            key=lambda x: x.popularity_score, 
            reverse=True
        )
        return sorted_destinations[:limit]
    
    def get_budget_friendly_destinations(self, limit: int = 10) -> List[Destination]:
        """Get budget-friendly destinations."""
        budget_destinations = [
            dest for dest in self.destinations 
            if dest.budget_range in ['low', 'medium']
        ]
        sorted_destinations = sorted(
            budget_destinations, 
            key=lambda x: x.popularity_score, 
            reverse=True
        )
        return sorted_destinations[:limit] 