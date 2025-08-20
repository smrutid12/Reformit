# backend/core/config.py
from pydantic_settings import BaseSettings 

class Settings(BaseSettings):
    PROJECT_NAME: str = "ReformIt Backend"
    DATABASE_URL: str = "sqlite:///./app.db"
    JWT_SECRET: str = "supersecretkey"
    JWT_ALGORITHM: str = "HS256"

settings = Settings()
