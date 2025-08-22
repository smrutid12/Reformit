# backend/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from core.config import settings

# ----------------------------
# Database URL (SQLite example)
# ----------------------------
DATABASE_URL = settings.DATABASE_URL

# ----------------------------
# Create engine
# ----------------------------
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # required for SQLite
)

# ----------------------------
# Session maker
# ----------------------------
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# ----------------------------
# Base class for models
# ----------------------------
Base = declarative_base()

# ----------------------------
# Dependency for FastAPI
# ----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
