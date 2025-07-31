# 🗺️ TravelSmart - MCDM Travel Destination Recommendation System

[![GitHub](https://img.shields.io/badge/GitHub-nueralalchemist-blue?style=flat&logo=github)](https://github.com/nueralalchemist)
[![Python](https://img.shields.io/badge/Python-3.12+-blue?style=flat&logo=python)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-blue?style=flat&logo=react)](https://reactjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![TOPSIS](https://img.shields.io/badge/Algorithm-TOPSIS-orange?style=flat)](https://en.wikipedia.org/wiki/TOPSIS)

> **A responsive, user-centric travel destination recommendation web application** that leverages the **TOPSIS algorithm** for Multi-Criteria Decision Making (MCDM) to suggest optimal travel destinations based on multiple user-defined criteria.

## 🌟 Features

### 🎯 **Core Functionality**
- **Multi-Criteria Decision Making** using TOPSIS algorithm
- **Real-time filtering** with 8+ criteria (continent, climate, activities, budget, etc.)
- **Intelligent scoring** and ranking of destinations
- **Responsive design** that works on all devices
- **Beautiful UI** with animated cards and modern styling

### 🚀 **Technical Stack**
- **Frontend**: React 18, Bootstrap 5, React-Bootstrap, Animate.css
- **Backend**: Python FastAPI, NumPy, Pandas, Scikit-learn
- **Algorithm**: TOPSIS (Technique for Order Preference by Similarity to an Ideal Solution)
- **Data**: JSON-based destination database with 200+ global locations
- **Integration**: MakeMyTrip booking links

### 📊 **Smart Recommendations**
- **TOPSIS Algorithm**: Advanced MCDM scoring system
- **Multiple Criteria**: Popularity, Safety, Accessibility, Budget, Climate, Activities
- **Weighted Scoring**: Customizable importance weights
- **Real-time Results**: Instant recommendations based on filters

## 🏗️ Architecture

```
TravelSmart/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── context/        # React Context for state management
│   │   └── styles/         # CSS styling
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── api/routes/     # API endpoints
│   │   ├── services/       # Business logic (TOPSIS)
│   │   ├── models/         # Pydantic data models
│   │   └── core/           # Configuration
├── data/                   # Destination database
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/nueralalchemist/travelsmart-mcdm-system.git
cd travelsmart-mcdm-system
```

### 2. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎯 How It Works

### 1. **User Input**
Users select preferences across multiple criteria:
- **Geographic**: Continent, Country
- **Environmental**: Climate, Terrain, Weather
- **Activities**: Beach, Cultural, Adventure, Food, Shopping
- **Budget**: Low, Medium, High ranges
- **Preferences**: Popularity, Safety, Accessibility scores

### 2. **TOPSIS Algorithm**
The system applies the TOPSIS algorithm:
1. **Normalization**: Scales all criteria to comparable ranges
2. **Weighting**: Applies user-defined importance weights
3. **Ideal Solutions**: Calculates positive and negative ideal solutions
4. **Distance Calculation**: Measures distance from ideal solutions
5. **Ranking**: Sorts destinations by relative closeness

### 3. **Recommendations**
Returns ranked destinations with:
- **TOPSIS Scores**: Percentage-based ranking
- **Detailed Information**: Images, descriptions, booking links
- **Filter Summary**: Applied criteria and weights used

## 📊 API Endpoints

### Core Endpoints
- `GET /api/v1/destinations/` - Get all destinations
- `GET /api/v1/filters/options` - Get available filter options
- `POST /api/v1/topsis/recommendations` - Get TOPSIS-based recommendations

### Example Request
```json
{
  "filters": {
    "continents": ["asia"],
    "climates": ["tropical"],
    "activities": ["beach", "cultural"],
    "budget_ranges": ["medium"]
  },
  "max_results": 5
}
```

## 🎨 UI Features

### **Landing Page**
- Animated hero section with travel imagery
- Feature highlights and call-to-action
- Responsive design for all devices

### **Destination Filter Page**
- **Multi-select dropdowns** for all criteria
- **Real-time filtering** with instant results
- **Beautiful destination cards** with images
- **TOPSIS scores** displayed prominently
- **"Book Now" buttons** linking to MakeMyTrip

### **About Page**
- System overview and TOPSIS explanation
- Technical architecture details
- Developer information

## 🔧 Development

### Project Structure
```
├── frontend/src/
│   ├── components/          # Header, Footer, UI components
│   ├── pages/              # Landing, Filter, About pages
│   ├── context/            # TravelContext for state management
│   └── styles/             # Global CSS and animations
├── backend/app/
│   ├── api/routes/         # FastAPI route handlers
│   ├── services/           # TOPSIS algorithm implementation
│   ├── models/             # Pydantic data models
│   └── core/               # Configuration and settings
└── data/
    └── destinations.json   # Destination database
```

### Key Technologies
- **Frontend**: React, React-Bootstrap, Axios, React Router
- **Backend**: FastAPI, Pydantic, NumPy, Pandas
- **Algorithm**: Custom TOPSIS implementation
- **Styling**: Bootstrap 5, Animate.css, Custom CSS

## 🌟 Highlights

### **Advanced MCDM Implementation**
- **TOPSIS Algorithm**: Sophisticated multi-criteria decision making
- **Weighted Scoring**: Customizable importance weights
- **Normalization**: Proper data scaling for comparison
- **Ideal Solutions**: Mathematical optimization approach

### **Modern Web Development**
- **React 18**: Latest React features and hooks
- **FastAPI**: High-performance Python web framework
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Instant recommendation generation

### **User Experience**
- **Intuitive Interface**: Easy-to-use filter system
- **Visual Feedback**: Loading states and animations
- **Comprehensive Data**: Rich destination information
- **Booking Integration**: Direct links to travel booking

## 🤝 Contributing

This project is open for contributions! Feel free to:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Deepu.A (nueralalchemist)**
- 🔬 **AI Researcher | Deep Learning Engineer | Data Science Innovator**
- 🛠 **Self-Taught Engineer** with passion for AI/ML
- 🧠 **Freelancer & Researcher** exploring cutting-edge AI applications
- 🔍 **Cyber-Aware ML Developer** focused on secure AI

**Connect with me:**
- [GitHub](https://github.com/nueralalchemist)
- [LinkedIn](https://linkedin.com/in/nueralalchemist)
- [Twitter](https://twitter.com/khaledazan1734)

---

> **"Artificial Intelligence is not a replacement for human intelligence, but a tool to amplify it!"** 🚀

**⭐ Star this repository if you find it useful!** 