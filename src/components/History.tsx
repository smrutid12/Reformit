import React, { useEffect, useRef, useState } from "react";
import { historyData } from "../utils/data";
import DownloadOptions from "./DownloadOptions";

interface HistoryProps {
  onClose: () => void;
}

const History: React.FC<HistoryProps> = () => {
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
  return (
    <div className="history-container">
      <div className="history-header">
        <h2 className="history-heading">Conversion History</h2>
      </div>
      <div className="history-list">
        {historyData.map((item) => (
          <div key={item.id} className="history-item">
            <div>
              <p className="history-file-name">{item.file_name}</p>
              <p className="history-file-type">
                {item.file_type.toUpperCase()} → {item.file_converted_to}
              </p>
            </div>
            <DownloadOptions
              file={item.file_url}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              dropdownRef={dropdownRef}
              className="history-download-button"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
