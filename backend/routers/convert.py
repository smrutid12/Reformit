# backend/routers/convert.py
from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/convert", tags=["convert"])

@router.post("/convert")
async def convert_file(file: UploadFile = File(...)):
    """
    Accept a file upload and mark it for conversion.
    """
    # 🔹 Read file contents asynchronously
    contents = await file.read()

    # (Here you could process/convert the file asynchronously)
    # e.g., enqueue job to Celery, RQ, or custom background task

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size_bytes": len(contents),
        "status": "Conversion pending",
    }
