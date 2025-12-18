export async function rasterToRaster(file: File, format: "PNG" | "JPG"): Promise<Blob | null> {
    const img = new Image();
    const dataURL = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.src = dataURL;
    });
  
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
  
    return new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b), `image/${format.toLowerCase()}`);
    });
  }
  