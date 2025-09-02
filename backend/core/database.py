# backend/core/database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from core.config import settings

# ----------------------------
# Database URL (Async SQLite example)
# Use "sqlite+aiosqlite://" for async SQLite
# ----------------------------
DATABASE_URL = settings.DATABASE_URL.replace("sqlite://", "sqlite+aiosqlite://")

# ----------------------------
# Create async engine
# ----------------------------
engine = create_async_engine(
    DATABASE_URL,
    echo=False,  # set to True for debugging
    future=True
)

# ----------------------------
# Async session maker
# ----------------------------
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

# ----------------------------
# Base class for models
# ----------------------------
Base = declarative_base()

# ----------------------------
# Dependency for FastAPI
# ----------------------------
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
