// Converter logic here

import { Canvg } from "canvg";

export async function svgToRaster(file: File, format: "PNG" | "JPG"): Promise<Blob | null> {
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

export async function rasterToSvg(file: File): Promise<Blob | null> {
  alert("⚠️ Raster to SVG requires vectorization. Not implemented.");
  return null;
}
