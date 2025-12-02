from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict
import logging
from app.services.file_service import file_service

router = APIRouter(prefix="/upload", tags=["upload"])
logger = logging.getLogger(__name__)

@router.post("/file")
async def upload_file(file: UploadFile = File(...)) -> Dict:
    """
    Upload a file and save to local storage
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400, 
                detail="Only image files are allowed"
            )
        
        # Validate file size (check first 10MB)
        file.file.seek(0, 2)  # Seek to end
        file_size = file.file.tell()
        file.file.seek(0)  # Reset to beginning
        
        if file_size > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(
                status_code=400,
                detail="File too large. Maximum size is 10MB"
            )
        
        # Save file locally
        result = await file_service.save_upload(file, folder="original")
        
        logger.info(f"File uploaded successfully: {result['filename']}")
        
        return {
            "success": True,
            "filename": result['filename'],
            "original_filename": result['original_filename'],
            "content_type": file.content_type,
            "url": f"http://localhost:8000{result['url']}",
            "path": result['path'],
            "size": result['size'],
            "message": "File uploaded successfully"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/test")
async def test_upload():
    """Test endpoint to verify router is working"""
    return {"message": "Upload router is working with local storage!"}
