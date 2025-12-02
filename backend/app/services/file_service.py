import os
import shutil
from pathlib import Path
from uuid import uuid4
from fastapi import UploadFile
from app.config import get_settings
import logging

logger = logging.getLogger(__name__)

class FileService:
    def __init__(self):
        settings = get_settings()
        # Create directories if they don't exist
        Path(settings.original_dir).mkdir(parents=True, exist_ok=True)
        Path(settings.masked_dir).mkdir(parents=True, exist_ok=True)
        Path(settings.backgrounds_dir).mkdir(parents=True, exist_ok=True)
        logger.info("✅ File directories initialized")
    
    async def save_upload(self, file: UploadFile, folder: str = "original") -> dict:
        """
        Save uploaded file to local storage
        Returns file metadata including path and URL
        """
        try:
            settings = get_settings()
            
            # Generate unique filename
            file_extension = file.filename.split('.')[-1]
            unique_filename = f"{uuid4()}.{file_extension}"
            
            # Determine save path
            if folder == "original":
                save_dir = Path(settings.original_dir)
            elif folder == "masked":
                save_dir = Path(settings.masked_dir)
            elif folder == "backgrounds":
                save_dir = Path(settings.backgrounds_dir)
            else:
                save_dir = Path(settings.upload_dir) / folder
                save_dir.mkdir(parents=True, exist_ok=True)
            
            file_path = save_dir / unique_filename
            
            # Save file
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            logger.info(f"File saved: {file_path}")
            
            # Return metadata
            return {
                "filename": unique_filename,
                "original_filename": file.filename,
                "path": str(file_path),
                "url": f"/files/{folder}/{unique_filename}",
                "size": os.path.getsize(file_path)
            }
        
        except Exception as e:
            logger.error(f"Error saving file: {str(e)}")
            raise Exception(f"Failed to save file: {str(e)}")
    
    def get_file_path(self, filename: str, folder: str = "original") -> Path:
        """Get full path to a file"""
        settings = get_settings()
        if folder == "original":
            return Path(settings.original_dir) / filename
        elif folder == "masked":
            return Path(settings.masked_dir) / filename
        elif folder == "backgrounds":
            return Path(settings.backgrounds_dir) / filename
        return Path(settings.upload_dir) / folder / filename
    
    def file_exists(self, filename: str, folder: str = "original") -> bool:
        """Check if file exists"""
        return self.get_file_path(filename, folder).exists()

# Singleton instance
file_service = FileService()
