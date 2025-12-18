from datetime import datetime, timedelta, timezone
from jose import jwt
from passlib.context import CryptContext
import anyio

from core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ----------------------------
# Password hashing
# ----------------------------
async def hash_password(password: str) -> str:
    return await anyio.to_thread.run_sync(pwd_context.hash, password)


async def verify_password(password: str, hashed: str) -> bool:
    return await anyio.to_thread.run_sync(pwd_context.verify, password, hashed)


# ----------------------------
# JWT token creation
# ----------------------------
async def create_access_token(data: dict, expires_delta: int = 60):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    return await anyio.to_thread.run_sync(
        jwt.encode, to_encode, settings.JWT_SECRET, settings.JWT_ALGORITHM
    )
