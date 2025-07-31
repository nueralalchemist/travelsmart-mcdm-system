import numpy as np
import pandas as pd
from typing import List, Dict, Tuple, Optional
from app.models.destination import Destination, UserFilters, TOPSISWeights
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

class TOPSISService:
    """
    Implementation of TOPSIS (Technique for Order Preference by Similarity to an Ideal Solution)
    algorithm for multi-criteria decision making in travel destination ranking.
    """
    
    def __init__(self):
        self.weights = settings.DEFAULT_WEIGHTS
        self.criteria = list(self.weights.keys())
    
    def normalize_matrix(self, decision_matrix: np.ndarray) -> np.ndarray:
        """
        Normalize the decision matrix using vector normalization.
        
        Args:
            decision_matrix: Raw decision matrix
            
        Returns:
            Normalized decision matrix
        """
        # Vector normalization
        squared_sum = np.sum(decision_matrix ** 2, axis=0)
        normalized_matrix = decision_matrix / np.sqrt(squared_sum)
        return normalized_matrix
    
    def apply_weights(self, normalized_matrix: np.ndarray, weights: Dict[str, float]) -> np.ndarray:
        """
        Apply weights to the normalized decision matrix.
        
        Args:
            normalized_matrix: Normalized decision matrix
            weights: Dictionary of criteria weights
            
        Returns:
            Weighted normalized matrix
        """
        weight_vector = np.array([weights[criteria] for criteria in self.criteria])
        weighted_matrix = normalized_matrix * weight_vector
        return weighted_matrix
    
    def find_ideal_solutions(self, weighted_matrix: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        Find positive and negative ideal solutions.
        
        Args:
            weighted_matrix: Weighted normalized matrix
            
        Returns:
            Tuple of (positive_ideal, negative_ideal)
        """
        # For most criteria, higher is better (benefit criteria)
        # For budget, lower is better (cost criteria)
        benefit_criteria = ['popularity_score', 'climate_score', 'activity_score', 
                          'terrain_score', 'safety_score', 'accessibility_score']
        cost_criteria = ['budget_score']
        
        positive_ideal = np.zeros(weighted_matrix.shape[1])
        negative_ideal = np.zeros(weighted_matrix.shape[1])
        
        for i, criteria in enumerate(self.criteria):
            if criteria in benefit_criteria:
                positive_ideal[i] = np.max(weighted_matrix[:, i])
                negative_ideal[i] = np.min(weighted_matrix[:, i])
            else:  # cost criteria
                positive_ideal[i] = np.min(weighted_matrix[:, i])
                negative_ideal[i] = np.max(weighted_matrix[:, i])
        
        return positive_ideal, negative_ideal
    
    def calculate_distances(self, weighted_matrix: np.ndarray, 
                          positive_ideal: np.ndarray, 
                          negative_ideal: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        Calculate distances to positive and negative ideal solutions.
        
        Args:
            weighted_matrix: Weighted normalized matrix
            positive_ideal: Positive ideal solution
            negative_ideal: Negative ideal solution
            
        Returns:
            Tuple of (positive_distances, negative_distances)
        """
        positive_distances = np.sqrt(np.sum((weighted_matrix - positive_ideal) ** 2, axis=1))
        negative_distances = np.sqrt(np.sum((weighted_matrix - negative_ideal) ** 2, axis=1))
        
        return positive_distances, negative_distances
    
    def calculate_relative_closeness(self, positive_distances: np.ndarray, 
                                   negative_distances: np.ndarray) -> np.ndarray:
        """
        Calculate relative closeness to ideal solution.
        
        Args:
            positive_distances: Distances to positive ideal
            negative_distances: Distances to negative ideal
            
        Returns:
            Relative closeness scores
        """
        # Avoid division by zero
        denominator = positive_distances + negative_distances
        denominator[denominator == 0] = 1e-10
        
        relative_closeness = negative_distances / denominator
        return relative_closeness
    
    def prepare_decision_matrix(self, destinations: List[Destination]) -> np.ndarray:
        """
        Prepare decision matrix from destination data.
        
        Args:
            destinations: List of destination objects
            
        Returns:
            Decision matrix as numpy array
        """
        matrix_data = []
        
        for destination in destinations:
            # Convert categorical data to numerical scores
            budget_score = self._budget_to_score(destination.budget_range)
            climate_score = self._climate_to_score(destination.climate)
            activity_score = self._activities_to_score(destination.activities)
            terrain_score = self._terrain_to_score(destination.terrain)
            
            row = [
                destination.popularity_score,
                budget_score,
                climate_score,
                activity_score,
                terrain_score,
                destination.safety_score,
                destination.accessibility_score
            ]
            matrix_data.append(row)
        
        return np.array(matrix_data)
    
    def _budget_to_score(self, budget_range: str) -> float:
        """Convert budget range to numerical score (lower is better for budget)."""
        budget_scores = {
            'low': 1.0,
            'medium': 2.0,
            'high': 3.0,
            'luxury': 4.0
        }
        return budget_scores.get(budget_range, 2.0)
    
    def _climate_to_score(self, climate: str) -> float:
        """Convert climate to numerical score."""
        climate_scores = {
            'sunny': 9.0,
            'temperate': 8.0,
            'tropical': 7.0,
            'rainy': 5.0,
            'snowy': 6.0,
            'desert': 4.0
        }
        return climate_scores.get(climate, 6.0)
    
    def _activities_to_score(self, activities: List[str]) -> float:
        """Convert activities to numerical score based on variety and appeal."""
        activity_weights = {
            'adventure': 9.0,
            'hiking': 8.0,
            'beach': 7.0,
            'cultural': 8.0,
            'relaxation': 6.0,
            'shopping': 5.0,
            'food': 7.0,
            'nightlife': 6.0,
            'road_trip': 7.0
        }
        
        if not activities:
            return 5.0
        
        total_score = sum(activity_weights.get(activity, 5.0) for activity in activities)
        return total_score / len(activities)
    
    def _terrain_to_score(self, terrain: str) -> float:
        """Convert terrain to numerical score."""
        terrain_scores = {
            'beach': 8.0,
            'mountain': 9.0,
            'urban': 7.0,
            'forest': 8.0,
            'island': 8.0,
            'desert': 5.0
        }
        return terrain_scores.get(terrain, 6.0)
    
    def rank_destinations(self, destinations: List[Destination], 
                         weights: Optional[Dict[str, float]] = None) -> List[Tuple[Destination, float]]:
        """
        Rank destinations using TOPSIS algorithm.
        
        Args:
            destinations: List of destination objects
            weights: Optional custom weights for criteria
            
        Returns:
            List of (destination, score) tuples sorted by score (descending)
        """
        if not destinations:
            return []
        
        # Use custom weights if provided, otherwise use defaults
        if weights:
            self.weights = weights
        
        # Prepare decision matrix
        decision_matrix = self.prepare_decision_matrix(destinations)
        
        # Step 1: Normalize the decision matrix
        normalized_matrix = self.normalize_matrix(decision_matrix)
        
        # Step 2: Apply weights
        weighted_matrix = self.apply_weights(normalized_matrix, self.weights)
        
        # Step 3: Find ideal solutions
        positive_ideal, negative_ideal = self.find_ideal_solutions(weighted_matrix)
        
        # Step 4: Calculate distances
        positive_distances, negative_distances = self.calculate_distances(
            weighted_matrix, positive_ideal, negative_ideal
        )
        
        # Step 5: Calculate relative closeness
        relative_closeness = self.calculate_relative_closeness(
            positive_distances, negative_distances
        )
        
        # Step 6: Rank destinations
        ranked_destinations = list(zip(destinations, relative_closeness))
        ranked_destinations.sort(key=lambda x: x[1], reverse=True)
        
        logger.info(f"Ranked {len(destinations)} destinations using TOPSIS")
        
        return ranked_destinations
    
    def get_weights_summary(self) -> Dict[str, float]:
        """Get current weights configuration."""
        return self.weights.copy() 