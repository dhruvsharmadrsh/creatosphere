from openai import OpenAI
from app.config import get_settings
import logging

settings = get_settings()
logger = logging.getLogger(__name__)

class OpenAIService:
    def __init__(self):
        self.api_key = settings.openai_api_key
        self.client = None
        if self.api_key:
            try:
                self.client = OpenAI(api_key=self.api_key)
            except Exception as e:
                logger.error(f"Failed to initialize OpenAI client: {e}")
        else:
            logger.warning("⚠️ OpenAI API key not configured")

    def generate_image(self, prompt: str, size: str = "1024x1024", quality: str = "standard", n: int = 1):
        """
        Generate image using DALL-E 3
        """
        if not self.client:
            raise Exception("OpenAI API key not configured")

        try:
            logger.info(f"Generating image with prompt: {prompt}")
            
            response = self.client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size=size,
                quality=quality,
                n=n,
            )

            urls = [item.url for item in response.data]
            logger.info(f"✅ Image generated successfully: {len(urls)} images")
            return urls

        except Exception as e:
            logger.error(f"OpenAI image generation error: {str(e)}")
            raise

# Singleton instance
openai_service = OpenAIService()
