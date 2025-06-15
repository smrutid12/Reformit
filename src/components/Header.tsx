// src/popup/components/Header.tsx
import React from "react";

const historyIconUrl =
  typeof chrome !== "undefined" && chrome.runtime?.getURL
    ? chrome.runtime.getURL("history.svg")
    : "/history.svg";

const backButtonIconUrl =
  typeof chrome !== "undefined" && chrome.runtime?.getURL
    ? chrome.runtime.getURL("back_button.svg")
    : "/back_button.svg";

interface HeaderProps {
  showHistory: Boolean;
  onHistoryClick: () => void;
  onBackClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showHistory,
  onHistoryClick,
  onBackClick,
}) => (
  <div className="popup-header">
    <h2 className="popup-title">Reformit</h2>
    {showHistory ? (
      <button className="history-button" onClick={onBackClick}>
        <img src={backButtonIconUrl} alt="back icon" width="20" height="20" />
      </button>
    ) : (
      <button className="history-button" onClick={onHistoryClick}>
        <img src={historyIconUrl} alt="history icon" width="20" height="20" />
      </button>
    )}
  </div>
);

export default Header;
