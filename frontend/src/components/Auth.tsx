// src/components/Auth.tsx
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

interface AuthProps {
  onSuccess: (token: string) => void;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID!;
const msClientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID!;

// Optional: give your redirect a stable path so you can whitelist exactly in the provider console.
const getRedirectUri = () => chrome.identity.getRedirectURL("auth/callback");

const randomState = () => Math.random().toString(36).slice(2);

const buildAuthUrl = (provider: "google" | "microsoft" | "onedrive") => {
  const redirectUri = getRedirectUri();
  const state = randomState();

  if (provider === "google") {
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", googleClientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "openid email profile");
    url.searchParams.set("include_granted_scopes", "true");
    url.searchParams.set("prompt", "select_account");
    url.searchParams.set("state", state);
    return url.toString();
  }

  // Microsoft & OneDrive use the same authorize endpoint; scope differs if you also want OneDrive.
  const url = new URL(
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
  );
  url.searchParams.set("client_id", msClientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("response_mode", "query");
  url.searchParams.set(
    "scope",
    provider === "onedrive"
      ? // oneDrive perms + sign-in scopes
        "openid offline_access User.Read Files.Read"
      : "openid offline_access email profile User.Read"
  );
  url.searchParams.set("prompt", "select_account");
  url.searchParams.set("state", state);
  return url.toString();
};

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const oneDriveIcon = chrome.runtime?.getURL("onedrive.svg") ?? "/onedrive.svg";

  const runAuth = (provider: "google" | "microsoft" | "onedrive") => {
    const authUrl = buildAuthUrl(provider);

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      async (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error("Auth failed:", chrome.runtime.lastError);
          alert(`Login failed for ${provider}`);
          return;
        }

        try {
          const url = new URL(redirectUrl);
          const code = url.searchParams.get("code");
          if (!code) {
            const error = url.searchParams.get("error") || "No code found";
            throw new Error(error);
          }

          const redirectUri = getRedirectUri();

          // Exchange code -> JWT from your backend (single /sso/{provider} route)
          const resp = await fetch(
            `${backendUrl}/sso/${provider}?code=${encodeURIComponent(
              code
            )}&redirect_uri=${encodeURIComponent(redirectUri)}`,
            { method: "POST" }
          );

          if (!resp.ok) {
            const text = await resp.text();
            throw new Error(
              `Backend exchange failed (${resp.status}): ${text}`
            );
          }

          const data = await resp.json();
          const jwt = data.access_token;
          if (!jwt) throw new Error("No access_token in backend response");

          await chrome.storage.local.set({ token: jwt });
          onSuccess(jwt);
        } catch (e: any) {
          console.error(e);
          alert(`${provider} login failed: ${e.message || e}`);
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
          <button
            onClick={() => runAuth("google")}
            className="auth-btn google"
          >
            <FaGoogle /> Continue with Google
          </button>

          <button
            onClick={() => runAuth("microsoft")}
            className="auth-btn microsoft"
          >
            <FaMicrosoft /> Continue with Microsoft
          </button>

          <button
            onClick={() => runAuth("onedrive")}
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
