import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NotificationBell from "../ui/Notification";
import { useUser } from "../../context/UserContext";
import { Menu, X } from "lucide-react";

function NavBar() {
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
  const { loadingUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const defaultProfilePic = "https://www.w3schools.com/howto/img_avatar.png";
  const navigate = useNavigate();

  if (loading || loadingUser) return null;

  return (
    <nav className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl border-b border-blue-500/20 backdrop-blur-sm z-50">
      {/* Background strip */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <img
            src="https://res.cloudinary.com/dmcnrrfxo/image/upload/v1754482525/hirebizz-logo_pjmqr9.png"
            alt="HireBizz Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover ring-2 ring-white/30 group-hover:ring-white/60 transition-all duration-500 shadow-xl group-hover:shadow-2xl transform group-hover:scale-105"
          />
          <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-white group-hover:to-indigo-200 transition-all duration-500 tracking-tight">
            HireBizz
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && user ? (
            <>
              {/* Notifications */}
              <NotificationBell userId={user._id} />

              {/* Links */}
              <Link
                to="/"
                className="px-4 py-2 rounded-xl hover:bg-white/10 transition text-lg font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 rounded-xl hover:bg-white/10 transition text-lg font-medium"
              >
                About
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl hover:bg-white/10 transition"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <img
                    src={user.picture || defaultProfilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/40"
                  />
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {isOpen && (
                  <div className="absolute right-0 top-14 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-100/50 overflow-hidden animate-fade-in z-50">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-blue-100/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <p className="text-blue-900 font-bold text-sm truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-blue-600 text-xs capitalize">
                        {user.role || "Member"}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="py-2">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      {user.role !== "employer" && (
                        <Link to="/saved-jobs" className="dropdown-item">
                          Saved Jobs
                        </Link>
                      )}
                      {user.role === "candidate" && (
                        <Link to="/my-applications" className="dropdown-item">
                          My Applications
                        </Link>
                      )}
                      <Link to="/help" className="dropdown-item">
                        Help
                      </Link>
                      <Link to="/chats" className="dropdown-item">
                        Chats
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-blue-100/50">
                      <button
                        onClick={logout}
                        className="dropdown-item text-red-600 hover:text-red-700 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition text-lg font-semibold backdrop-blur-sm"
            >
              Join HireBizz
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="p-2 rounded-md hover:bg-white/10 transition"
          >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 border-t border-blue-500/20">
          {isAuthenticated && user ? (
            <>
              <NotificationBell userId={user._id} />

              <Link to="/" className="block nav-item">
                Home
              </Link>
              <Link to="/about" className="block nav-item">
                About
              </Link>
              <Link to="/profile" className="block nav-item">
                Profile
              </Link>
              <Link to="/chats" className="block nav-item">
                Chats
              </Link>
              <button
                onClick={logout}
                className="w-full text-left nav-item text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block nav-item text-center bg-white/10 border border-white/20 rounded-lg py-2"
            >
              Join HireBizz
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
