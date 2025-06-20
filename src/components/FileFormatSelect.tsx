// FileFormatSelect.tsx
import React from "react";

const FileFormatSelect = ({
  formats,
  selectedFormat,
  setFileFormat,
  setConvertTo,
}: any) => (
  <div className="form-group">
    <label className="form-label">File Format</label>
    <select
      className="form-select"
      value={selectedFormat}
      onChange={(e) => {
        setFileFormat(e.target.value);
        setConvertTo("");
      }}
    >
      <option value="">Select file format</option>
      {formats.map((format: any) => (
        <option key={format.id} value={format.id}>
          {format.name}
        </option>
      ))}
    </select>
  </div>
);

export default FileFormatSelect;
