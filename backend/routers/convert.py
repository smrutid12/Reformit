# backend/routers/convert.py
from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/")
async def convert_file(file: UploadFile = File(...)):
    return {"filename": file.filename, "status": "Conversion pending"}
