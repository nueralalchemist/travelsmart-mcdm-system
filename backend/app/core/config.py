from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Travel Destination Recommendation System"
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # Database Settings
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "travel_recommendation"
    
    # File Settings
    DATA_FILE_PATH: str = "data/destinations.json"
    
    # TOPSIS Settings
    DEFAULT_WEIGHTS: dict = {
        "popularity_score": 0.2,
        "budget_score": 0.15,
        "climate_score": 0.15,
        "activity_score": 0.2,
        "terrain_score": 0.1,
        "safety_score": 0.1,
        "accessibility_score": 0.1
    }
    
    # Recommendation Settings
    MAX_RECOMMENDATIONS: int = 20
    MIN_RECOMMENDATIONS: int = 5
    
    class Config:
        env_file = ".env"

settings = Settings() 