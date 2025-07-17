import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaGoogle, FaApple, FaMicrosoft } from "react-icons/fa";

interface AuthProps {
  onSuccess: (token: string) => void;
  onCancel: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);

  const oneDriveIcon =
    chrome.runtime?.getURL("onedrive.svg") ?? "/onedrive.svg";

  const handleAuth = (provider: string) => {
    const mode = isLogin ? "login" : "register";
    const authUrl = `https://your-backend.com/auth/${provider}?mode=${mode}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error("Auth failed:", chrome.runtime.lastError);
          return;
        }

        const token = new URL(redirectUrl).searchParams.get("token");
        if (token) {
          chrome.storage.local.set({ token }, () => {
            console.log("Token saved:", token);
            onSuccess(token);
          });
        }
      }
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-avatar">
          <CgProfile size={60} />
        </div>
        <h2 className="auth-subtitle">Login / Register</h2>

        <div className="auth-buttons">
          <button
            onClick={() => handleAuth("apple")}
            className="auth-btn apple"
          >
            <FaApple /> Continue with Apple
          </button>

          <button
            onClick={() => handleAuth("google")}
            className="auth-btn google"
          >
            <FaGoogle /> Continue with Google
          </button>

          <button
            onClick={() => handleAuth("microsoft")}
            className="auth-btn microsoft"
          >
            <FaMicrosoft /> Continue with Microsoft
          </button>

          <button
            onClick={() => handleAuth("onedrive")}
            className="auth-btn onedrive"
          >
            <img
              src={oneDriveIcon}
              className="dropdown-menu-icons"
              width="15"
              height="15"
            />{" "}
            Continue with One Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
