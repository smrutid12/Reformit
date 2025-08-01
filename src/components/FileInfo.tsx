import React from "react";

const FileInfo: React.FC<{ file: File }> = ({ file }) => {
  const handleFileSize = (size: number): string => {
    const sizeInMB = size / (1024 * 1024);
    if (sizeInMB > 5) {
      alert(`⚠️ File size: ${sizeInMB.toFixed(2)} MB (exceeds 5 MB)`);
      return `NaN`;
    }
    return `File size: ${sizeInMB.toFixed(2)} MB`;
  };

  return (
    <div className="file-info">
      <small>{handleFileSize(file.size)}</small>
    </div>
  );
};

export default FileInfo;
