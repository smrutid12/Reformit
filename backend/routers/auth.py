# backend/routers/auth.py
import httpx
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from core.database import get_db
from core.security import create_access_token
from models.user import User

router = APIRouter()

async def verify_provider_token(provider: str, token: str) -> str:
    """
    Verifies token with provider and returns a unique username/email.
    """
    async with httpx.AsyncClient() as client:
        if provider == "google":
            resp = await client.get(
                f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
            )
            if resp.status_code != 200:
                raise HTTPException(status_code=401, detail="Invalid Google token")
            data = resp.json()
            return data["email"]

        elif provider in ["microsoft", "onedrive"]:
            resp = await client.get(
                "https://graph.microsoft.com/v1.0/me",
                headers={"Authorization": f"Bearer {token}"}
            )
            if resp.status_code != 200:
                raise HTTPException(status_code=401, detail=f"Invalid {provider} token")
            data = resp.json()
            return data["userPrincipalName"]

        else:
            raise HTTPException(status_code=400, detail="Unsupported provider")


@router.post("/sso/{provider}")
async def sso_login(
    provider: str,
    provider_token: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Accept a token from Google, Microsoft, or OneDrive,
    verify it, and issue our JWT.
    """
    # 🔹 Step 1: Verify token and get username/email
    username = await verify_provider_token(provider, provider_token)

    # 🔹 Step 2: Check if user exists in DB
    result = await db.execute(select(User).where(User.username == username))
    db_user = result.scalars().first()

    # 🔹 Step 3: Auto-register if not exists
    if not db_user:
        db_user = User(username=username, hashed_password="")  # empty password for SSO
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)

    # 🔹 Step 4: Issue JWT
    token = await create_access_token({"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer"}
