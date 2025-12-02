from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List
import logging
from pathlib import Path
from app.services.file_service import file_service
from app.services.removebg_service import removebg_service
from app.services.openai_service import openai_service

router = APIRouter(prefix="/ai", tags=["ai"])
logger = logging.getLogger(__name__)

class RemoveBackgroundRequest(BaseModel):
    filename: str  # Filename in uploads/original/

class GenerateBackgroundRequest(BaseModel):
    preset: str
    style: str = "realistic"
    seed: int = None

@router.post("/remove-bg")
async def remove_background(request: RemoveBackgroundRequest) -> Dict:
    """
    Remove background from uploaded image
    """
    try:
        logger.info(f"Background removal requested for: {request.filename}")
        
        # Get original file path
        original_path = file_service.get_file_path(request.filename, "original")
        
        if not original_path.exists():
            raise HTTPException(status_code=404, detail="Original file not found")
        
        # Remove background
        masked_image_bytes = removebg_service.remove_background(str(original_path))
        
        # Save masked image
        from io import BytesIO
        masked_filename = f"masked_{request.filename.split('.')[0]}.png"
        masked_path = file_service.get_file_path(masked_filename, "masked")
        
        with open(masked_path, 'wb') as f:
            f.write(masked_image_bytes)
        
        logger.info(f"✅ Masked image saved: {masked_filename}")
        
        return {
            "success": True,
            "original_url": f"http://localhost:8000/files/original/{request.filename}",
            "masked_url": f"http://localhost:8000/files/masked/{masked_filename}",
            "masked_filename": masked_filename,
            "message": "Background removed successfully"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Remove background error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-bg")
async def generate_background(request: GenerateBackgroundRequest) -> Dict:
    """
    Generate AI background using OpenAI DALL-E 3
    """
    logger.info(f"Background generation requested: {request.preset}")
    
    try:
        # Generate background
        urls = openai_service.generate_image(prompt=request.preset)
        
        return {
            "success": True,
            "preset": request.preset,
            "generated_urls": urls,
            "message": "Background generated successfully"
        }
    except Exception as e:
        logger.error(f"Generate background error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/test")
async def test_ai():
    """Test endpoint"""
    return {"message": "AI router is working!"}
