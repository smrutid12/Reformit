# backend/models/file_history.py
import uuid
from sqlalchemy import Column, String, ForeignKey, DateTime, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from core.database import Base

class FileHistory(Base):
    __tablename__ = "file_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    file_name = Column(String, nullable=False)
    from_format = Column(String(50), nullable=False)
    to_format = Column(String(50), nullable=False)
    status = Column(String(20), nullable=False)  # "success" / "failed"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
