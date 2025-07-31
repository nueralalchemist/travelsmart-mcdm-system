# 🗺️ TravelSmart - MCDM Travel Destination Recommendation System

A responsive, user-centric travel destination recommendation web application that suggests travel locations based on multiple user-defined criteria using the **TOPSIS algorithm** (Multi-Criteria Decision Making).

## 🚀 Quick Start

### Prerequisites
- **WSL2** with Ubuntu 20.04 or later
- **Python 3.8+** (Python 3.12 recommended)
- **Node.js 16+** and npm
- **Git**

### Step-by-Step Setup in WSL Terminal

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd MCDM_recommendation-_system
```

#### 2. Install System Dependencies
```bash
# Update package list
sudo apt update

# Install Python and development tools
sudo apt install -y python3-full python3-venv python3-pip

# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
python3 --version
node --version
npm --version
```

#### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip and install build tools
pip install --upgrade pip setuptools wheel

# Install Python dependencies (with system packages override)
pip install fastapi uvicorn pandas numpy scikit-learn pymongo python-multipart python-jose passlib python-dotenv pydantic pydantic-settings httpx aiofiles Pillow --break-system-packages

# Start the backend server
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Backend should now be running at:** http://localhost:8000

#### 4. Frontend Setup (New Terminal)

```bash
# Open a new terminal window/tab
cd MCDM_recommendation-_system/frontend

# Install Node.js dependencies
npm install

# Start the React development server
npm start
```

**Frontend should now be running at:** http://localhost:3000

#### 5. Verify Installation

**Test Backend:**
```bash
# Health check
curl http://localhost:8000/health

# Test destinations API
curl http://localhost:8000/api/v1/destinations/

# Test TOPSIS algorithm
curl -X POST http://localhost:8000/api/v1/topsis/test-ranking
```

**Test Frontend:**
- Open browser and navigate to http://localhost:3000
- You should see the TravelSmart landing page
- Navigate to "Find Destinations" to test the recommendation system

## 🏗️ Project Architecture

```
MCDM_recommendation_system/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS and styling
│   └── package.json
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── data/               # Dataset files
│   └── requirements.txt
├── data/                   # Shared data files
└── docs/                   # Documentation
```

## 🎯 Core Features

### Frontend Features
- **Responsive Design**: Bootstrap 5 + custom CSS
- **Interactive Filters**: Multi-select dropdowns for all criteria
- **Real-time Recommendations**: TOPSIS algorithm integration
- **Beautiful UI**: Animated cards, gradients, and modern design
- **Booking Integration**: Direct links to MakeMyTrip

### Backend Features
- **FastAPI Framework**: High-performance async API
- **TOPSIS Algorithm**: Multi-criteria decision making
- **Comprehensive API**: RESTful endpoints for all operations
- **Data Validation**: Pydantic models for type safety
- **CORS Support**: Cross-origin resource sharing

### TOPSIS Algorithm
The system uses the **Technique for Order Preference by Similarity to an Ideal Solution**:

1. **Normalization**: Convert criteria to comparable scales
2. **Weighting**: Apply user-defined importance weights
3. **Ideal Solutions**: Calculate positive and negative ideal points
4. **Distance Calculation**: Measure distance from ideal solutions
5. **Ranking**: Score destinations based on relative closeness

## 🔧 API Endpoints

### Destinations
- `GET /api/v1/destinations/` - Get all destinations
- `GET /api/v1/destinations/{id}` - Get specific destination
- `GET /api/v1/destinations/search/?query={query}` - Search destinations

### Filters
- `GET /api/v1/filters/options` - Get available filter options

### TOPSIS Recommendations
- `POST /api/v1/topsis/recommendations` - Get personalized recommendations
- `GET /api/v1/topsis/weights` - Get default TOPSIS weights
- `POST /api/v1/topsis/test-ranking` - Test TOPSIS algorithm

## 🎨 User Interface

### Pages
1. **Landing Page** (`/`): Hero section with call-to-action
2. **Destination Filter** (`/destinations`): Main recommendation interface
3. **About Page** (`/about`): System information and TOPSIS explanation

### Features
- **Advanced Filtering**: Continent, country, climate, terrain, activities, budget
- **Real-time Results**: Instant recommendations with TOPSIS scores
- **Visual Cards**: Beautiful destination cards with images and details
- **Booking Integration**: Direct links to MakeMyTrip for booking
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend Import Errors
```bash
# If you get "No module named 'app'" error
cd backend
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

#### 2. Frontend Compilation Errors
```bash
# If you get icon import errors
# The code has been fixed to use valid react-icons
npm start
```

#### 3. Port Already in Use
```bash
# Kill processes using ports 8000 or 3000
sudo lsof -ti:8000 | xargs kill -9
sudo lsof -ti:3000 | xargs kill -9
```

#### 4. Python Virtual Environment Issues
```bash
# Recreate virtual environment
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip setuptools wheel
pip install fastapi uvicorn pandas numpy scikit-learn pymongo python-multipart python-jose passlib python-dotenv pydantic pydantic-settings httpx aiofiles Pillow --break-system-packages
```

#### 5. Node.js Dependencies Issues
```bash
# Clear npm cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Testing the System

#### 1. Test Backend API
```bash
# Health check
curl http://localhost:8000/health

# Get destinations
curl http://localhost:8000/api/v1/destinations/

# Test TOPSIS
curl -X POST http://localhost:8000/api/v1/topsis/test-ranking

# Get recommendations
curl -X POST http://localhost:8000/api/v1/topsis/recommendations \
  -H "Content-Type: application/json" \
  -d '{"filters": {"continents": ["asia"]}, "max_results": 5}'
```

#### 2. Test Frontend
- Open http://localhost:3000 in browser
- Navigate to "Find Destinations"
- Click "Show Filters"
- Select some criteria and click "Get Recommendations"
- Verify that destinations appear with TOPSIS scores

## 📊 Data Structure

### Destination Object
```json
{
  "id": "bali-indonesia",
  "name": "Bali",
  "country": "Indonesia",
  "continent": "asia",
  "climate": "tropical",
  "terrain": "island",
  "activities": ["beach", "cultural", "relaxation", "adventure"],
  "budget_range": "medium",
  "popularity_score": 9.2,
  "safety_score": 7.5,
  "accessibility_score": 8.0,
  "weather_type": "tropical",
  "package_type": ["family", "solo", "honeymoon"],
  "images": ["image_urls"],
  "booking_url": "https://www.makemytrip.com/...",
  "latitude": -8.3405,
  "longitude": 115.092,
  "description": "Tropical paradise with beautiful beaches and rich culture",
  "best_time_to_visit": "April to October"
}
```

## 🚀 Deployment

### Production Setup
1. **Backend**: Use Gunicorn with Uvicorn workers
2. **Frontend**: Build with `npm run build` and serve with nginx
3. **Database**: Consider MongoDB Atlas for cloud hosting
4. **Environment**: Use environment variables for configuration

### Environment Variables
```bash
# Backend (.env file)
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=travel_recommendation
API_V1_STR=/api/v1
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all dependencies are installed correctly
3. Ensure both backend and frontend are running
4. Check browser console for frontend errors
5. Check terminal output for backend errors

## 🎯 Success Criteria

The system is working correctly when:
- ✅ Backend responds to health check
- ✅ Frontend loads without compilation errors
- ✅ Filter options are populated
- ✅ Recommendations are generated with TOPSIS scores
- ✅ Destination cards display with images and details
- ✅ Booking links redirect to MakeMyTrip
- ✅ Responsive design works on different screen sizes

---

**Happy Travel Planning! 🌍✈️** 