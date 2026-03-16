import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for error in URL (from LoginSuccess)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorType = params.get("error");
    
    if (errorType === "expired_link") {
      setError("⏰ Your magic link has expired! Links are valid for only 1 minute for security. Please request a new one.");
      // Clear the error from URL after displaying
      window.history.replaceState({}, document.title, "/");
    } else if (errorType === "invalid_link") {
      setError("❌ Invalid magic link. Please request a new one.");
      window.history.replaceState({}, document.title, "/");
    }
  }, [location]);

  const createAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await axios.post("http://localhost:3597/api/user/login", {
        email,
      });
      
      // Get expiry time from response or use default
      const expiryMinutes = 1; // Your token expires in 1 minute
      
      setSuccessMessage(`✅ Login link sent successfully! Check your email.`);
      setIsSent(true);
      localStorage.setItem("userToken", res.data.token);
      console.log("Token saved:", res.data.token);
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      setError(`❌ ${errorMsg}`);
      setIsSent(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0f1e 0%, #1a1f35 50%, #0d1a2b 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent"></div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-indigo-500/5 animate-float"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center m-4 animate-fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-glow mb-4 animate-scale-in">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            MagicLink
          </h1>
          <p className="text-gray-400">Passwordless authentication made simple</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 animate-scale-in">
          {!isSent ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2 text-white">Welcome Back</h2>
                <p className="text-gray-400 text-sm">
                  Enter your email to receive a magic login link
                </p>
              </div>

              <form onSubmit={createAuth} className="space-y-6">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="email"
                      id="email"
                      placeholder="magic@gmail.com"
                      className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-gray-500 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 animate-fade-up">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 animate-fade-up">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-400 text-sm">{successMessage}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Magic Link
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </span>
                  {!isLoading && (
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-500/20 flex items-center justify-center animate-pulse-glow">
                <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">Check Your Inbox</h3>
              <p className="text-gray-400 mb-4">
                We've sent a magic link to <span className="text-indigo-400 font-medium">{email}</span>
              </p>
              
              {/* Countdown Timer for 1 minute */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-400">
                    <span className="text-indigo-400 font-semibold">⏰ Valid for only 1 minute</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  For security, this link will expire at {new Date(Date.now() + 60 * 1000).toLocaleTimeString()}
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-6">
                <p className="text-xs text-yellow-400">
                  ⚠️ If you don't click the link within 1 minute, you'll need to request a new one.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsSent(false);
                  setEmail("");
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 m-4 animate-fade-up">
          {[
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "No Passwords" },
            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", text: "Secure" },
            { icon: "M13 7l5 5m0 0l-5 5m5-5H6", text: "1-Click Login" },
          ].map((feature, i) => (
            <div
              key={i}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 mb-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <p className="text-xs text-gray-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}