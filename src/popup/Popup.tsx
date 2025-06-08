import React, { useState, useRef } from "react";
import "./style.css";
import { fileData, ConvertOptions } from "../utils/data";

type ConvertOptionsKeys = keyof ConvertOptions;

const validFileTypes: ConvertOptionsKeys[] = [
  "DOCS",
  "IMAGE",
  "AUDIO",
  "VIDEO",
  "ARCHIVE",
  "AI",
  "METADATA",
];

const Popup: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileCategory, setFileCategory] = useState<ConvertOptionsKeys | "">("");
  const [fileFormat, setFileFormat] = useState<string>("");
  const [convertTo, setConvertTo] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const ext = file.name.split(".").pop()?.toUpperCase() || "";
      console.log("ext", ext);

      const options = fileData[0].convertOptions;
      console.log(
        "convertOptions keys:",
        Object.keys(fileData[0].convertOptions || {})
      );

      // Iterate over each category to find matching extension
      for (const [category, formats] of Object.entries(options)) {
        const match = formats.find((format) => format.name === ext);
        if (match) {
          setFileCategory(category as ConvertOptionsKeys);
          setFileFormat(match.id); // ✅ use the ID for consistency
          return;
        }
      }
      console.log(fileFormat, "fileFormat");
      console.log(fileCategory, "fileCategory");
      // If no match found
      setFileCategory("");
      setFileFormat("");
    }
  };

  const handleConvert = () => {
    if (!selectedFile) {
      alert("Please upload a file first");
      return;
    }
    if (!fileCategory || !fileFormat || !convertTo) {
      alert("Please select file category, format, and conversion format");
      return;
    }
    alert(`Converting ${selectedFile.name} from ${fileFormat} to ${convertTo}`);
    // Your conversion logic here
  };

  // Get available formats for selected category
  const availableFormats = fileCategory
    ? fileData[0]?.convertOptions[fileCategory]?.map((option) => ({
        id: option.id,
        name: option.name || "Unnamed Format",
      }))
    : [];

  // Get available conversion options for selected format
  const availableConversions =
    fileCategory && fileFormat
      ? fileData[0]?.convertOptions[fileCategory]?.find(
          (option) => option.id === fileFormat
        )?.convertTo || []
      : [];

  return (
    <div className="popup-container">
      <h2 className="popup-title">Reformit</h2>

      <div
        className="upload-area"
        onClick={() => fileInputRef.current?.click()}
        style={{ cursor: "pointer" }}
        title="Click to upload file"
      >
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <p>{selectedFile ? selectedFile.name : "Upload a file"}</p>
      </div>

      <div className="form-group">
        <label className="form-label">File Category</label>
        <select
          className="form-select"
          value={fileCategory}
          onChange={(e) => {
            const val = e.target.value as ConvertOptionsKeys | "";
            if (
              val === "" ||
              validFileTypes.includes(val as ConvertOptionsKeys)
            ) {
              setFileCategory(val);
              setFileFormat(""); // reset format when category changes
              setConvertTo(""); // reset conversion when category changes
            }
          }}
        >
          <option value="">Select file category</option>
          {fileData[0]?.fileTypes &&
            Object.values(fileData[0].fileTypes).map((value, idx) => (
              <option key={idx} value={value.key}>
                {value.name}
              </option>
            ))}
        </select>
      </div>

      {fileCategory && (
        <div className="form-group">
          <label className="form-label">File Format</label>
          <select
            className="form-select"
            value={fileFormat}
            onChange={(e) => {
              setFileFormat(e.target.value);
              setConvertTo(""); // reset conversion when format changes
            }}
          >
            <option value="">Select file format</option>
            {availableFormats.map((format) => (
              <option key={format.id} value={format.id}>
                {format.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {fileFormat && (
        <div className="form-group">
          <label className="form-label">Convert to</label>
          <select
            className="form-select"
            value={convertTo}
            onChange={(e) => setConvertTo(e.target.value)}
          >
            <option value="">Select output format</option>
            {availableConversions.map((conversion) => (
              <option key={conversion} value={conversion}>
                {conversion}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        className="convert-button"
        onClick={handleConvert}
        disabled={!selectedFile || !fileCategory || !fileFormat || !convertTo}
      >
        Convert
      </button>
    </div>
  );
};

export default Popup;
