import os
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

REDIRECT_URI = f"https://{os.getenv('CHROME_EXTENSION_ID')}.chromiumapp.org/"

@router.get("/config")
def get_auth_config():
    google_client_id = os.getenv("GOOGLE_CLIENT_ID")
    microsoft_client_id = os.getenv("MICROSOFT_CLIENT_ID")

    if not google_client_id or not microsoft_client_id:
        return JSONResponse(
            status_code=500,
            content={"error": "Missing OAuth client IDs in environment"},
        )

    google_auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={google_client_id}"
        f"&response_type=id_token"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope=openid%20email%20profile"
        f"&prompt=select_account"
    )

    microsoft_auth_url = (
        f"https://login.microsoftonline.com/common/oauth2/v2.0/authorize?"
        f"client_id={microsoft_client_id}"
        f"&response_type=token"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope=openid%20profile%20email%20User.Read"
    )

    onedrive_auth_url = (
        f"https://login.microsoftonline.com/common/oauth2/v2.0/authorize?"
        f"client_id={microsoft_client_id}"
        f"&response_type=token"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope=openid%20profile%20email%20User.Read%20Files.Read"
    )

    return {
        "google_auth_url": google_auth_url,
        "microsoft_auth_url": microsoft_auth_url,
        "onedrive_auth_url": onedrive_auth_url,
    }
