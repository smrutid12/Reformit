import { fileData } from "../../utils/data";

/**
 * Simulates an image file conversion and returns a success or failure message.
 */
export async function handleImageConversion(
  file: File,
  fromFormat: string,
  toFormat: string,
  fileName: string
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

  // Simulate conversion by returning the original file as a blob
  const convertedBlob = new Blob([await file.arrayBuffer()], {
    type: `image/${to.toLowerCase()}`,
  });

  return convertedBlob;
}
