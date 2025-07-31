import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGlobe, FaSearch, FaRocket, FaHeart } from 'react-icons/fa';
import { useTravel } from '../context/TravelContext';
import './LandingPage.css';

const LandingPage = () => {
  const { destinations, api } = useTravel();

  const popularDestinations = destinations.slice(0, 6);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <Container className="hero-content">
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-text">
              <h1 className="hero-title animate__animated animate__fadeInUp">
                Discover Your Perfect
                <span className="highlight"> Destination</span>
              </h1>
              <p className="hero-subtitle animate__animated animate__fadeInUp animate__delay-1s">
                Powered by advanced AI algorithms and the TOPSIS method, 
                we help you find the ideal travel destination based on your 
                unique preferences and criteria.
              </p>
              <div className="hero-buttons animate__animated animate__fadeInUp animate__delay-2s">
                <Button 
                  as={Link} 
                  to="/destinations" 
                  variant="primary" 
                  size="lg" 
                  className="cta-button"
                >
                  <FaSearch className="me-2" />
                  Start Exploring
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="learn-more-btn"
                  as={Link}
                  to="/about"
                >
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6} className="hero-visual animate__animated animate__fadeInRight animate__delay-1s">
              <div className="floating-cards">
                <div className="floating-card card-1">
                  <FaGlobe className="card-icon" />
                  <span>200+ Destinations</span>
                </div>
                <div className="floating-card card-2">
                  <FaRocket className="card-icon" />
                  <span>AI-Powered</span>
                </div>
                <div className="floating-card card-3">
                  <FaHeart className="card-icon" />
                  <span>Personalized</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Why Choose TravelSmart?</h2>
              <p className="section-subtitle">
                Our advanced algorithm considers multiple criteria to find your perfect match
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card animate__animated animate__fadeInUp">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <FaGlobe />
                  </div>
                  <Card.Title>Smart Recommendations</Card.Title>
                  <Card.Text>
                    Our TOPSIS algorithm analyzes multiple criteria including climate, 
                    activities, budget, and safety to provide personalized recommendations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card animate__animated animate__fadeInUp animate__delay-1s">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <FaSearch />
                  </div>
                  <Card.Title>Real-time Filtering</Card.Title>
                  <Card.Text>
                    Filter destinations by continent, climate, activities, budget, 
                    and more with instant results and live updates.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="feature-card animate__animated animate__fadeInUp animate__delay-2s">
                <Card.Body className="text-center">
                  <div className="feature-icon">
                    <FaHeart />
                  </div>
                  <Card.Title>Personalized Experience</Card.Title>
                  <Card.Text>
                    Get recommendations tailored to your preferences, travel style, 
                    and budget with our intelligent matching system.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Popular Destinations Section */}
      <section className="destinations-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">
                Discover some of our most recommended destinations
              </p>
            </Col>
          </Row>
          <Row>
            {popularDestinations.map((destination, index) => (
              <Col lg={4} md={6} className="mb-4" key={destination.id}>
                <Card className="destination-card animate__animated animate__fadeInUp" 
                      style={{ animationDelay: `${index * 0.2}s` }}>
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
                  </div>
                  <Card.Body>
                    <Card.Title>{destination.name}</Card.Title>
                    <Card.Text className="destination-country">{destination.country}</Card.Text>
                    <div className="destination-tags">
                      <span className="tag">{destination.climate}</span>
                      <span className="tag">{destination.terrain}</span>
                      <span className="tag">{destination.budget_range}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <Button 
                as={Link} 
                to="/destinations" 
                variant="primary" 
                size="lg"
                className="view-all-btn"
              >
                View All Destinations
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage; 