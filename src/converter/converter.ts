import { ConvertOptionKey } from "../utils/data";
import { handleImageConversion } from "./image/handleImage";

// Add handlers as you implement them
// import { handleDocsConversion } from "./docs/handleDocs";
// import { handleAudioConversion } from "./audio/handleAudio";
// import { handleVideoConversion } from "./video/handleVideo";
// import { handleArchiveConversion } from "./archive/handleArchive";

type ConversionHandler = (
  file: File,
  fileFormat: string,
  convertTo: string,
  fileName: string
) => Promise<Blob | null>;

// Strategy map for category => handler
const conversionStrategies: Partial<
  Record<ConvertOptionKey, ConversionHandler>
> = {
  IMAGE: handleImageConversion,
};

export const convertFile = (
  file: File,
  fileCategory: ConvertOptionKey,
  fileFormat: string,
  convertTo: string
): Promise<Blob | null> => {
  const handler = conversionStrategies[fileCategory];
  const fileName = file.name;

  if (!handler) {
    alert(`Conversion for category "${fileCategory}" is not implemented.`);
    return Promise.resolve(null);
  }

  return handler(file, fileFormat, convertTo, fileName);
};
