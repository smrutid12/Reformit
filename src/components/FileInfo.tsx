import React from "react";

const FileInfo: React.FC<{ file: File }> = ({ file }) => (
  <div className="file-info">
    <small>file size: {(file.size / 1024).toFixed(1)} KB</small>
  </div>
);

export default FileInfo;
