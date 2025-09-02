# backend/core/config.py
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict  

class Settings(BaseSettings):
    PROJECT_NAME: str = "ReformIt Backend"
    DATABASE_URL: str = "sqlite:///./app.db"
    JWT_SECRET: str = "supersecretkey"
    JWT_ALGORITHM: str = "HS256"

    CHROME_EXTENSION_ID: Optional[str] = None
    GOOGLE_CLIENT_ID:Optional[str] = None
    MICROSOFT_CLIENT_ID:Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    MICROSOFT_CLIENT_SECRET: Optional[str] = None


    # 🔹 Configure env file
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
