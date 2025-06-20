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

export type ConvertOptionKey = keyof ConvertOptions;

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

export const historyData = [
  {
    id: 1,
    file_name: "example_file1.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 2,
    file_name: "example_file2.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 3,
    file_name: "example_file3.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 4,
    file_name: "example_file4.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 5,
    file_name: "example_file5.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 6,
    file_name: "example_file6.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 7,
    file_name: "example_file7.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 8,
    file_name: "example_file8.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 9,
    file_name: "example_file9.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 10,
    file_name: "example_file10.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 11,
    file_name: "example_file11.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 12,
    file_name: "example_file12.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 13,
    file_name: "example_file13.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 14,
    file_name: "example_file14.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 15,
    file_name: "example_file15.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 16,
    file_name: "example_file16.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 17,
    file_name: "example_file17.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 18,
    file_name: "example_file18.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 19,
    file_name: "example_file19.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
  {
    id: 20,
    file_name: "example_file20.docx",
    file_type: "docx",
    file_converted_to: "PDF",
    file_url: "",
  },
];
