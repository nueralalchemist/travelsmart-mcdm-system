import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Initial state
const initialState = {
  destinations: [],
  filteredDestinations: [],
  filterOptions: null,
  userFilters: {
    continents: [],
    countries: [],
    climates: [],
    terrains: [],
    activities: [],
    budget_ranges: [],
    package_types: [],
    weather_types: [],
    min_popularity: null,
    max_popularity: null,
    min_safety: null,
    max_safety: null
  },
  recommendations: {
    destinations: [],
    scores: [],
    total_results: 0,
    filters_applied: {},
    weights_used: {}
  },
  loading: false,
  error: null
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_DESTINATIONS: 'SET_DESTINATIONS',
  SET_FILTER_OPTIONS: 'SET_FILTER_OPTIONS',
  SET_USER_FILTERS: 'SET_USER_FILTERS',
  SET_RECOMMENDATIONS: 'SET_RECOMMENDATIONS',
  CLEAR_RECOMMENDATIONS: 'CLEAR_RECOMMENDATIONS'
};

// Reducer
const travelReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_DESTINATIONS:
      return { ...state, destinations: action.payload };
    case ACTIONS.SET_FILTER_OPTIONS:
      return { ...state, filterOptions: action.payload };
    case ACTIONS.SET_USER_FILTERS:
      return { ...state, userFilters: { ...state.userFilters, ...action.payload } };
    case ACTIONS.SET_RECOMMENDATIONS:
      return { ...state, recommendations: action.payload, loading: false };
    case ACTIONS.CLEAR_RECOMMENDATIONS:
      return { 
        ...state, 
        recommendations: {
          destinations: [],
          scores: [],
          total_results: 0,
          filters_applied: {},
          weights_used: {}
        }, 
        loading: false 
      };
    default:
      return state;
  }
};

// Create context
const TravelContext = createContext();

// Provider component
export const TravelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(travelReducer, initialState);

  // API functions
  const api = {
    // Get all destinations
    getDestinations: async () => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const response = await axios.get(`${API_BASE_URL}/destinations/`);
        dispatch({ type: ACTIONS.SET_DESTINATIONS, payload: response.data });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    },

    // Get filter options
    getFilterOptions: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/filters/options`);
        dispatch({ type: ACTIONS.SET_FILTER_OPTIONS, payload: response.data });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    },

    // Get recommendations
    getRecommendations: async (filters, weights = null, maxResults = 20) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const requestData = {
          filters,
          weights,
          max_results: maxResults
        };
        const response = await axios.post(`${API_BASE_URL}/topsis/recommendations`, requestData);
        dispatch({ type: ACTIONS.SET_RECOMMENDATIONS, payload: response.data });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    },

    // Search destinations
    searchDestinations: async (query) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/destinations/search/?query=${query}`);
        return response.data;
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        return [];
      }
    },

    // Get popular destinations
    getPopularDestinations: async (limit = 10) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/destinations/popular/?limit=${limit}`);
        return response.data;
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        return [];
      }
    },

    // Get budget-friendly destinations
    getBudgetFriendlyDestinations: async (limit = 10) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/destinations/budget-friendly/?limit=${limit}`);
        return response.data;
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        return [];
      }
    }
  };

  // Helper functions
  const helpers = {
    // Update user filters
    updateFilters: (newFilters) => {
      dispatch({ type: ACTIONS.SET_USER_FILTERS, payload: newFilters });
    },

    // Clear recommendations
    clearRecommendations: () => {
      dispatch({ type: ACTIONS.CLEAR_RECOMMENDATIONS });
    },

    // Reset filters
    resetFilters: () => {
      dispatch({ type: ACTIONS.SET_USER_FILTERS, payload: initialState.userFilters });
    },

    // Get filtered destinations based on current filters
    getFilteredDestinations: () => {
      let filtered = state.destinations;

      if (state.userFilters.continents.length > 0) {
        filtered = filtered.filter(dest => 
          state.userFilters.continents.includes(dest.continent)
        );
      }

      if (state.userFilters.countries.length > 0) {
        filtered = filtered.filter(dest => 
          state.userFilters.countries.includes(dest.country)
        );
      }

      if (state.userFilters.climates.length > 0) {
        filtered = filtered.filter(dest => 
          state.userFilters.climates.includes(dest.climate)
        );
      }

      if (state.userFilters.terrains.length > 0) {
        filtered = filtered.filter(dest => 
          state.userFilters.terrains.includes(dest.terrain)
        );
      }

      if (state.userFilters.activities.length > 0) {
        filtered = filtered.filter(dest => 
          state.userFilters.activities.some(activity => 
            dest.activities.includes(activity)
          )
        );
      }

      if (state.userFilters.budget_ranges.length > 0) {
        filtered = filtered.filter(dest => 
          state.userFilters.budget_ranges.includes(dest.budget_range)
        );
      }

      if (state.userFilters.package_types.length > 0) {
        filtered = filtered.filter(dest => 
          state.userFilters.package_types.some(pkg => 
            dest.package_type.includes(pkg)
          )
        );
      }

      if (state.userFilters.min_popularity !== null) {
        filtered = filtered.filter(dest => 
          dest.popularity_score >= state.userFilters.min_popularity
        );
      }

      if (state.userFilters.max_popularity !== null) {
        filtered = filtered.filter(dest => 
          dest.popularity_score <= state.userFilters.max_popularity
        );
      }

      if (state.userFilters.min_safety !== null) {
        filtered = filtered.filter(dest => 
          dest.safety_score >= state.userFilters.min_safety
        );
      }

      if (state.userFilters.max_safety !== null) {
        filtered = filtered.filter(dest => 
          dest.safety_score <= state.userFilters.max_safety
        );
      }

      return filtered;
    }
  };

  // Load initial data
  useEffect(() => {
    api.getDestinations();
    api.getFilterOptions();
  }, []);

  const value = {
    ...state,
    api,
    helpers
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
};

// Custom hook to use the context
export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
}; 