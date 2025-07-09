import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

interface AuthProps {
  onSuccess: (token: string) => void;
  onCancel: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register

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
            onSuccess(token); // Notify parent
          });
        }
      }
    );
  };

  return (
    <div className="w-[320px] p-6 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-5 font-sans">
      <h2 className="text-2xl font-semibold text-gray-800">
        {isLogin ? "Welcome Back!" : "Create Your Account"}
      </h2>

      <button
        onClick={() => handleAuth("google")}
        className="flex items-center justify-center w-full gap-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        <FaGoogle size={18} />
        {isLogin ? "Continue with Google" : "Sign up with Google"}
      </button>

      <button
        onClick={() => handleAuth("github")}
        className="flex items-center justify-center w-full gap-2 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
      >
        <FaGithub size={18} />
        {isLogin ? "Continue with GitHub" : "Sign up with GitHub"}
      </button>

      <p className="text-sm text-gray-600 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline font-medium"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>

      <button
        onClick={onCancel}
        className="text-sm text-gray-500 hover:underline"
      >
        Cancel and go back
      </button>
    </div>
  );
};

export default Auth;
