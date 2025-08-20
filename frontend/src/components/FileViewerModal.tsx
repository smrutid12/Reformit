import React from "react";

interface Props {
  file: File | null;
  onClose: () => void;
}

const FileViewerModal: React.FC<Props> = ({ file, onClose }) => {
  if (!file) return null;

  const fileURL = URL.createObjectURL(file);

  const isImage = file.type.startsWith("image/");
  const isPDF = file.type === "application/pdf";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2 className="modal-title">{file.name}</h2>

        <div className="modal-body">
          {isImage && <img src={fileURL} alt={file.name} className="modal-preview" />}
          {isPDF && <iframe src={fileURL} title={file.name} className="modal-preview" />}
        </div>
      </div>
    </div>
  );
};

export default FileViewerModal;
