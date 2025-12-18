# backend/routers/convert.py
from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from core.converters_constant import conversion_map, MIME_TYPES
from utils.unsupported import unsupported_conversion

router = APIRouter(prefix="/convert", tags=["convert"])


@router.post("/convert/image")
async def convert_file(
    to_format: str = Form(...),
    from_format: str = Form(...),
    file: UploadFile = File(...),
    **kwargs
):
    """
    Dynamically convert a file based on from_format -> to_format.
    Uses the conversion_map to select the appropriate converter.
    """
    from_format = from_format.strip().upper()
    to_format = to_format.strip().upper()

    # Lookup the appropriate conversion function
    conversion_fn = conversion_map.get((from_format, to_format), unsupported_conversion)

    try:
        file_bytes = await file.read()
        output_buffer = conversion_fn(file_bytes)
    except Exception as e:
        return {"error": f"Conversion failed: {str(e)}"}

    # Determine MIME type dynamically
    mime_type = MIME_TYPES.get(to_format, "application/octet-stream")

    # Dynamically generate output filename with correct extension
    base_name = file.filename.rsplit(".", 1)[0]
    file_extension = to_format.lower()
    output_filename = f"{base_name}.{file_extension}"

    return StreamingResponse(
        output_buffer,
        media_type=mime_type,
        headers={
            "Content-Disposition": f"attachment; filename={output_filename}"
        }
    )