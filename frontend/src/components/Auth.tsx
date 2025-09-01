import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

interface AuthProps {
  onSuccess: (token: string) => void;
  onCancel: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [authConfig, setAuthConfig] = useState<{
    google_auth_url: string;
    microsoft_auth_url: string;
    onedrive_auth_url: string;
  } | null>(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/auth/config`)
      .then((res) => res.json())
      .then((data) => setAuthConfig(data))
      .catch((err) => console.error("Failed to load auth config:", err));
  }, []);

  if (!authConfig) return <div>Loading...</div>;

  const authProviders = [
    {
      id: "google",
      name: "Google",
      color: "#DB4437",
      Icon: FaGoogle,
      authUrl: authConfig.google_auth_url,
    },
    {
      id: "microsoft",
      name: "Microsoft",
      color: "#2F2F2F",
      Icon: FaMicrosoft,
      authUrl: authConfig.microsoft_auth_url,
    },
    {
      id: "onedrive",
      name: "OneDrive",
      color: "#0078D4",
      imgSrc: chrome.runtime?.getURL("onedrive.svg") ?? "/onedrive.svg",
      authUrl: authConfig.onedrive_auth_url,
    },
  ];

  const handleAuth = (providerId: string, authUrl: string) => {
    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      async (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error("Auth failed:", chrome.runtime.lastError);
          return;
        }

        const urlParams = new URL(redirectUrl).hash
          ? new URLSearchParams(new URL(redirectUrl).hash.substring(1)) // Microsoft & OneDrive (#access_token=...)
          : new URL(redirectUrl).searchParams; // Google (?id_token=...)

        const providerToken =
          urlParams.get("id_token") || urlParams.get("access_token");

        if (!providerToken) {
          console.error("No provider token found");
          return;
        }

        const res = await fetch(`${BACKEND_URL}/sso/${providerId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider_token: providerToken }),
        });

        if (!res.ok) {
          console.error("Backend SSO failed:", await res.text());
          return;
        }

        const data = await res.json();
        const jwt = data.access_token;

        chrome.storage.local.set({ token: jwt }, () => onSuccess(jwt));
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
          {authProviders.map(({ id, name, color, Icon, imgSrc, authUrl }) => (
            <button
              key={id}
              onClick={() => handleAuth(id, authUrl)}
              className="auth-btn"
              style={{ backgroundColor: color, color: "#fff" }}
            >
              {Icon && <Icon style={{ marginRight: 6 }} />}
              {imgSrc && (
                <img
                  src={imgSrc}
                  width={16}
                  height={16}
                  style={{ marginRight: 6 }}
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
