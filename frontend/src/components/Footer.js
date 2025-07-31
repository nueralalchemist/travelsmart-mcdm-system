import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer animate__animated animate__fadeInUp">
      <Container>
        <Row className="footer-content">
          <Col lg={4} md={6} sm={12} className="footer-section">
            <h5 className="footer-title">TravelSmart</h5>
            <p className="footer-description">
              Your intelligent travel companion powered by advanced AI algorithms. 
              Discover the perfect destinations tailored to your preferences.
            </p>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="mailto:contact@travelsmart.com" className="social-link">
                <FaEnvelope />
              </a>
            </div>
          </Col>
          
          <Col lg={4} md={6} sm={12} className="footer-section">
            <h6 className="footer-subtitle">Quick Links</h6>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/destinations">Find Destinations</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="https://www.makemytrip.com" target="_blank" rel="noopener noreferrer">Book Now</a></li>
            </ul>
          </Col>
          
          <Col lg={4} md={6} sm={12} className="footer-section">
            <h6 className="footer-subtitle">Technology</h6>
            <ul className="footer-links">
              <li>TOPSIS Algorithm</li>
              <li>Multi-Criteria Decision Making</li>
              <li>AI-Powered Recommendations</li>
              <li>Real-time Filtering</li>
            </ul>
          </Col>
        </Row>
        
        <Row className="footer-bottom">
          <Col className="text-center">
            <p className="footer-copyright">
              © {currentYear} TravelSmart. Made with <FaHeart className="heart-icon" /> using React & FastAPI.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 