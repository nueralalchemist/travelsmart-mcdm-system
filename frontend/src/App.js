import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import DestinationFilter from './pages/DestinationFilter';
import AboutPage from './pages/AboutPage';

// Context
import { TravelProvider } from './context/TravelContext';

// Styles
import './styles/App.css';

function App() {
  return (
    <TravelProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Container fluid>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/destinations" element={<DestinationFilter />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </div>
      </Router>
    </TravelProvider>
  );
}

export default App; 