import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaGlobe, FaSearch, FaInfoCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="header-navbar animate__animated animate__fadeInDown"
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <FaGlobe className="brand-icon" />
          <span className="brand-text">TravelSmart</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <FaGlobe className="nav-icon" />
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/destinations" 
              className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}
            >
              <FaSearch className="nav-icon" />
              Find Destinations
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              <FaInfoCircle className="nav-icon" />
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 