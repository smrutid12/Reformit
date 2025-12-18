import io
import cairosvg

# 🔹 Conversion functions
def svg_to_pdf(svg_bytes: bytes) -> io.BytesIO:
    """Convert SVG bytes to PDF and return a BytesIO buffer."""
    output = io.BytesIO()
    cairosvg.svg2pdf(bytestring=svg_bytes, write_to=output)
    output.seek(0)
    return output