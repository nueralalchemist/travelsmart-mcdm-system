import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBrain, FaChartLine, FaGlobe, FaCode } from 'react-icons/fa';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Container>
        {/* Hero Section */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="about-title animate__animated animate__fadeInUp">
              About <span className="highlight">TravelSmart</span>
            </h1>
            <p className="about-subtitle animate__animated animate__fadeInUp animate__delay-1s">
              Discover how our AI-powered system revolutionizes travel planning
            </p>
          </Col>
        </Row>

        {/* Mission Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="mission-card animate__animated animate__fadeInUp animate__delay-2s">
              <Card.Body className="text-center">
                <h2 className="mission-title">Our Mission</h2>
                <p className="mission-text">
                  To provide intelligent, personalized travel recommendations using advanced 
                  multi-criteria decision-making algorithms, helping travelers discover 
                  their perfect destinations based on their unique preferences and requirements.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Technology Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="section-title text-center mb-5">Technology Stack</h2>
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={6} className="mb-4">
            <Card className="tech-card animate__animated animate__fadeInUp">
              <Card.Body className="text-center">
                <FaBrain className="tech-icon" />
                <Card.Title>TOPSIS Algorithm</Card.Title>
                <Card.Text>
                  Multi-criteria decision-making method that ranks alternatives based on 
                  their similarity to ideal solutions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="tech-card animate__animated animate__fadeInUp animate__delay-1s">
              <Card.Body className="text-center">
                <FaChartLine className="tech-icon" />
                <Card.Title>Data Analytics</Card.Title>
                <Card.Text>
                  Advanced data processing and analysis to provide accurate recommendations 
                  based on multiple criteria.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="tech-card animate__animated animate__fadeInUp animate__delay-2s">
              <Card.Body className="text-center">
                <FaGlobe className="tech-icon" />
                <Card.Title>Global Database</Card.Title>
                <Card.Text>
                  Comprehensive database of 200+ destinations with detailed information 
                  on climate, activities, and more.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="tech-card animate__animated animate__fadeInUp animate__delay-3s">
              <Card.Body className="text-center">
                <FaCode className="tech-icon" />
                <Card.Title>Modern Tech</Card.Title>
                <Card.Text>
                  Built with React, FastAPI, and modern web technologies for optimal 
                  performance and user experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* TOPSIS Explanation */}
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <Card className="topsis-card animate__animated animate__fadeInUp">
              <Card.Body>
                <h3 className="topsis-title">How TOPSIS Works</h3>
                <div className="topsis-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h5>Normalization</h5>
                      <p>Convert all criteria values to a common scale for fair comparison</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h5>Weighting</h5>
                      <p>Apply user preference weights to different criteria</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h5>Ideal Solutions</h5>
                      <p>Calculate positive and negative ideal solutions</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h5>Distance Calculation</h5>
                      <p>Measure distance to ideal solutions for each destination</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">5</div>
                    <div className="step-content">
                      <h5>Ranking</h5>
                      <p>Rank destinations by relative closeness to ideal solution</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="section-title text-center mb-5">Key Features</h2>
          </Col>
        </Row>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card animate__animated animate__fadeInUp">
              <Card.Body>
                <h5>Multi-Criteria Filtering</h5>
                <p>Filter destinations by continent, climate, activities, budget, terrain, and more</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card animate__animated animate__fadeInUp animate__delay-1s">
              <Card.Body>
                <h5>Real-time Recommendations</h5>
                <p>Get instant recommendations as you adjust your preferences</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card animate__animated animate__fadeInUp animate__delay-2s">
              <Card.Body>
                <h5>Booking Integration</h5>
                <p>Direct links to MakeMyTrip for seamless booking experience</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card animate__animated animate__fadeInUp animate__delay-3s">
              <Card.Body>
                <h5>Responsive Design</h5>
                <p>Optimized for all devices with modern, intuitive interface</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card animate__animated animate__fadeInUp animate__delay-4s">
              <Card.Body>
                <h5>Image Previews</h5>
                <p>Beautiful destination cards with high-quality images</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="feature-card animate__animated animate__fadeInUp animate__delay-5s">
              <Card.Body>
                <h5>AI-Powered</h5>
                <p>Advanced algorithms provide intelligent, personalized suggestions</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto">
            <Card className="contact-card animate__animated animate__fadeInUp">
              <Card.Body className="text-center">
                <h3 className="contact-title">Get Started Today</h3>
                <p className="contact-text">
                  Ready to discover your perfect destination? Start exploring our 
                  comprehensive database of travel locations.
                </p>
                <a href="/destinations" className="btn btn-primary btn-lg">
                  Start Exploring
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage; 