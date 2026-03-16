
import Profile from "./Profile.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminUsers from "./AdminUsers.jsx";
import ChatPage from "./ChatPage";
import GamePage from "./GamePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import TermsOfService from "./TermsOfService.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Landing from "./pages/LandingPage/index.jsx"
import Login from "./pages/Auth/Login/index.jsx";
import SignUp from "./pages/Auth/register/index.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  const { token } = useAuth();
  const checkAuth = () => !!localStorage.getItem("token");
   const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
   <GoogleOAuthProvider clientId={googleId}>
      <div>
        <Routes>
          <Route path="/" element={<Landing />}/> 
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat"
            element={
              localStorage.getItem("token") ? (
                <ChatPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/game"
            element={
              localStorage.getItem("token") ? (
                <GamePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
