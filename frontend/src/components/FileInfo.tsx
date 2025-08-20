import React, { useState } from "react";
import FileViewerModal from "./FileViewerModal";

const FileInfo: React.FC<{ file: File }> = ({ file }) => {
  const [showViewer, setShowViewer] = useState(false);

  const handleFileSize = (size: number): string => {
    const sizeInMB = size / (1024 * 1024);
    if (sizeInMB > 5) {
      alert(`⚠️ File size: ${sizeInMB.toFixed(2)} MB (exceeds 5 MB)`);
      return `NaN`;
    }
    return `File size: ${sizeInMB.toFixed(2)} MB`;
  };

  // Check if the file can be previewed
  const canPreview =
    file.type.startsWith("image/") || file.type === "application/pdf";

  return (
    <div className="file-info">
      <small className="file-size">{handleFileSize(file.size)}</small>
      <button
        className="file-view-button"
        onClick={() => canPreview && setShowViewer(true)}
        disabled={!canPreview}
      >
        View
        {!canPreview && (
          <span className="tooltip-text">
            Preview not available for this file type
          </span>
        )}
      </button>

      {showViewer && (
        <FileViewerModal file={file} onClose={() => setShowViewer(false)} />
      )}
    </div>
  );
};

export default FileInfo;
