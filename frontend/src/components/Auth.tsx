import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { authProviders } from "../utils/data";

interface AuthProps {
  onSuccess: (token: string) => void;
  onCancel: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (providerId: string) => {
    const mode = isLogin ? "login" : "register";
    const authUrl = `https://your-backend.com/auth/${providerId}?mode=${mode}`;

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
          {authProviders.map(({ id, name, color, Icon, imgSrc }) => (
            <button
              key={id}
              onClick={() => handleAuth(id)}
              className="auth-btn"
              style={{ backgroundColor: color, color: "#fff" }}
            >
              {Icon && <Icon />}
              {imgSrc && (
                <img
                  src={imgSrc}
                  width={15}
                  height={15}
                  style={{ marginRight: 5 }}
                />
              )}
              Continue with {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;
