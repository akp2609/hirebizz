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
    <nav className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl border-b border-blue-500/20 backdrop-blur-sm z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="group flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
              <img
                src="https://res.cloudinary.com/dmcnrrfxo/image/upload/v1754482525/hirebizz-logo_pjmqr9.png"
                alt="HireBizz Logo"
                className="relative w-12 h-12 rounded-2xl object-cover ring-2 ring-white/30 group-hover:ring-white/60 transition-all duration-500 shadow-xl group-hover:shadow-2xl transform group-hover:scale-105"
              />
            </div>
            <div className="relative">
              <h1 className="text-3xl font-black bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-white group-hover:to-indigo-200 transition-all duration-500 tracking-tight">
                HireBizz
              </h1>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-500"></div>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex items-center space-x-8">
          {isAuthenticated && user ? (
            <div
              className="inline-flex items-center cursor-pointer gap-6 relative"
              onMouseEnter={() => setIsOpen(true)}
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Notification Bell */}
              <div className="relative group">
                <NotificationBell userId={user._id} />
              </div>

              {/* Navigation Links */}
              <Link 
                to="/" 
                className="relative group px-4 py-2.5 rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/20 group-hover:to-blue-400/20 transition-all duration-300 rounded-2xl"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </span>
              </Link>
              
              <Link 
                to="/about" 
                className="relative group px-4 py-2.5 rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/20 group-hover:to-blue-400/20 transition-all duration-300 rounded-2xl"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>About</span>
                </span>
              </Link>

              {/* Profile Dropdown Section */}
              <div className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={user.picture || defaultProfilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/40 group-hover:ring-white/70 transition-all duration-300 shadow-lg"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-white/90">{user.name || "User"}</p>
                  <p className="text-xs text-blue-200 capitalize">{user.role || "Member"}</p>
                </div>
                
                <svg 
                  className={`w-5 h-5 text-white/80 transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Enhanced Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 top-20 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100/50 overflow-hidden animate-fade-in z-50">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                  
                  {/* User Info Header */}
                  <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.picture || defaultProfilePic}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200"
                      />
                      <div>
                        <p className="text-blue-900 font-bold text-base truncate max-w-32">{user.name || "User"}</p>
                        <p className="text-blue-600 text-sm capitalize font-medium">{user.role || "Member"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-3">
                    <Link to="/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium group">
                      <svg className="w-5 h-5 mr-4 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </Link>
                    
                    {user.role !== 'employer' && (
                      <Link to="/saved-jobs" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium group">
                        <svg className="w-5 h-5 mr-4 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Saved Jobs
                      </Link>
                    )}
                    
                    {user.role === 'candidate' && (
                      <Link to="/my-applications" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium group">
                        <svg className="w-5 h-5 mr-4 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        My Applications
                      </Link>
                    )}
                    
                    <Link to="/setting" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium group">
                      <svg className="w-5 h-5 mr-4 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Account Settings
                    </Link>
                    
                    <Link to="/chats" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium group">
                      <svg className="w-5 h-5 mr-4 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Messages
                    </Link>
                  </div>
                  
                  {/* Logout Section */}
                  <div className="border-t border-blue-100/50 pt-3">
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-6 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 font-medium group"
                    >
                      <svg className="w-5 h-5 mr-4 text-red-500 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="group relative px-8 py-3.5 rounded-2xl bg-gradient-to-r from-white/10 via-white/15 to-white/10 hover:from-white/20 hover:via-white/25 hover:to-white/20 border border-white/30 hover:border-white/50 transition-all duration-300 text-lg font-bold backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/20 group-hover:to-blue-400/20 transition-all duration-300"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Join HireBizz</span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;