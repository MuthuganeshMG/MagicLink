import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const hasVerified = useRef(false);
  const [status, setStatus] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (hasVerified.current) return;
    
    const verifyToken = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        setStatus("error");
        setErrorMessage("No token provided");
        setTimeout(() => navigate("/?error=invalid_link"), 2000);
        return;
      }

      try {
        hasVerified.current = true;
        
        const response = await axios.get(
          `http://localhost:3597/api/user/verify?token=${token}`,
          { withCredentials: true } // Important for cookies
        );
        
        if (response.data.success) {
          // Store the session token (7 days)
          localStorage.setItem("authToken", response.data.token);
          setStatus("success");
          
          // Redirect to dashboard
          setTimeout(() => navigate("/dashboard"), 1000);
        }
        
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        
        const message = error.response?.data?.message || "Verification failed";
        setErrorMessage(message);
        
        if (error.response?.data?.expired) {
          setTimeout(() => navigate("/?error=expired_link"), 2000);
        } else {
          setTimeout(() => navigate("/?error=invalid_link"), 2000);
        }
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" 
         style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #1a1f35 100%)' }}>
      <div className="text-center max-w-md px-4">
        {status === "verifying" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-500/20 flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Verifying your magic link...</h2>
            <p className="text-gray-400">Please wait while we log you in</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Login Successful!</h2>
            <p className="text-gray-400">Redirecting to dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Error</h2>
            <p className="text-red-400 mb-4">{errorMessage}</p>
            <p className="text-gray-400">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
}