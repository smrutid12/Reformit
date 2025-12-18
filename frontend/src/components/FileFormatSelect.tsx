// FileFormatSelect.tsx
import React from "react";

const FileFormatSelect = ({
  formats,
  selectedFormat,
  setFileFormat,
  setConvertTo,
  disabled,
}: any) => (
  <div className="form-group">
    <label className="form-label">File Format</label>
    <input className="form-select" type="text" value={selectedFormat} disabled placeholder="File format"/>
  </div>
);

export default FileFormatSelect;
