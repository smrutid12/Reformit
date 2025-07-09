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
  isAuthenticated: Boolean;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showHistory,
  onHistoryClick,
  onBackClick,
  isAuthenticated,
  onLoginClick,
}) => (
  <div className="popup-header flex justify-between items-center">
    <h2 className="popup-title">Reformit</h2>

    <div className="flex items-center space-x-2">
      {!isAuthenticated && (
        <button className="header-button" onClick={onLoginClick}>
          <img src="user.png" alt="user icon" width="20" height="20" />
        </button>
      )}

      {showHistory && isAuthenticated ? (
        <button className="header-button" onClick={onBackClick}>
          <img src={backButtonIconUrl} alt="back icon" width="20" height="20" />
        </button>
      ) : (
        <button className="header-button" onClick={onHistoryClick}>
          <img src={historyIconUrl} alt="history icon" width="20" height="20" />
        </button>
      )}
    </div>
  </div>
);

export default Header;
