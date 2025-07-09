import React, { useState, useRef, useEffect } from "react";
import { fileData, ConvertOptions, ConvertOptionKey } from "../utils/data";
import Header from "../components/Header";
import History from "../components/History";
import FileUpload from "../components/FileUpload";
import FileInfo from "../components/FileInfo";
import FileCategorySelect from "../components/FileCategorySelect";
import FileFormatSelect from "../components/FileFormatSelect";
import ConvertToSelect from "../components/ConvertToSelect";
import DownloadOptions from "../components/DownloadOptions";
import ConvertButton from "../components/ConvertButton";
import "./style.css";
import Auth from "../components/Auth";
import useNetworkStatus from "../utils/networkStatus";

const Popup: React.FC = () => {
  const isOnline = useNetworkStatus();

  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);

  const [showHistory, setShowHistory] = useState<Boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileCategory, setFileCategory] = useState<ConvertOptionKey | "">("");
  const [fileFormat, setFileFormat] = useState<string>("");
  const [convertTo, setConvertTo] = useState<string>("");
  const [download, setDownload] = useState<Boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogin = () => {
    chrome.identity.launchWebAuthFlow(
      {
        url: `https://your-backend.com/auth/google?mode=login`,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error("Login failed:", chrome.runtime.lastError);
          return;
        }

        const token = new URL(redirectUrl).searchParams.get("token");
        if (token) {
          chrome.storage.local.set({ token }, () => {
            setIsAuthenticated(true);
          });
        }
      }
    );
  };

  const processFile = (file: File) => {
    setSelectedFile(file);

    const ext = file.name.split(".").pop()?.toUpperCase() || "";
    const options = fileData[0].convertOptions;

    for (const [category, formats] of Object.entries(options)) {
      const match = formats.find((f) => f.name === ext);
      if (match) {
        setFileCategory(category as ConvertOptionKey);
        setFileFormat(match.id);
        return;
      }
    }

    setFileCategory("");
    setFileFormat("");
  };

  const handleConvert = () => {
    if (!selectedFile || !fileCategory || !fileFormat || !convertTo) {
      alert("Please complete all selections");
      return;
    }
    setDownload(true);
    alert(`Converting ${selectedFile.name} from ${fileFormat} to ${convertTo}`);
  };

  const availableFormats = fileCategory
    ? fileData[0].convertOptions[fileCategory]
    : [];

  const availableConversions =
    fileCategory && fileFormat
      ? fileData[0].convertOptions[fileCategory]?.find(
          (f) => f.id === fileFormat
        )?.convertTo || []
      : [];

  return (
    <div className="popup-container">
      <Header
        showHistory={showHistory}
        onHistoryClick={() => setShowHistory(true)}
        onBackClick={() => setShowHistory(false)}
        isAuthenticated={isAuthenticated}
        onLoginClick={handleLogin}
      />
      {showAuth ? (
        <Auth
          onSuccess={handleAuthSuccess}
          onCancel={() => setShowAuth(false)}
        />
      ) : showHistory ? (
        <History onClose={() => setShowHistory(false)} />
      ) : (
        <>
          <FileUpload selectedFile={selectedFile} onFileChange={processFile} />
          {selectedFile && <FileInfo file={selectedFile} />}
          <FileCategorySelect
            fileCategory={fileCategory}
            setFileCategory={setFileCategory}
            setFileFormat={setFileFormat}
            setConvertTo={setConvertTo}
            fileTypes={fileData[0]?.fileTypes}
            validFileTypes={[
              "DOCS",
              "IMAGE",
              "AUDIO",
              "VIDEO",
              "ARCHIVE",
              "AI",
              "METADATA",
            ]}
          />
          {fileCategory && (
            <FileFormatSelect
              formats={availableFormats}
              selectedFormat={fileFormat}
              setFileFormat={setFileFormat}
              setConvertTo={setConvertTo}
            />
          )}
          {fileFormat && (
            <ConvertToSelect
              conversions={availableConversions}
              selectedConversion={convertTo}
              setConvertTo={setConvertTo}
            />
          )}
          {download ? (
            <DownloadOptions
              file={selectedFile}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              dropdownRef={dropdownRef}
              className="button-group"
            />
          ) : (
            <ConvertButton
              onClick={handleConvert}
              disabled={
                !selectedFile || !fileCategory || !fileFormat || !convertTo
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default Popup;
