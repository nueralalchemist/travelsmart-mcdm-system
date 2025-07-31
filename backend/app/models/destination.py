from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

class ClimateType(str, Enum):
    SUNNY = "sunny"
    SNOWY = "snowy"
    RAINY = "rainy"
    TEMPERATE = "temperate"
    TROPICAL = "tropical"
    DESERT = "desert"

class TerrainType(str, Enum):
    BEACH = "beach"
    MOUNTAIN = "mountain"
    URBAN = "urban"
    DESERT = "desert"
    FOREST = "forest"
    ISLAND = "island"

class ActivityType(str, Enum):
    ADVENTURE = "adventure"
    HIKING = "hiking"
    BEACH = "beach"
    ROAD_TRIP = "road_trip"
    CULTURAL = "cultural"
    RELAXATION = "relaxation"
    SHOPPING = "shopping"
    FOOD = "food"
    NIGHTLIFE = "nightlife"

class BudgetRange(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    LUXURY = "luxury"

class PackageType(str, Enum):
    FAMILY = "family"
    SOLO = "solo"
    HONEYMOON = "honeymoon"
    BUSINESS = "business"
    GROUP = "group"

class Continent(str, Enum):
    ASIA = "asia"
    EUROPE = "europe"
    NORTH_AMERICA = "north_america"
    SOUTH_AMERICA = "south_america"
    AFRICA = "africa"
    OCEANIA = "oceania"
    ANTARCTICA = "antarctica"

class Destination(BaseModel):
    id: str
    name: str
    country: str
    continent: Continent
    climate: ClimateType
    terrain: TerrainType
    activities: List[ActivityType]
    budget_range: BudgetRange
    popularity_score: float = Field(ge=0, le=10)
    safety_score: float = Field(ge=0, le=10)
    accessibility_score: float = Field(ge=0, le=10)
    weather_type: str
    package_type: List[PackageType]
    images: List[str]
    booking_url: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    description: Optional[str] = None
    best_time_to_visit: Optional[str] = None

class UserFilters(BaseModel):
    continents: Optional[List[Continent]] = None
    countries: Optional[List[str]] = None
    climates: Optional[List[ClimateType]] = None
    terrains: Optional[List[TerrainType]] = None
    activities: Optional[List[ActivityType]] = None
    budget_ranges: Optional[List[BudgetRange]] = None
    package_types: Optional[List[PackageType]] = None
    weather_types: Optional[List[str]] = None
    min_popularity: Optional[float] = Field(None, ge=0, le=10)
    max_popularity: Optional[float] = Field(None, ge=0, le=10)
    min_safety: Optional[float] = Field(None, ge=0, le=10)
    max_safety: Optional[float] = Field(None, ge=0, le=10)

class TOPSISWeights(BaseModel):
    popularity_score: float = Field(0.2, ge=0, le=1)
    budget_score: float = Field(0.15, ge=0, le=1)
    climate_score: float = Field(0.15, ge=0, le=1)
    activity_score: float = Field(0.2, ge=0, le=1)
    terrain_score: float = Field(0.1, ge=0, le=1)
    safety_score: float = Field(0.1, ge=0, le=1)
    accessibility_score: float = Field(0.1, ge=0, le=1)

class RecommendationRequest(BaseModel):
    filters: UserFilters
    weights: Optional[TOPSISWeights] = None
    max_results: Optional[int] = Field(20, ge=1, le=50)

class RecommendationResponse(BaseModel):
    destinations: List[Destination]
    scores: List[float]
    total_results: int
    filters_applied: UserFilters
    weights_used: TOPSISWeights

class FilterOptions(BaseModel):
    continents: List[Continent]
    countries: List[str]
    climates: List[ClimateType]
    terrains: List[TerrainType]
    activities: List[ActivityType]
    budget_ranges: List[BudgetRange]
    package_types: List[PackageType]
    weather_types: List[str] 