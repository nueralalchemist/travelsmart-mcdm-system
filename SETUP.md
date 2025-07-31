# TravelSmart Setup Guide

This guide will help you set up and run the TravelSmart recommendation system on your local machine.

## 🚀 Quick Start

The easiest way to get started is using our automated startup script:

```bash
./start.sh
```

This script will:
- Check prerequisites
- Set up Python virtual environment
- Install all dependencies
- Start both backend and frontend servers

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

### Required Software
- **Python 3.8+** - [Download here](https://www.python.org/downloads/)
- **Node.js 14+** - [Download here](https://nodejs.org/)
- **npm** - Usually comes with Node.js

### Verify Installation
```bash
python3 --version
node --version
npm --version
```

## 🔧 Manual Setup

If you prefer to set up manually or the automated script doesn't work:

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   # On Linux/Mac:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start backend server:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

## 🌐 Accessing the Application

Once both servers are running:

- **Frontend (React App):** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **Alternative API Docs:** http://localhost:8000/redoc

## 📁 Project Structure

```
MCDM_recommendation_system/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── data/               # Dataset files
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # State management
│   │   ├── utils/          # Utilities
│   │   └── styles/         # CSS files
│   └── package.json        # Node.js dependencies
├── data/                   # Shared data files
├── docs/                   # Documentation
├── start.sh               # Automated startup script
└── README.md              # Project overview
```

## 🔍 Testing the Application

### Backend Testing

1. **Health Check:**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Get All Destinations:**
   ```bash
   curl http://localhost:8000/api/v1/destinations/
   ```

3. **Test TOPSIS Algorithm:**
   ```bash
   curl -X POST http://localhost:8000/api/v1/topsis/test-ranking
   ```

### Frontend Testing

1. Open http://localhost:3000 in your browser
2. Navigate through different pages
3. Test the destination filtering functionality
4. Check responsive design on different screen sizes

## 🛠️ Development

### Adding New Destinations

1. Edit `data/destinations.json`
2. Add new destination with all required fields
3. Restart backend server to load new data

### Modifying TOPSIS Weights

1. Edit `backend/app/core/config.py`
2. Modify `DEFAULT_WEIGHTS` dictionary
3. Restart backend server

### Customizing Frontend

1. Edit components in `frontend/src/components/`
2. Modify styles in corresponding `.css` files
3. Frontend will auto-reload on changes

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if port 8000 is available
- Ensure virtual environment is activated
- Verify all dependencies are installed

**Frontend won't start:**
- Check if port 3000 is available
- Ensure Node.js and npm are installed
- Try deleting `node_modules` and running `npm install` again

**API calls failing:**
- Ensure backend is running on port 8000
- Check CORS settings in backend
- Verify API endpoints in browser developer tools

**Database issues:**
- The system uses JSON files by default
- MongoDB integration is optional
- Check data file paths in configuration

### Debug Mode

**Backend debugging:**
```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --log-level debug
```

**Frontend debugging:**
- Open browser developer tools
- Check console for errors
- Use React Developer Tools extension

## 📊 Performance Optimization

### Backend
- Use async/await for database operations
- Implement caching for frequently accessed data
- Optimize TOPSIS calculations for large datasets

### Frontend
- Implement lazy loading for images
- Use React.memo for expensive components
- Optimize bundle size with code splitting

## 🔒 Security Considerations

- API endpoints are currently open (development mode)
- Implement authentication for production
- Add rate limiting for API calls
- Validate all user inputs

## 🚀 Deployment

### Backend Deployment
- Use Gunicorn with Uvicorn workers
- Set up environment variables
- Configure reverse proxy (Nginx)

### Frontend Deployment
- Build production version: `npm run build`
- Serve static files with Nginx
- Configure HTTPS

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the API documentation at http://localhost:8000/docs
3. Check browser console for frontend errors
4. Review backend logs for server errors

## 🎯 Next Steps

After successful setup:

1. **Explore the API:** Visit http://localhost:8000/docs
2. **Test the Frontend:** Navigate through all pages
3. **Try Filtering:** Use the destination filter page
4. **Check TOPSIS:** Understand how recommendations work
5. **Customize:** Modify weights and add destinations

---

**Happy Traveling! 🌍✈️** 