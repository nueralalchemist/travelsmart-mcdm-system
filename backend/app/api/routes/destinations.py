from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.destination import Destination
from app.services.destination_service import DestinationService
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Initialize service
destination_service = DestinationService()

@router.get("/", response_model=List[Destination])
async def get_all_destinations():
    """
    Get all available destinations.
    """
    try:
        destinations = destination_service.get_all_destinations()
        return destinations
    except Exception as e:
        logger.error(f"Error getting all destinations: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{destination_id}", response_model=Destination)
async def get_destination_by_id(destination_id: str):
    """
    Get a specific destination by ID.
    """
    try:
        destination = destination_service.get_destination_by_id(destination_id)
        if not destination:
            raise HTTPException(status_code=404, detail="Destination not found")
        return destination
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting destination {destination_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/search/", response_model=List[Destination])
async def search_destinations(query: str = Query(..., min_length=1)):
    """
    Search destinations by name or country.
    """
    try:
        destinations = destination_service.search_destinations(query)
        return destinations
    except Exception as e:
        logger.error(f"Error searching destinations: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/continent/{continent}", response_model=List[Destination])
async def get_destinations_by_continent(continent: str):
    """
    Get destinations by continent.
    """
    try:
        destinations = destination_service.get_destinations_by_continent(continent)
        return destinations
    except Exception as e:
        logger.error(f"Error getting destinations by continent: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/country/{country}", response_model=List[Destination])
async def get_destinations_by_country(country: str):
    """
    Get destinations by country.
    """
    try:
        destinations = destination_service.get_destinations_by_country(country)
        return destinations
    except Exception as e:
        logger.error(f"Error getting destinations by country: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/popular/", response_model=List[Destination])
async def get_popular_destinations(limit: int = Query(10, ge=1, le=50)):
    """
    Get top popular destinations.
    """
    try:
        destinations = destination_service.get_popular_destinations(limit)
        return destinations
    except Exception as e:
        logger.error(f"Error getting popular destinations: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/budget-friendly/", response_model=List[Destination])
async def get_budget_friendly_destinations(limit: int = Query(10, ge=1, le=50)):
    """
    Get budget-friendly destinations.
    """
    try:
        destinations = destination_service.get_budget_friendly_destinations(limit)
        return destinations
    except Exception as e:
        logger.error(f"Error getting budget-friendly destinations: {e}")
        raise HTTPException(status_code=500, detail="Internal server error") 