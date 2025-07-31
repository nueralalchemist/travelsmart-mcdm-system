from fastapi import APIRouter, HTTPException
from app.models.destination import FilterOptions
from app.services.destination_service import DestinationService
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Initialize service
destination_service = DestinationService()

@router.get("/options", response_model=FilterOptions)
async def get_filter_options():
    """
    Get all available filter options for the frontend.
    """
    try:
        filter_options = destination_service.get_filter_options()
        return filter_options
    except Exception as e:
        logger.error(f"Error getting filter options: {e}")
        raise HTTPException(status_code=500, detail="Internal server error") 