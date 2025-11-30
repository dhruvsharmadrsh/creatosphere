from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

# Routers
from app.routers import upload, ai, export, compliance

# --------------------------------------------------
# Initialize FastAPI app
# --------------------------------------------------
app = FastAPI(
    title="Creato-Sphere API",
    description="AI-powered ad creative generation API",
    version="1.0.0"
)

# --------------------------------------------------
# CORS settings
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite frontend
        "http://localhost:3000",  # React default
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Logging
# --------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("creatosphere")

# --------------------------------------------------
# Root endpoint
# --------------------------------------------------
@app.get("/")
async def root():
    return {
        "message": "Creato-Sphere API",
        "version": "1.0.0",
        "status": "running"
    }

# --------------------------------------------------
# Health Check endpoint
# --------------------------------------------------
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": "development"
    }

# --------------------------------------------------
# Startup & Shutdown Events
# --------------------------------------------------
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Creato-Sphere API starting up...")
    logger.info("✅ CORS enabled for localhost:5173 & localhost:3000")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("👋 Creato-Sphere API shutting down...")

# --------------------------------------------------
# Include Routers
# --------------------------------------------------
app.include_router(upload.router)
app.include_router(ai.router)
app.include_router(export.router)
app.include_router(compliance.router)
