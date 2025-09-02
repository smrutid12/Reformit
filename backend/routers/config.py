import os
from urllib.parse import urlencode
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from core.config import settings

router = APIRouter()

REDIRECT_URI = f"https://{settings.CHROME_EXTENSION_ID}.chromiumapp.org/"

@router.get("/config")
async def get_auth_config():
    google_client_id = settings.GOOGLE_CLIENT_ID
    microsoft_client_id = settings.MICROSOFT_CLIENT_ID
    print(google_client_id, microsoft_client_id, 'sssssssss')
    if not google_client_id or not microsoft_client_id:
        return JSONResponse(
            status_code=500,
            content={"error": "Missing OAuth client IDs in environment"},
        )

    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth?"
        + urlencode({
            "client_id": google_client_id,
            "response_type": "id_token",
            "redirect_uri": REDIRECT_URI,
            "scope": "openid email profile",
            "prompt": "select_account",
        })
    )

    microsoft_auth_url = (
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?"
        + urlencode({
            "client_id": microsoft_client_id,
            "response_type": "token",
            "redirect_uri": REDIRECT_URI,
            "scope": "openid profile email User.Read",
        })
    )

    onedrive_auth_url = (
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?"
        + urlencode({
            "client_id": microsoft_client_id,
            "response_type": "token",
            "redirect_uri": REDIRECT_URI,
            "scope": "openid profile email User.Read Files.Read",
        })
    )

    return {
        "google_auth_url": google_auth_url,
        "microsoft_auth_url": microsoft_auth_url,
        "onedrive_auth_url": onedrive_auth_url,
    }
