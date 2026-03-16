import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/user/profile");
      setUserData(response.data.user);
      setSessionError(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If session expired, show message but don't logout automatically
      if (error.response?.status === 401) {
        setSessionError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Manual logout function - ONLY when user clicks button
  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Still remove token and redirect even if API fails
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  // Manual refresh session function
  const handleRefreshSession = () => {
    navigate("/"); // Go to login page to get new magic link
  };

  return (
    <div className="min-h-screen flex items-center justify-center" 
         style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #1a1f35 100%)' }}>
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-12 text-center max-w-md w-full mx-4">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gradient mb-4">Dashboard</h1>
        
        {sessionError ? (
          <>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
              <p className="text-yellow-400 mb-2">
                ⚠️ Your session has expired
              </p>
              <p className="text-gray-400 text-sm">
                Please login again to continue
              </p>
            </div>
            <button
              onClick={handleRefreshSession}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            {loading ? (
              <div className="flex justify-center my-4">
                <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <p className="text-gray-400 mb-4">
                Welcome{userData?.username ? `, ${userData.username}` : ''}!
              </p>
            )}
            
            <p className="text-gray-400 mb-8">You are securely logged in.</p>
            
            {/* Session info - just for information, not forcing logout */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 mb-6">
              <p className="text-xs text-indigo-400">
                🔐 Your session is active
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}