from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

from app.api.routes import destinations, filters, topsis
from app.core.config import settings

app = FastAPI(
    title="Travel Destination Recommendation System",
    description="A smart travel recommendation system using TOPSIS algorithm",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(destinations.router, prefix="/api/v1/destinations", tags=["destinations"])
app.include_router(filters.router, prefix="/api/v1/filters", tags=["filters"])
app.include_router(topsis.router, prefix="/api/v1/topsis", tags=["topsis"])

# Health check endpoint
@app.get("/")
async def root():
    return {
        "message": "Travel Destination Recommendation System API",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "travel-recommendation-api"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    ) 