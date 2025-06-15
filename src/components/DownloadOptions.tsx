import { handleDownload, handleZipFile, uploadToDrive } from "../utils/download";

const zipIcon = chrome.runtime?.getURL("zip_file.svg") ?? "/zip_file.svg";
const googleDriveIcon = chrome.runtime?.getURL("google_drive.svg") ?? "/google_drive.svg";
const oneDriveIcon = chrome.runtime?.getURL("onedrive.svg") ?? "/onedrive.svg";

const DownloadOptions = ({
  file,
  dropdownOpen,
  setDropdownOpen,
  dropdownRef,
}: any) => {
  const handleGoogleDriveUpload = () => {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      if (chrome.runtime.lastError) {
        console.error("Auth error:", chrome.runtime.lastError.message);
        return;
      }
      uploadToDrive(token as string);
    });
  };

  return (
    <div className="button-group" ref={dropdownRef}>
      <button className="main-button" onClick={() => handleDownload(file)}>
        Download
      </button>
      <div className="dropdown-wrapper">
        <button className="dropdown-toggle" onClick={() => setDropdownOpen((prev: boolean) => !prev)}>
          {dropdownOpen ? "▲" : "▼"}
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={() => { handleZipFile(file); setDropdownOpen(false); }}>
              <img src={zipIcon} className="dropdown-menu-icons" width="15" height="15" />
              Download as zip
            </button>
            <button onClick={() => { handleGoogleDriveUpload(); setDropdownOpen(false); }}>
              <img src={googleDriveIcon} className="dropdown-menu-icons" width="15" height="15" />
              Upload to Google Drive
            </button>
            <button onClick={() => setDropdownOpen(false)}>
              <img src={oneDriveIcon} className="dropdown-menu-icons" width="15" height="15" />
              Upload to OneDrive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadOptions;
