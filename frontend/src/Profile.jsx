import { API_BASE_URL } from "./config";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
//imported components for Profile
import Loading from "./Loading";
import ProfileHeader from "./components/Profile/ProfileHeader";
// import EditProfileButton from './components/Profile/EditProfileButton'
// import useLogout from './hooks/Profile/useLogout'
// import useAvatarUpload from './hooks/Profile/useAvatarUpload'
import SearchBar from "./components/Profile/SearchBar";
import TabButtons from "./components/Profile/TabButtons";
// import FriendsView from "./components/Profile/FriendsView";
// import PendingView from "./components/Profile/PendingView";
import EditView   from  "./components/Profile/EditView";
// import Statistics from "./components/Profile/Statistics";
import { MdOutlineCancel } from "react-icons/md";
import AdminDashboard from "./AdminDashboard"

function Profile() {
  const urlme = `${API_BASE_URL}/users/me`;
  const urlup = `${API_BASE_URL}/users/update`;

  const [userData, setUserData] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [query, setQuery] = useState("");
  const [searchReqs, setSearchReqs] = useState([]);
  const [pendingReqs, setPendingReqs] = useState([]);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

const fetchStates = async (userId) => {
    const getToken = localStorage.getItem("token");
    const targetId = userId || userData?.id;
    if (!targetId) return;

    try {
      const resp = await fetch(`${API_BASE_URL}/users/${targetId}/stats`, {
        headers: { Authorization: "Bearer " + getToken }
      });
      if (resp.ok) {
        const data = await resp.json();
        setMatchData(data);
      }
    } catch (error) {
      console.error("Fetch Stats Error:", error);
    }
  };


  const fetchPending = async () => {
    const getToken = localStorage.getItem("token");
    try {
      const resp = await fetch(`${API_BASE_URL}/users/friends/pending`, {
        headers: { Authorization: "Bearer " + getToken },
      });
      if (resp.ok) {
        const data = await resp.json();
        setPendingReqs(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFriends = async () => {
    const getToken = localStorage.getItem("token");
    try {
      const resp = await fetch(`${API_BASE_URL}/users/friends/list`, {
        headers: { Authorization: "Bearer " + getToken },
      });
      if (resp.ok) {
        const data = await resp.json();
        setFriends(data);
      }
    } catch (error) {
      console.error(error);
    }
  };






  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    const getToken = localStorage.getItem("token");

    try {
      const resp = await fetch(urlup, {
        headers: { Authorization: "Bearer " + getToken },
        method: "PATCH",
        body: formData,
      });
      if (resp.ok) {
        const data = await resp.json();
        setUserData(data.user || data);
        alert("Avatar updated!");
      }
    } catch (err) {
      console.error(err);
    }
  };



  const startChatWith = async (friendId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
         `${API_BASE_URL}/chat/conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ otherUserId: friendId }),
        },
      );
      if (res.ok) {
        const conversation = await res.json();
        window.location.href = `/chat?conv=${conversation.id}`;
      }
    } catch (err) {
      console.error(err);
    }
  };



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
    localStorage.removeItem("token");
      navigate("/");
  };

  const handleSearch = async () => {
    const getToken = localStorage.getItem("token");
    if (query.length < 2) return;

    try {
      const data = await fetch(`${API_BASE_URL}/users/search?q=${query}`, {
        headers: { Authorization: "Bearer " + getToken },
      });
      const result = await data.json();
      setSearchReqs(result.data || result);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSendRequest = async (targetId) => {
    const getToken = localStorage.getItem("token");
    try {
      const resp = await fetch(
        `${API_BASE_URL}/users/friends/request/${targetId}`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + getToken },
        },
      );

      if (resp.ok) {
        alert("Friend request sent!");
        setSearchReqs([]);
        setQuery("");
      } else {
        const data = await resp.json();
        alert(data.error || "Failed to send request");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send friend request");
    }
  };

  const handleAccept = async (reqId) => {
   
    const getToken = localStorage.getItem("token");
    try {
      const data = await fetch(`${API_BASE_URL}/users/accept/${reqId}`, {
        headers: { Authorization: "Bearer " + getToken },
        method: "PATCH",
      });
      if (data.ok) {
        setPendingReqs((prev) => prev.filter((r) => r.id !== reqId));
        fetchFriends();
      }
    } catch (err) {
      console.error(err);
    }
  };

useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const resp = await fetch(urlme, {
          headers: { Authorization: "Bearer " + getToken },
        });
        if (resp.ok) {
          const data = await resp.json();
          setUserData(data);
          setUpdatedData({ ...data, password: "" });
          fetchStates(data.id); 
        } else if (resp.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Fetch Profile Error:", err);
        setError("Network error.");
      }
    };

    fetchProfile();
    fetchPending();
    fetchFriends();
    if (userData?.id) {
      fetchStates(userData.id);
    }
  }, [navigate]);
      useEffect(() => {
      const token = localStorage.getItem("token");
      socket.auth = { token };
      if (socket.connected) {
        socket.disconnect();
      }
      socket.connect();
      socket.on("friend:request_received", (data) => {
        // console.log("📬 New friend request from:", data);
        fetchPending();
      });

      socket.on("friend:request_accepted", (data) => {
        // console.log("✅ Friend request accepted:", data);
        fetchFriends();
      });

      socket.on("user:online", ({ userId }) => {
        setFriends(prev => prev.map(f => 
          f.id === userId ? { ...f, isOnline: true } : f
        ));
      });

      socket.on("user:offline", ({ userId }) => {
        setFriends(prev => prev.map(f => 
          f.id === userId ? { ...f, isOnline: false } : f
        ));
      });

      return () => {
        socket.off("friend:request_received");
        socket.off("friend:request_accepted");
        socket.off("user:online");
        socket.off("user:offline");
      };
    }, []);

if (!userData) return <Loading />;

  //Save Button
const handleSave = async () => {
  const getToken = localStorage.getItem("token");

  let dataToSend = {
    username: updatedData.username,
    email: updatedData.email,
  };

  if (updatedData.password && updatedData.password.trim() !== "") {
    if (
      !updatedData.currentPassword ||
      updatedData.currentPassword.trim() === ""
    ) {
      alert("Please enter your current password to change your password");
      return;
    }
    dataToSend.password = updatedData.password;
    dataToSend.currentPassword = updatedData.currentPassword;
  }

  try {
    const resp = await fetch(urlup, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + getToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (resp.ok) {
      const data = await resp.json();
      const userObj = data.user || data;
      setUserData(userObj);
      setUpdatedData({ ...userObj, password: "", currentPassword: "" });
      setEdit(false);
      alert("Profile updated successfully!");
    } else {
      const errorData = await resp.json();
      alert(errorData.error || "Failed to update profile");
    }
  } catch (err) {
    console.error("Update error:", err);
    alert("Network error. Please try again.");
  }
};

  // Edit Profile Page:
  if (activeView === "Edit") {
    return (
      <EditView
        Avatar={`https://localhost:8443${userData.avatar}`}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
        onSave={handleSave}
        onAvatarChange={handleAvatarChange}
        onBack={() => setActiveView("profile")}
      />
    );
  }

    // const Navigate = useNavigate();
    return (
        <div className="min-h-screen w-full bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)]">
          {isLoading && <Loading />}
          
          {/* Header */}
          <ProfileHeader
            onBack={() => navigate(-1)}
            isAdmin={userData.role === "admin"}
            handlleLogout={handleLogout}
            userAvatar={`https://localhost:8443${userData.avatar}`}
          />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-[40px] px-[30px] md:px-[50px] lg:px-[50px] py-[40px] max-w-7xl mx-auto w-full">
            
            {/* LEFT SIDEBAR - Profile Info (Sticky on lg screens) */}
            <div className="flex flex-col gap-[30px] lg:sticky lg:top-[100px] h-fit">
              
              {/* Profile Image Section */}
              <div className="flex flex-col items-center gap-[20px]">
                <div className="relative">
                  <div className="flex items-center justify-center relative border-[2px] border-[#B6410F] h-[150px] w-[150px] lg:h-[180px] lg:w-[180px] rounded-full overflow-hidden">
                    <img 
                      src={`https://localhost:8443${userData.avatar}`}
                      alt="Profile picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Edit button */}
                  <button 
                    onClick={() => setActiveView("Edit")}
                    className="cursor-pointer absolute bottom-0 right-0 bg-[#B6410F] hover:bg-[#D4A574] rounded-full w-[50px] h-[50px] flex items-center justify-center border-[2px] border-[#3E2411] transition-all active:scale-95"
                  >
                    <FaPen className="text-white text-xl" />
                  </button>
                </div>

                {/* Username */}
                <div className="text-center">
                  <div className="text-white text-[28px] lg:text-[32px] font-bold tracking-[1px]">
                    {userData.username}
                  </div>
                  <div className="text-[#B0B0B0] text-[14px] lg:text-[16px] mt-[8px]">
                    {userData.email}
                  </div>
                </div>
              </div>
              {userData.role === "admin" 
                  && <AdminDashboard />}
              {/* Search Bar */}
              {userData.role !== "admin" && (
              <div className="w-full">
                <SearchBar 
                  query={query}
                  setQuery={setQuery}
                  handleSearch={handleSearch}
                  searchReqs={searchReqs}
                />
              </div>
              )}
              {/* Search Results - Mobile Only */}
              {searchReqs.length > 0 && (
                <div className="lg:hidden w-full bg-white/10 rounded-[15px] p-[15px]">
                  <div className="flex justify-between items-center mb-[15px]">
                    <h3 className="text-white text-[16px] font-semibold">Search Results ({searchReqs.length})</h3>
                    <button 
                      onClick={() => {
                        setSearchReqs([]);
                        setQuery("");
                      }}
                      className="text-white hover:text-[#B6410F] transition-colors"
                    >
                      <MdOutlineCancel size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-[10px]">
                    {searchReqs.map((user) => (
                      <div
                        key={user.id}
                        className="flex flex-col items-center gap-[8px] p-[10px] bg-[#1F2623] border border-[#FFFFFF1A] rounded-[10px]"
                      >
                        <img
                          src={`https://localhost:8443${user.avatar}`}
                          alt={user.username}
                          className="w-[40px] h-[40px] rounded-full object-cover border-2 border-[#B6410F]"
                        />
                        <p className="text-white text-[12px] font-semibold truncate">{user.username}</p>
                        <button 
                          onClick={() => handleSendRequest(user.id)}
                          className="w-full px-[8px] py-[4px] bg-[#B6410F] text-white font-medium rounded-[6px] text-xs hover:bg-[#D4A574]"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT CONTENT - Tabs & Data */}
            <div className="flex flex-col gap-[30px]">
              
              {/* Tab Buttons - Always at top on lg */}
              {userData.role !== "admin" &&<div className="w-full">
                <TabButtons onSelectView={setActiveView} />
              </div>}
              
              <div className="flex-1 w-full overflow-y-auto">
                {activeView === "friends" && (
                  <div className="flex flex-col gap-[15px]">
                    <h2 className="text-white text-[24px] font-semibold">Friends ({friends.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px]">
                      {friends.map((friend) => (
                        <div 
                          key={friend.id} 
                          className="flex items-center justify-between p-[15px] bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px] hover:border-[#B6410F] transition-colors"
                        >
                          <div className="flex items-center gap-[12px]">
                            <img 
                              src={`https://localhost:8443${friend.avatar}`}
                              alt={friend.username}
                              className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#B6410F]"
                            /> 
                            <div>
                              <p className="text-white font-semibold">{friend.username}</p>
                              <p className="text-[#B0B0B0] text-sm">{friend.email}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => startChatWith(friend.id)}
                            className="px-[12px] py-[8px] bg-[#B6410F] text-white rounded-[8px] hover:bg-[#D4A574] transition-colors text-sm font-semibold"
                          >
                            Chat
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeView === "pending" && (
                  <div className="flex flex-col gap-[15px]">
                    <h2 className="text-white text-[24px] font-semibold">Pending Requests ({pendingReqs.length})</h2>
                    {pendingReqs.length === 0 ? (
                      <p className="text-[#B0B0B0]">No pending requests</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px]">
                        {pendingReqs.map((req) => (
                          <div 
                            key={req.id}
                            className="flex items-center justify-between p-[15px] bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px]"
                          >
                            <div className="flex items-center gap-[12px]">
                              <img 
                                src={`https://localhost:8443${req.requester?.avatar || req.avatar}`}
                                alt={req.requester?.username || req.username}
                                className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#B6410F]"
                              />
                              <div>
                                <p className="text-white font-semibold">{req.requester?.username || req.username}</p>
                                <p className="text-[#B0B0B0] text-sm">{req.requester?.email || req.email}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleAccept(req.id)}
                              className="px-[12px] py-[8px] bg-green-600 text-white rounded-[8px] hover:bg-green-700 transition-colors text-sm font-semibold"
                            >
                              Accept
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeView === "statistics" && (
                  <div className="flex flex-col gap-[15px]">
                    <h2 className="text-white text-[24px] font-semibold">Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[15px]">
                      <div className="flex flex-col items-center p-[20px] bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px]">
                        <p className="text-[#B0B0B0] text-sm mb-[10px]">Total Wins</p>
                        <p className="text-white text-[32px] font-bold text-green-400">{matchData?.stats?.totalWins || 0}</p>
                      </div>
                      <div className="flex flex-col items-center p-[20px] bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px]">
                        <p className="text-[#B0B0B0] text-sm mb-[10px]">Total Losses</p>
                        <p className="text-white text-[32px] font-bold text-red-400">{matchData?.stats?.totalLosses || 0}</p>
                      </div>
                      <div className="flex flex-col items-center p-[20px] bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px]">
                        <p className="text-[#B0B0B0] text-sm mb-[10px]">Win Rate</p>
                        <p className="text-white text-[32px] font-bold">{matchData?.stats?.winRate || 0}</p>
                      </div>
                    </div>
                    {/* <h2 className="text-white text-[24px] font-semibold">Match History </h2> */}
                  </div>
                )}

                {activeView === "profile" && (
                  <div className="flex flex-col gap-[30px]">
                    {/* Search Results - Desktop */}
                    {searchReqs.length > 0 && (
                      <div className="hidden lg:block w-full">
                        <div className="flex justify-between items-center mb-[20px]">
                          <h3 className="text-white text-[20px] font-semibold">Search Results ({searchReqs.length})</h3>
                          <button 
                            onClick={() => {
                              setSearchReqs([]);
                              setQuery("");
                            }}
                            className="text-white hover:text-[#B6410F] transition-colors"
                          >
                            <MdOutlineCancel size={24} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[15px]">
                          {searchReqs.map((user) => (
                            <div
                              key={user.id}
                              className="flex flex-col items-center gap-[10px] p-[15px] bg-[#1F2623] border border-[#FFFFFF1A] rounded-[12px] hover:border-[#B6410F] transition-colors"
                            >
                              <img
                                src={`https://localhost:8443${user.avatar}`}
                                alt={user.username}
                                className="w-[60px] h-[60px] rounded-full object-cover border-2 border-[#B6410F]"
                              />
                              <div className="text-center">
                                <p className="text-white text-[14px] font-semibold truncate">{user.username}</p>
                                <p className="text-[#B0B0B0] text-[12px] truncate">{user.email}</p>
                              </div>
                              <button 
                                onClick={() => handleSendRequest(user.id)}
                                className="w-full px-[10px] py-[6px] bg-gradient-to-r from-[#B6410F] to-[#D4A574] text-white font-medium rounded-[6px] hover:from-[#D4A574] hover:to-[#E5C78A] transition-colors text-xs"
                              >
                                Add Friend
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    );

}

export default Profile;
