from utils.svg import svg_to_pdf

conversion_map = {
    ("SVG", "PDF"): svg_to_pdf,
    # ("SVG", "PNG"): svg_to_png,
}

MIME_TYPES = {
    "PDF": "application/pdf",
    "PNG": "image/png",
    "JPG": "image/jpeg",
    "JPEG": "image/jpeg",
}