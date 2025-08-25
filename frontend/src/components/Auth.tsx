import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";

interface AuthProps {
  onSuccess: (token: string) => void;
  onCancel: () => void;
}

// Safe redirect URI for Chrome extension
const redirectUri =
  typeof chrome !== "undefined" && chrome.identity
    ? chrome.identity.getRedirectURL()
    : window.location.origin;

// MSAL config for Microsoft/OneDrive
const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID!,
    authority: "https://login.microsoftonline.com/common",
    redirectUri,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

const Auth: React.FC<AuthProps> = ({ onSuccess, onCancel }) => {
  // 🔹 Google login
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!googleClientId) throw new Error("VITE_GOOGLE_CLIENT_ID is missing");

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const providerToken = credentialResponse.credential;
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sso/google?provider_token=${providerToken}`
      );
      const jwt = res.data.access_token;
      chrome.storage.local.set({ token: jwt });
      onSuccess(jwt);
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  // 🔹 Microsoft / OneDrive login
  const handleMicrosoftLogin = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({ scopes: ["User.Read"] });
      const providerToken = loginResponse.accessToken;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sso/microsoft?provider_token=${providerToken}`
      );
      const jwt = res.data.access_token;
      chrome.storage.local.set({ token: jwt });
      onSuccess(jwt);
    } catch (err) {
      console.error("Microsoft/OneDrive login failed:", err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <div className="auth-container">
        <h2>Login</h2>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google login failed")}
        />

        {/* Microsoft Login */}
        <button
          onClick={handleMicrosoftLogin}
          className="auth-btn bg-blue-600 text-white mt-2"
        >
          Login with Microsoft
        </button>

        {/* OneDrive Login (same flow as Microsoft) */}
        <button
          onClick={handleMicrosoftLogin}
          className="auth-btn bg-green-600 text-white mt-2"
        >
          Login with OneDrive
        </button>

        {/* Cancel button */}
        <button
          onClick={onCancel}
          className="auth-btn bg-gray-500 text-white mt-4"
        >
          Cancel
        </button>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
