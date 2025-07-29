import React, { useRef } from "react";

type Props = {
  selectedFile: File | null;
  onFileChange: (file: File) => void;
};

const FileUpload: React.FC<Props> = ({ selectedFile, onFileChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="upload-area" onClick={() => inputRef.current?.click()} style={{ cursor: "pointer" }} title="Click to upload file">
      <input type="file" onChange={handleFileUpload} ref={inputRef} style={{ display: "none" }} />
      <p>
        {selectedFile ? (
          selectedFile.name
        ) : (
          <>
            <span>Drag and Drop </span> <br /> <span>or</span> <br />
            <span>Upload a file</span>
          </>
        )}
      </p>
    </div>
  );
};

export default FileUpload;
