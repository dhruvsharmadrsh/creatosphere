from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import logging
from pathlib import Path

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Creato-Sphere API",
    description="AI-powered ad creative generation API",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory to serve uploaded images
uploads_path = Path("uploads")
if uploads_path.exists():
    app.mount("/files", StaticFiles(directory="uploads"), name="files")
    logger.info("✅ Static files mounted at /files")

# Import routers
from app.routers import upload, ai, export, compliance

# Include routers
app.include_router(upload.router)
app.include_router(ai.router)
app.include_router(export.router)
app.include_router(compliance.router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Creato-Sphere API",
        "version": "1.0.0",
        "status": "running"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": "development",
        "storage": "local"
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Creato-Sphere API starting up...")
    logger.info("✅ CORS enabled for localhost:5173")
    logger.info("📁 Using local file storage")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("👋 Creato-Sphere API shutting down...")
