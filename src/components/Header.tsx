import React from "react";

const historyIconUrl =
  typeof chrome !== "undefined" && chrome.runtime?.getURL
    ? chrome.runtime.getURL("history.svg")
    : "/history.svg";

const backButtonIconUrl =
  typeof chrome !== "undefined" && chrome.runtime?.getURL
    ? chrome.runtime.getURL("back_button.svg")
    : "/back_button.svg";

const userIconUrl =
  typeof chrome !== "undefined" && chrome.runtime?.getURL
    ? chrome.runtime.getURL("user.png")
    : "/user.png";

interface HeaderProps {
  showHistory: boolean;
  showAuth: boolean;
  onHistoryClick: () => void;
  onBackClick: () => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showHistory,
  showAuth,
  onHistoryClick,
  onBackClick,
  isAuthenticated,
  onLoginClick,
}) => {
  return (
    <div className="popup-header flex justify-between items-center px-4 py-2 border-b border-gray-200">
      <h2 className="popup-title text-lg font-semibold text-[#e85234]">
        Reformit
      </h2>

      <div className="flex items-center space-x-2">
        {/* Show back button if login or history is shown */}
        {(showHistory || showAuth) ? (
          <button className="header-button" onClick={onBackClick}>
            <img
              src={backButtonIconUrl}
              alt="back icon"
              width="20"
              height="20"
            />
          </button>
        ) : isAuthenticated ? (
          <button className="header-button" onClick={onHistoryClick}>
            <img
              src={historyIconUrl}
              alt="history icon"
              width="20"
              height="20"
            />
          </button>
        ) : (
          <button className="header-button" onClick={onLoginClick}>
            <img src={userIconUrl} alt="user icon" width="20" height="20" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
