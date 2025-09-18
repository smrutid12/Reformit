import { svgToRaster, rasterToRaster, rasterToSvg } from "./utils";
import { fileData } from "../../utils/data";

export async function handleImageConversion(
  file: File,
  fromFormat: string,
  toFormat: string
): Promise<Blob | null> {
  const from = fromFormat.trim().toUpperCase();
  const to = toFormat.trim().toUpperCase();

  const imageOptions = fileData[0].convertOptions.IMAGE;
  const fileEntry = imageOptions.find((item) => item.name === from);

  if (!fileEntry) {
    alert(`❌ Unsupported input format: ${fromFormat}`);
    return null;
  }

  if (!fileEntry.convertTo.includes(to)) {
    alert(`❌ Cannot convert from ${fromFormat} to ${toFormat}`);
    return null;
  }

  if (from === "SVG" && ["PNG", "JPG"].includes(to)) return svgToRaster(file, to as "PNG" | "JPG");
  if (to === "SVG" && ["PNG", "JPG"].includes(from)) return rasterToSvg(file);
  if (["PNG", "JPG"].includes(from) && ["PNG", "JPG"].includes(to)) return rasterToRaster(file, to as "PNG" | "JPG");

  return new Blob([await file.arrayBuffer()], { type: `image/${to.toLowerCase()}` });
}
