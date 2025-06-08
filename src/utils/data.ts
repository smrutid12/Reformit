export type FileType = {
  key: string;
  name: string;
};

export type ConvertOption = {
  id: string;
  name: string;
  availability: "free" | "paid"; // restrict to these values explicitly
  convertTo: string[]; // target formats as string keys
};

export type ConvertOptions = {
  [key in
    | "DOCS"
    | "IMAGE"
    | "AUDIO"
    | "VIDEO"
    | "ARCHIVE"
    | "AI"
    | "METADATA"]: ConvertOption[];
};

export type FileData = {
  fileTypes: Record<number, FileType>;
  convertOptions: ConvertOptions;
};

export const fileData = [
  {
    fileTypes: {
      1: { key: "DOCS", name: "Document", icon: "" },
      2: { key: "IMAGE", name: "Image", icon: "" },
      3: { key: "AUDIO", name: "Audio", icon: "" },
      4: { key: "VIDEO", name: "Video", icon: "" },
      5: { key: "ARCHIVE", name: "Archive", icon: "" },
    },
    convertOptions: {
      DOCS: [
        {
          id: "1",
          name: "PDF",
          availability: "free",
          convertTo: ["DOCX", "TXT", "JPG", "PNG"],
        },
        {
          id: "2",
          name: "DOCX",
          availability: "free",
          convertTo: ["PDF", "TXT", "ODT", "RTF"],
        },
        {
          id: "3",
          name: "TXT",
          availability: "free",
          convertTo: ["PDF", "DOCX", "HTML"],
        },
        {
          id: "4",
          name: "PPTX",
          availability: "free",
          convertTo: ["PDF", "PPT", "JPG"],
        },
        {
          id: "5",
          name: "XLSX",
          availability: "free",
          convertTo: ["PDF", "CSV", "ODS"],
        },
      ],
      IMAGE: [
        {
          id: "1",
          name: "JPG",
          availability: "free",
          convertTo: ["PNG", "WEBP", "PDF", "SVG"],
        },
        {
          id: "2",
          name: "PNG",
          availability: "free",
          convertTo: ["JPG", "WEBP", "ICO", "BMP"],
        },
        {
          id: "3",
          name: "SVG",
          availability: "free",
          convertTo: ["PNG", "JPG", "PDF"],
        },
        {
          id: "4",
          name: "GIF",
          availability: "free",
          convertTo: ["MP4", "WEBP", "PNG"],
        },
        {
          id: "5",
          name: "WEBP",
          availability: "free",
          convertTo: ["PNG", "JPG", "GIF"],
        },
      ],
      AUDIO: [
        {
          id: "1",
          name: "MP3",
          availability: "free",
          convertTo: ["WAV", "OGG", "FLAC"],
        },
        {
          id: "2",
          name: "WAV",
          availability: "free",
          convertTo: ["MP3", "OGG", "AAC"],
        },
        {
          id: "3",
          name: "FLAC",
          availability: "free",
          convertTo: ["MP3", "WAV", "ALAC"],
        },
        {
          id: "4",
          name: "AAC",
          availability: "free",
          convertTo: ["MP3", "WAV", "OGG"],
        },
        {
          id: "5",
          name: "OGG",
          availability: "free",
          convertTo: ["MP3", "WAV", "FLAC"],
        },
      ],
      VIDEO: [
        {
          id: "1",
          name: "MP4",
          availability: "free",
          convertTo: ["GIF", "AVI", "MOV", "MKV"],
        },
        {
          id: "2",
          name: "MOV",
          availability: "free",
          convertTo: ["MP4", "AVI", "WMV"],
        },
        {
          id: "3",
          name: "AVI",
          availability: "free",
          convertTo: ["MP4", "MOV", "MKV"],
        },
        {
          id: "4",
          name: "MKV",
          availability: "free",
          convertTo: ["MP4", "AVI", "WEBM"],
        },
        {
          id: "5",
          name: "WEBM",
          availability: "free",
          convertTo: ["MP4", "GIF", "MOV"],
        },
      ],
      ARCHIVE: [
        {
          id: "1",
          name: "ZIP",
          availability: "free",
          convertTo: ["RAR", "7Z", "TAR"],
        },
        {
          id: "2",
          name: "RAR",
          availability: "free",
          convertTo: ["ZIP", "7Z", "TAR.GZ"],
        },
        {
          id: "3",
          name: "7Z",
          availability: "free",
          convertTo: ["ZIP", "RAR", "TAR"],
        },
        {
          id: "4",
          name: "TAR",
          availability: "free",
          convertTo: ["ZIP", "GZ", "BZ2"],
        },
        {
          id: "5",
          name: "ISO",
          availability: "free",
          convertTo: ["DMG", "IMG", "VHD"],
        },
      ],
      AI: [
        {
          id: "1",
          name: "AI to PDF",
          availability: "paid",
          convertTo: ["JPG", "PNG", "SVG"],
        },
        {
          id: "2",
          name: "AI to SVG",
          availability: "paid",
          convertTo: ["PDF", "PNG", "EPS"],
        },
        {
          id: "3",
          name: "AI to EPS",
          availability: "paid",
          convertTo: ["PDF", "SVG", "AI"],
        },
        {
          id: "4",
          name: "AI to PNG",
          availability: "paid",
          convertTo: ["JPG", "PDF", "SVG"],
        },
        {
          id: "5",
          name: "Vectorize Image",
          availability: "paid",
          convertTo: ["SVG", "AI", "PDF"],
        },
      ],
      METADATA: [
        {
          id: "1",
          name: "EXIF Editor",
          availability: "paid",
          convertTo: ["JSON", "CSV", "XML"],
        },
        {
          id: "2",
          name: "PDF Metadata",
          availability: "paid",
          convertTo: ["JSON", "XML", "TXT"],
        },
        {
          id: "3",
          name: "Audio Metadata",
          availability: "paid",
          convertTo: ["JSON", "CSV", "ID3"],
        },
        {
          id: "4",
          name: "Video Metadata",
          availability: "paid",
          convertTo: ["JSON", "XML", "CSV"],
        },
        {
          id: "5",
          name: "Document Metadata",
          availability: "paid",
          convertTo: ["JSON", "XML", "CSV"],
        },
      ],
      //   MATH: [
      //     // New category for mathematical expressions
      //     {
      //       id: "1",
      //       name: "LaTeX to PNG",
      //       availability: "free",
      //       convertTo: ["SVG", "PDF", "JPG"],
      //     },
      //     {
      //       id: "2",
      //       name: "MathML to LaTeX",
      //       availability: "free",
      //       convertTo: ["TXT", "PDF", "HTML"],
      //     },
      //     {
      //       id: "3",
      //       name: "Equation to SVG",
      //       availability: "free",
      //       convertTo: ["PNG", "PDF", "EPS"],
      //     },
      //     {
      //       id: "4",
      //       name: "Handwriting to LaTeX",
      //       availability: "paid",
      //       convertTo: ["TXT", "PNG", "PDF"],
      //     },
      //     {
      //       id: "5",
      //       name: "Math OCR",
      //       availability: "paid",
      //       convertTo: ["LaTeX", "MathML", "TXT"],
      //     },
      //   ],
    },
  },
];
