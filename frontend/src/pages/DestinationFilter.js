import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaGlobe, FaThermometerHalf, FaMountain, FaCity, FaIsland } from 'react-icons/fa';
import { useTravel } from '../context/TravelContext';
import './DestinationFilter.css';

const DestinationFilter = () => {
  const { 
    filterOptions, 
    userFilters, 
    recommendations, 
    loading, 
    error, 
    helpers, 
    api 
  } = useTravel();

  const [localFilters, setLocalFilters] = useState({
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
  });

  const [showFilters, setShowFilters] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('Current recommendations:', recommendations);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [recommendations, loading, error]);

  useEffect(() => {
    if (filterOptions) {
      setLocalFilters(userFilters);
    }
  }, [filterOptions, userFilters]);

  const handleFilterChange = (filterType, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleGetRecommendations = async () => {
    console.log('Getting recommendations with filters:', localFilters);
    helpers.updateFilters(localFilters);
    try {
      await api.getRecommendations(localFilters);
      console.log('Recommendations received:', recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    }
  };

  const resetFilters = () => {
    const resetFilters = {
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
    };
    setLocalFilters(resetFilters);
    helpers.resetFilters();
  };

  const getActivityIcon = (activity) => {
    const icons = {
      'adventure': '🏔️',
      'hiking': '🥾',
      'beach': '🏖️',
      'cultural': '🏛️',
      'relaxation': '🧘',
      'shopping': '🛍️',
      'food': '🍽️',
      'nightlife': '🌃',
      'road_trip': '🚗'
    };
    return icons[activity] || '📍';
  };

  const getTerrainIcon = (terrain) => {
    const icons = {
      'beach': <FaMountain />,
      'mountain': <FaMountain />,
      'urban': <FaCity />,
      'desert': <FaMountain />, // Changed from FaDesert to FaMountain
      'island': <FaIsland />
    };
    return icons[terrain] || <FaMountain />;
  };

  if (!filterOptions) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading filter options...</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="destination-filter-page">
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="page-title">
              <FaSearch className="me-3" />
              Find Your Perfect Destination
            </h1>
            <p className="page-subtitle">
              Use our advanced TOPSIS algorithm to discover destinations tailored to your preferences
            </p>
          </Col>
        </Row>

        {/* Filter Toggle */}
        <Row className="mb-4">
          <Col>
            <Button 
              variant="outline-primary" 
              onClick={() => setShowFilters(!showFilters)}
              className="filter-toggle-btn me-3"
            >
              <FaFilter className="me-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Button 
              variant="outline-success" 
              onClick={() => api.getRecommendations({})}
              className="test-btn"
            >
              Test Recommendations
            </Button>
          </Col>
        </Row>

        {/* Filters Section */}
        {showFilters && (
          <Card className="filter-card mb-4">
            <Card.Body>
              <Row>
                {/* Continents */}
                <Col lg={6} md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label><FaGlobe className="me-2" />Continents</Form.Label>
                    <Form.Select 
                      multiple 
                      value={localFilters.continents}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange('continents', values);
                      }}
                    >
                      {filterOptions.continents.map(continent => (
                        <option key={continent} value={continent}>
                          {continent.charAt(0).toUpperCase() + continent.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Countries */}
                <Col lg={6} md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label><FaMapMarkerAlt className="me-2" />Countries</Form.Label>
                    <Form.Select 
                      multiple 
                      value={localFilters.countries}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange('countries', values);
                      }}
                    >
                      {filterOptions.countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Climates */}
                <Col lg={6} md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label><FaThermometerHalf className="me-2" />Climate</Form.Label>
                    <Form.Select 
                      multiple 
                      value={localFilters.climates}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange('climates', values);
                      }}
                    >
                      {filterOptions.climates.map(climate => (
                        <option key={climate} value={climate}>
                          {climate.charAt(0).toUpperCase() + climate.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Terrains */}
                <Col lg={6} md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label><FaMountain className="me-2" />Terrain</Form.Label>
                    <Form.Select 
                      multiple 
                      value={localFilters.terrains}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange('terrains', values);
                      }}
                    >
                      {filterOptions.terrains.map(terrain => (
                        <option key={terrain} value={terrain}>
                          {terrain.charAt(0).toUpperCase() + terrain.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Activities */}
                <Col lg={6} md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>🎯 Activities</Form.Label>
                    <Form.Select 
                      multiple 
                      value={localFilters.activities}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange('activities', values);
                      }}
                    >
                      {filterOptions.activities.map(activity => (
                        <option key={activity} value={activity}>
                          {activity.charAt(0).toUpperCase() + activity.slice(1).replace('_', ' ')}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Budget Ranges */}
                <Col lg={6} md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>💰 Budget Range</Form.Label>
                    <Form.Select 
                      multiple 
                      value={localFilters.budget_ranges}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange('budget_ranges', values);
                      }}
                    >
                      {filterOptions.budget_ranges.map(budget => (
                        <option key={budget} value={budget}>
                          {budget.charAt(0).toUpperCase() + budget.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Action Buttons */}
              <Row className="mt-3">
                <Col className="text-center">
                  <Button 
                    variant="primary" 
                    onClick={handleGetRecommendations}
                    disabled={loading}
                    className="me-3"
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Getting Recommendations...
                      </>
                    ) : (
                      <>
                        <FaSearch className="me-2" />
                        Get Recommendations
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {/* Results Section */}
        {recommendations && recommendations.destinations && recommendations.destinations.length > 0 && (
          <Row>
            <Col>
              <h3 className="results-title mb-4">
                Top {recommendations.destinations.length} Recommendations
                <span className="results-count">({recommendations.total_results} total matches)</span>
              </h3>
            </Col>
          </Row>
        )}

        {/* Destination Cards */}
        <Row>
          {recommendations && recommendations.destinations && recommendations.destinations.map((destination, index) => (
            <Col lg={4} md={6} className="mb-4" key={destination.id}>
              <Card className="destination-card animate__animated animate__fadeInUp" 
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-image-container">
                  <Card.Img 
                    variant="top" 
                    src={destination.images[0]} 
                    className="destination-image"
                    alt={destination.name}
                  />
                  <div className="card-overlay">
                    <Button 
                      as="a" 
                      href={destination.booking_url} 
                      target="_blank" 
                      variant="light" 
                      size="sm"
                      className="book-now-btn"
                    >
                      Book Now
                    </Button>
                  </div>
                  <div className="score-badge">
                    Score: {(recommendations.scores[index] * 100).toFixed(1)}%
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{destination.name}</Card.Title>
                  <Card.Text className="destination-country">
                    <FaMapMarkerAlt className="me-1" />
                    {destination.country}
                  </Card.Text>
                  
                  <div className="destination-tags">
                    <span className="tag climate">
                      <FaThermometerHalf className="me-1" />
                      {destination.climate}
                    </span>
                    <span className="tag terrain">
                      {getTerrainIcon(destination.terrain)}
                      {destination.terrain}
                    </span>
                    <span className="tag budget">
                      💰 {destination.budget_range}
                    </span>
                  </div>

                  <div className="activities-section">
                    <small className="text-muted">Activities:</small>
                    <div className="activities-list">
                      {destination.activities.map(activity => (
                        <span key={activity} className="activity-tag">
                          {getActivityIcon(activity)} {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="scores-section">
                    <div className="score-item">
                      <span className="score-label">Popularity:</span>
                      <span className="score-value">{destination.popularity_score}/10</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Safety:</span>
                      <span className="score-value">{destination.safety_score}/10</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Accessibility:</span>
                      <span className="score-value">{destination.accessibility_score}/10</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* No Results */}
        {recommendations && recommendations.destinations && recommendations.destinations.length === 0 && !loading && (
          <Row>
            <Col>
              <Card className="no-results-card">
                <Card.Body className="text-center">
                  <h4>No destinations found</h4>
                  <p>Try adjusting your filters to find more destinations.</p>
                  <Button variant="outline-primary" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <Row className="mt-4">
            <Col>
              <Card className="debug-card">
                <Card.Body>
                  <h6>Debug Info:</h6>
                  <p>Recommendations: {recommendations ? JSON.stringify(recommendations).substring(0, 200) + '...' : 'null'}</p>
                  <p>Loading: {loading ? 'true' : 'false'}</p>
                  <p>Error: {error || 'none'}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DestinationFilter; 