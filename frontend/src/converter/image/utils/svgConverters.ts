// Converter logic here

import { Canvg } from "canvg";
import jsPDF from "jspdf";

/**
 * Convert an SVG file into PNG, JPG, or PDF.
 * @param file The SVG file
 * @param format The target format: "PNG" | "JPG" | "PDF"
 */
export async function svgToRaster(
  file: File,
  format: "PNG" | "JPG" | "PDF"
): Promise<Blob | null> {
  if (format === "PDF") {
    return convertSvgFileToPdf(file);
  }

  // PNG or JPG conversion
  const svgText = await file.text();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const v = await Canvg.fromString(ctx, svgText);
  await v.render();

  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), `image/${format.toLowerCase()}`);
  });
}

/** Helper: Convert SVG -> PDF */
/**
 * Convert an SVG File to PDF by sending it to the FastAPI backend.
 */
export async function convertSvgFileToPdf(file: File): Promise<Blob | null> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("to_format", "PDF");
  formData.append("from_format", "SVG");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const response = await fetch(`${BACKEND_URL}/convert/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert(`Failed to convert SVG to PDF, ${response.statusText}`);
      return null;
    }

    const blob = await response.blob();
    return blob;
  } catch (err) {
    alert(`Error converting SVG to PDF:, ${err}`);
    return null;
  }
}

/** Placeholder: raster -> SVG */
export async function rasterToSvg(file: File): Promise<Blob | null> {
  alert("⚠️ Raster to SVG requires vectorization. Not implemented.");
  return null;
}
