# backend/routers/auth.py
import os
import requests
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from core.database import get_db
from core.security import create_access_token
from models.user import User

router = APIRouter()

# Provider credentials from environment
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
MICROSOFT_CLIENT_ID = os.getenv("MICROSOFT_CLIENT_ID")
MICROSOFT_CLIENT_SECRET = os.getenv("MICROSOFT_CLIENT_SECRET")

def get_or_create_user(db: Session, username: str) -> User:
  db_user = db.query(User).filter(User.username == username).first()
  if not db_user:
    db_user = User(username=username, hashed_password="")  # passwordless SSO
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
  return db_user


@router.post("/sso/{provider}")
def sso_login(
    provider: str,
    code: str = Query(...),
    redirect_uri: str = Query(...),
    db: Session = Depends(get_db),
):
  """
  Chrome extension sends `code` + `redirect_uri` (from chrome.identity.getRedirectURL).
  We exchange the code with the provider, verify user, then issue our JWT.
  """
  if provider == "google":
    # 1) Exchange code -> tokens
    token_resp = requests.post(
      "https://oauth2.googleapis.com/token",
      data={
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
      },
    )
    if token_resp.status_code != 200:
      raise HTTPException(status_code=401, detail="Google token exchange failed")
    tokens = token_resp.json()
    id_token = tokens.get("id_token")
    if not id_token:
      raise HTTPException(status_code=401, detail="No Google ID token returned")

    # 2) Verify ID token
    verify = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}")
    if verify.status_code != 200:
      raise HTTPException(status_code=401, detail="Invalid Google ID token")
    email = verify.json()["email"]

    db_user = get_or_create_user(db, email)

  elif provider in ("microsoft", "onedrive"):
    # 1) Exchange code -> tokens
    token_resp = requests.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      data={
        "client_id": MICROSOFT_CLIENT_ID,
        "client_secret": MICROSOFT_CLIENT_SECRET,
        "code": code,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code",
      },
      headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    if token_resp.status_code != 200:
      raise HTTPException(status_code=401, detail="Microsoft token exchange failed")
    tokens = token_resp.json()
    access_token = tokens.get("access_token")
    if not access_token:
      raise HTTPException(status_code=401, detail="No Microsoft access token returned")

    # 2) Read user profile
    me = requests.get(
      "https://graph.microsoft.com/v1.0/me",
      headers={"Authorization": f"Bearer {access_token}"},
    )
    if me.status_code != 200:
      raise HTTPException(status_code=401, detail="Invalid Microsoft access token")

    email = me.json()["userPrincipalName"]
    db_user = get_or_create_user(db, email)

  else:
    raise HTTPException(status_code=400, detail="Unsupported provider")

  # 3) Issue our app JWT
  jwt_token = create_access_token({"sub": db_user.username})
  return {"access_token": jwt_token, "token_type": "bearer"}
