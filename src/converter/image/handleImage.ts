import { fileData } from "../../utils/data";

export function handleImageConversion(fromFormat: string, toFormat: string, fileName: string): string {
    const imageOptions = fileData[0].convertOptions.IMAGE;
  
    const from = fromFormat.trim().toUpperCase();
    const to = toFormat.trim().toUpperCase();
  
    const fileEntry = imageOptions.find((item) => item.name === from);
    if (!fileEntry) {
      return `❌ Unsupported input format: ${fromFormat}`;
    }
  
    const isValid = fileEntry.convertTo.includes(to);
    if (!isValid) {
      return `❌ Cannot convert from ${fromFormat} to ${toFormat}`;
    }

    // Simulate new file name
    const newFileName = fileName.replace(/\.[^/.]+$/, `.${to.toLowerCase()}`);
  
    // ✅ Simulated response
    return `✅ Successfully converted ${fileName} from ${from} to ${to} → ${newFileName}`;
  }