from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict
import logging
from app.services.s3_service import s3_service

router = APIRouter(prefix="/upload", tags=["upload"])
logger = logging.getLogger(__name__)

@router.post("/file")
async def upload_file(file: UploadFile = File(...)) -> Dict:
    """
    Upload a file to S3 and return its metadata
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400, 
                detail="Only image files are allowed"
            )
        
        # Upload to S3
        result = await s3_service.upload_file(file)
        
        logger.info(f"File uploaded successfully: {result['key']}")
        
        return {
            "success": True,
            "filename": file.filename,
            "content_type": file.content_type,
            "s3_key": result['key'],
            "url": result['url'],
            "message": "File uploaded to S3 successfully"
        }
    
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/test")
async def test_upload():
    """Test endpoint to verify router is working"""
    return {"message": "Upload router is working with S3!"}
