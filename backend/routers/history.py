from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from core.database import get_db
from models.history import FileHistory
from models.user import User
from core.auth import get_current_user  # async dependency

router = APIRouter(prefix="/history", tags=["history"])


@router.get("/history", response_model=List[dict])
async def get_file_history(
    db: AsyncSession = Depends(get_db),
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

    # 🔹 Async query
    result = await db.execute(
        select(FileHistory)
        .where(FileHistory.user_id == current_user.id)
        .order_by(FileHistory.created_at.desc())
    )
    history = result.scalars().all()

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
