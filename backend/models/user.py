# backend/models/user.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)  # Internal ID
    provider = Column(String(50), nullable=False)       # e.g. "google", "microsoft"
    provider_id = Column(String(255), nullable=False)   # unique ID from provider
    email = Column(String(255), unique=True, index=True, nullable=True)
    name = Column(String(255), nullable=True)
    picture = Column(String(500), nullable=True)        # profile image URL
    created_at = Column(DateTime(timezone=True), server_default=func.now())
