from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from core.database import get_db
from models.history import FileHistory
from models.user import User
from core.auth import get_current_user  # We'll define this in auth utils

router = APIRouter(prefix="/history", tags=["history"])


@router.get("/", response_model=List[dict])
def get_file_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Return the file conversion history for the authenticated user.
    """
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    history = (
        db.query(FileHistory)
        .filter(FileHistory.user_id == current_user.id)
        .order_by(FileHistory.created_at.desc())
        .all()
    )

    return [
        {
            "id": str(item.id),
            "file_name": item.file_name,
            "from_format": item.from_format,
            "to_format": item.to_format,
            "status": item.status,
            "created_at": item.created_at,
        }
        for item in history
    ]
