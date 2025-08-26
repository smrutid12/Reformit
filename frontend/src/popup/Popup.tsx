import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

interface AuthProps {
  onSuccess: (token: string) => void;
}

// Backend URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const oneDriveIcon =
    chrome.runtime?.getURL("onedrive.svg") ?? "/onedrive.svg";

  // 🔹 Generic OAuth handler for all providers
  const handleAuth = (provider: "google" | "microsoft" | "onedrive") => {
    const authUrl = `${backendUrl}/sso/${provider}?redirect_uri=${encodeURIComponent(
      chrome.identity.getRedirectURL()
    )}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error("Auth failed:", chrome.runtime.lastError);
          alert(`Login failed for ${provider}`);
          return;
        }

        // Extract token from redirect URL
        const token = new URL(redirectUrl).searchParams.get("token");
        if (token) {
          chrome.storage.local.set({ token }, () => {
            console.log(`${provider} token saved:`, token);
            onSuccess(token);
          });
        } else {
          alert(`No token received from ${provider}`);
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
        <h2 className="auth-subtitle">Login</h2>

        <div className="auth-buttons">

          {/* Google Login */}
          <button onClick={() => handleAuth("google")} className="auth-btn google">
            <FaGoogle /> Continue with Google
          </button>

          {/* Microsoft Login */}
          <button
            onClick={() => handleAuth("microsoft")}
            className="auth-btn microsoft"
          >
            <FaMicrosoft /> Continue with Microsoft
          </button>

          {/* OneDrive Login */}
          <button
            onClick={() => handleAuth("onedrive")}
            className="auth-btn onedrive"
          >
            <img
              src={oneDriveIcon}
              className="dropdown-menu-icons"
              width="15"
              height="15"
              alt="OneDrive"
            />{" "}
            Continue with OneDrive
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
