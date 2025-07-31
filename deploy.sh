#!/bin/bash

echo "🚀 TravelSmart MCDM System - Deployment Script"
echo "================================================"

# Check if running in WSL
if grep -qi microsoft /proc/version; then
    echo "✅ WSL detected"
else
    echo "⚠️  Not running in WSL - some commands may need adjustment"
fi

# Update system packages
echo "📦 Updating system packages..."
sudo apt update -y

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
sudo apt install -y python3-full python3-venv python3-pip

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Verify installations
echo "✅ Verifying installations..."
python3 --version
node --version
npm --version

# Backend setup
echo "🔧 Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt

# Start backend in background
echo "🚀 Starting backend server..."
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Frontend setup
echo "🔧 Setting up frontend..."
cd ../frontend
npm install

# Start frontend in background
echo "🚀 Starting frontend server..."
npm start &
FRONTEND_PID=$!

# Wait for servers to start
echo "⏳ Waiting for servers to start..."
sleep 15

# Test the system
echo "🧪 Testing the system..."
if curl -s http://localhost:8000/api/v1/destinations/ > /dev/null; then
    echo "✅ Backend is running at http://localhost:8000"
else
    echo "❌ Backend failed to start"
fi

if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running at http://localhost:3000"
else
    echo "❌ Frontend failed to start"
fi

echo ""
echo "🎉 TravelSmart is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep script running
wait 