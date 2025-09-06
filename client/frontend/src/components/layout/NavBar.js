import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NotificationBell from '../ui/Notification';
import { useUser } from '../../context/UserContext';

function NavBar() {
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
  const { loadingUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const defaultProfilePic = "https://www.w3schools.com/howto/img_avatar.png";
  const navigate = useNavigate();

  if (loading || loadingUser) return null;

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white px-6 py-4 shadow-lg border-b border-blue-500/20 backdrop-blur-sm flex justify-between items-center relative z-50">
      
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="group flex items-center space-x-3">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmcnrrfxo/image/upload/v1754482525/hirebizz-logo_pjmqr9.png"
              alt="HireBizz Logo"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300 shadow-md"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-white transition-all duration-300">
            HireBizz
          </span>
        </Link>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-6">
        {isAuthenticated && user ? (
          <div
            className="inline-flex items-center cursor-pointer gap-4 relative"
            onMouseEnter={() => setIsOpen(true)}
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Notifications */}
            <NotificationBell userId={user._id} />

            {/* Nav Links */}
            <Link 
              to="/" 
              className="relative group px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-lg font-medium"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/20 group-hover:to-blue-400/20 transition-all duration-300"></div>
            </Link>
            <Link 
              to="/about" 
              className="relative group px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-lg font-medium"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/20 group-hover:to-blue-400/20 transition-all duration-300"></div>
            </Link>

            {/* Profile Dropdown */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              <Link className="relative group">
                <img
                  src={user.picture || defaultProfilePic}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300 shadow-md"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </Link>
              <svg 
                className={`w-4 h-4 text-white/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {isOpen && (
              <div className="absolute right-0 top-16 w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-3 z-50 border border-blue-100/50 animate-fade-in">
                <div className="px-4 py-3 border-b border-blue-100/50">
                  <p className="text-blue-800 font-bold text-sm truncate">{user.name || "User"}</p>
                  <p className="text-blue-600/70 text-xs capitalize">{user.role || "Member"}</p>
                </div>
                
                <div className="py-2">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  
                  {user.role !== 'employer' && (
                    <Link to="/saved-jobs" className="dropdown-item">Saved Jobs</Link>
                  )}
                  
                  {user.role === 'candidate' && (
                    <Link to="/my-applications" className="dropdown-item">My Applications</Link>
                  )}
                  
                  <Link to="/setting" className="dropdown-item">Settings</Link>
                  <Link to="/chats" className="dropdown-item">Chats</Link>
                </div>
                
                <div className="border-t border-blue-100/50 pt-2">
                  <button
                    onClick={logout}
                    className="dropdown-item text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link 
            to="/login" 
            className="relative group px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 text-lg font-semibold backdrop-blur-sm"
          >
            <span className="relative z-10">Login | SignUp</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/10 group-hover:to-blue-400/10 transition-all duration-300"></div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
