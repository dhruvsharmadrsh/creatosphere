from pydantic_settings import BaseSettings
from functools import lru_cache
from pathlib import Path

class Settings(BaseSettings):
    # File Storage (local)
    upload_dir: str = "uploads"
    original_dir: str = "uploads/original"
    masked_dir: str = "uploads/masked"
    backgrounds_dir: str = "uploads/backgrounds"
    
    # API Keys (optional - allow extras from .env)
    remove_bg_api_key: str = ""
    openai_api_key: str = ""
    stability_api_key: str = ""
    
    # AWS (not used for Day 2, but included for future)
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    aws_region: str = "us-east-1"
    s3_bucket_name: str = ""
    
    # App
    environment: str = "development"
    debug: bool = True
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"  # THIS IS KEY - ignore extra fields from .env

@lru_cache()
def get_settings():
    return Settings()
