import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import Logo from "./components/UI/Logo";
import DashboardDropdown from "./components/Profile/DashboardDropdown.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { socket } from "./socket";
import Loading from "./Loading";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({});

  const handleLogout = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE_URL}/users/logout`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });
    } catch (err) {
      console.error("HTTP logout failed", err);
      setIsLoading(false);
    }
    if (socket) {
      socket.disconnect();
    }
    logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Prevent admin users from accessing the dashboard
          if (data.role === "admin") {
            navigate("/profile");
            return;
          }
          setUserData({
            avatar: data.avatar || "https://via.placeholder.com/50",
            username: data.username || "User",
            role: data.role,
          });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)] text-white overflow-x-hidden relative">
      {isLoading && <Loading />}

      {/* Top Right Dropdown */}
      <div className="absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8">
        <div className="relative">
          <button 
            type="button"
            className="relative cursor-pointer border-[#FFFFFF4D] border-[2px] rounded-full w-[36px] h-[36px] md:w-[48px] md:h-[48px] lg:w-[56px] lg:h-[56px] ease-in-out overflow-hidden hover:scale-110 transition-transform"
            onClick={() => setIsDropdownOpen(prev => !prev)}
          >
            <img 
              src={userData.avatar}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {isDropdownOpen && (
            <DashboardDropdown 
              handleLogout={handleLogout}
            />
          )}
        </div>
      </div>

      {/* Logo at Top - Responsive */}
      <div className="flex justify-center pt-[20px] md:pt-[40px] lg:pt-[60px] px-[12px]">
        <div className="scale-50 md:scale-75 lg:scale-100 origin-top">
          <Logo variant="Landing" />
        </div>
      </div>

      {/* Main Content - Fully Responsive */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-[16px] py-[30px] md:py-[60px] gap-[20px] md:gap-[30px]">
        
        {/* Play Now Button */}
        <button 
          onClick={() => navigate("/game")}
          className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-[#B6410F] to-[#D4A574] hover:from-[#D4A574] hover:to-[#E5C78A] active:scale-95 rounded-lg md:rounded-xl text-base md:text-lg font-bold text-white shadow-lg transition-all duration-200"
        >
          Play Now
        </button>
      </main>
    </div>
  );
}