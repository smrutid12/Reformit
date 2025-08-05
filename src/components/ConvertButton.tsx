import React from "react";
import { ConvertOptionKey } from "../utils/data";
import { convertFile } from "../converter/converter";

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
  const handleFileConvert = async () => {
    if (!selectedFile || !fileCategory || !fileFormat || !convertTo) {
      alert("Please complete all selections");
      return;
    }

    try {
      const result = await convertFile(
        selectedFile,
        fileCategory,
        fileFormat,
        convertTo
      );

      if (!result) {
        alert("Conversion failed or unsupported.");
        return;
      }

      if (typeof result === "string") {
        alert(result); // If `convertFile` still returns a message string
      } else if ("message" in result) {
        alert(result.message);
      }

      // Optionally: Trigger a download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(result);
      downloadLink.download = `${
        selectedFile.name.split(".")[0]
      }.${convertTo.toLowerCase()}`;
      downloadLink.click();

      setDownload(true);

      alert(
        `Successfully converted ${selectedFile.name} from ${fileFormat} to ${convertTo}`
      );
    } catch (error) {
      console.error("Conversion error:", error);
      alert("An error occurred during conversion.");
    }
  };

  return (
    <button
      className={`convert-button primary-button main-button ${
        disabled ? `disabled-button` : ``
      }`}
      onClick={handleFileConvert}
      disabled={disabled}
    >
      Convert
    </button>
  );
};

export default ConvertButton;
