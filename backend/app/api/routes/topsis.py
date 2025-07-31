from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.models.destination import (
    Destination, UserFilters, TOPSISWeights, 
    RecommendationRequest, RecommendationResponse
)
from app.services.destination_service import DestinationService
from app.services.topsis_service import TOPSISService
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Initialize services
destination_service = DestinationService()
topsis_service = TOPSISService()

@router.post("/recommendations", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """
    Get destination recommendations using TOPSIS algorithm.
    """
    try:
        # Filter destinations based on user preferences
        filtered_destinations = destination_service.filter_destinations(request.filters)
        
        if not filtered_destinations:
            return RecommendationResponse(
                destinations=[],
                scores=[],
                total_results=0,
                filters_applied=request.filters,
                weights_used=request.weights or TOPSISWeights()
            )
        
        # Convert weights to dictionary if provided
        weights_dict = None
        if request.weights:
            weights_dict = {
                "popularity_score": request.weights.popularity_score,
                "budget_score": request.weights.budget_score,
                "climate_score": request.weights.climate_score,
                "activity_score": request.weights.activity_score,
                "terrain_score": request.weights.terrain_score,
                "safety_score": request.weights.safety_score,
                "accessibility_score": request.weights.accessibility_score
            }
        
        # Rank destinations using TOPSIS
        ranked_results = topsis_service.rank_destinations(
            filtered_destinations, 
            weights_dict
        )
        
        # Limit results
        max_results = min(request.max_results, len(ranked_results))
        limited_results = ranked_results[:max_results]
        
        # Extract destinations and scores
        destinations = [dest for dest, score in limited_results]
        scores = [score for dest, score in limited_results]
        
        # Use default weights if none provided
        weights_used = request.weights or TOPSISWeights()
        
        logger.info(f"Generated {len(destinations)} recommendations using TOPSIS")
        
        return RecommendationResponse(
            destinations=destinations,
            scores=scores,
            total_results=len(destinations),
            filters_applied=request.filters,
            weights_used=weights_used
        )
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/weights", response_model=Dict[str, float])
async def get_default_weights():
    """
    Get default TOPSIS weights configuration.
    """
    try:
        weights = topsis_service.get_weights_summary()
        return weights
    except Exception as e:
        logger.error(f"Error getting weights: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/test-ranking")
async def test_topsis_ranking():
    """
    Test endpoint to verify TOPSIS algorithm with sample data.
    """
    try:
        # Get all destinations for testing
        all_destinations = destination_service.get_all_destinations()
        
        if not all_destinations:
            raise HTTPException(status_code=404, detail="No destinations available for testing")
        
        # Test ranking with default weights
        ranked_results = topsis_service.rank_destinations(all_destinations)
        
        # Return top 5 results for testing
        test_results = ranked_results[:5]
        
        return {
            "message": "TOPSIS ranking test successful",
            "total_destinations": len(all_destinations),
            "top_5_results": [
                {
                    "destination": dest.name,
                    "country": dest.country,
                    "score": round(score, 4)
                }
                for dest, score in test_results
            ]
        }
        
    except Exception as e:
        logger.error(f"Error in TOPSIS test: {e}")
        raise HTTPException(status_code=500, detail="Internal server error") 