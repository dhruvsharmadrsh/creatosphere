import requests
from pathlib import Path
from app.config import get_settings
import logging

settings = get_settings()
logger = logging.getLogger(__name__)

REMOVE_BG_API_URL = "https://api.remove.bg/v1.0/removebg"

class RemoveBgService:
    def __init__(self):
        self.api_key = settings.remove_bg_api_key
        if not self.api_key:
            logger.warning("⚠️ Remove.bg API key not configured")
    
    def remove_background(self, image_path: str) -> bytes:
        """
        Remove background from image using Remove.bg API
        Returns PNG image bytes with transparent background
        """
        if not self.api_key:
            raise Exception("Remove.bg API key not configured")
        
        try:
            logger.info(f"Removing background from: {image_path}")
            
            # Open image file
            with open(image_path, 'rb') as image_file:
                # Call Remove.bg API
                response = requests.post(
                    REMOVE_BG_API_URL,
                    files={'image_file': image_file},
                    data={'size': 'auto'},
                    headers={'X-Api-Key': self.api_key}
                )
            
            if response.status_code == 200:
                logger.info("✅ Background removed successfully")
                return response.content  # PNG bytes
            else:
                error_msg = response.json().get('errors', [{}])[0].get('title', 'Unknown error')
                logger.error(f"Remove.bg API error: {response.status_code} - {error_msg}")
                raise Exception(f"Remove.bg failed: {error_msg}")
        
        except Exception as e:
            logger.error(f"Background removal error: {str(e)}")
            raise

# Singleton instance
removebg_service = RemoveBgService()
