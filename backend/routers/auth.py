# backend/routers/auth.py
import requests
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from core.security import create_access_token
from models.user import User

router = APIRouter()

def verify_provider_token(provider: str, token: str) -> str:
    """
    Verifies token with provider and returns a unique username/email.
    """
    if provider == "google":
        resp = requests.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid Google token")
        data = resp.json()
        return data["email"]

    elif provider == "microsoft":
        resp = requests.get(
            "https://graph.microsoft.com/v1.0/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid Microsoft token")
        data = resp.json()
        return data["userPrincipalName"]

    elif provider == "onedrive":
        resp = requests.get(
            "https://graph.microsoft.com/v1.0/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid OneDrive token")
        data = resp.json()
        return data["userPrincipalName"]

    else:
        raise HTTPException(status_code=400, detail="Unsupported provider")


@router.post("/sso/{provider}")
def sso_login(provider: str, provider_token: str, db: Session = Depends(get_db)):
    """
    Accept a token from Google, Microsoft, or OneDrive,
    verify it, and issue our JWT.
    """
    # 🔹 Step 1: Verify token and get username/email
    username = verify_provider_token(provider, provider_token)

    # 🔹 Step 2: Check if user exists in DB
    db_user = db.query(User).filter(User.username == username).first()

    # 🔹 Step 3: Auto-register if not exists
    if not db_user:
        db_user = User(username=username, hashed_password="")  # empty password for SSO
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

    # 🔹 Step 4: Issue JWT
    token = create_access_token({"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer"}
