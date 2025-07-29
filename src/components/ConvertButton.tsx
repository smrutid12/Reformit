import React from "react";
import { ConvertOptionKey } from "../utils/data";

const ConvertButton = ({
  selectedFile,
  fileCategory,
  fileFormat,
  convertTo,
  disabled,
  setDownload,
}: {
  selectedFile: File | null;
  fileCategory: ConvertOptionKey | "";
  fileFormat: string | "";
  convertTo: string | "";
  disabled: boolean;
  setDownload: (val: boolean) => void;
}) => {
  const handleConvert = () => {
    if (!selectedFile || !fileCategory || !fileFormat || !convertTo) {
      alert("Please complete all selections");
      return;
    }
    setDownload(true);
    alert(`Converting ${selectedFile.name} from ${fileFormat} to ${convertTo}`);
  };

  return (
    <button
      className={`convert-button primary-button main-button ${
        disabled ? `disabled-button` : ``
      }`}
      onClick={handleConvert}
      disabled={disabled}
    >
      Convert
    </button>
  );
};

export default ConvertButton;
