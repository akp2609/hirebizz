import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NotificationBell from '../ui/Notification';
import { useUser } from '../../context/UserContext';


function NavBar() {
    const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
    const { loadingUser } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const defaultProfilePic = "https://www.w3schools.com/howto/img_avatar.png";
    const navigate = useNavigate();

    if (loading) return null;

    if (loadingUser) return null;

    return (
        <nav className="bg-blue-700 text-white px-7 py-6 shadow-md flex justify-between relative z-50">

            <div className="flex items-center space-x-3">
                <Link to='/'>
                    <img
                        src="https://res.cloudinary.com/dmcnrrfxo/image/upload/v1754482525/hirebizz-logo_pjmqr9.png"
                        alt="HireBizz Logo"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </Link>
                <Link to='/' className="text-2xl font-bold" >HireBizz</Link>

            </div>
            <div className='space-x-4 flex'>
                {isAuthenticated && user ? (
                    <div
                        className="inline-flex items-center cursor-pointer gap-4"
                        onMouseEnter={() => setIsOpen(true)}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <NotificationBell userId={user._id} />
                        <Link to='/' className='hover:text-cyan-300 hover:underline text-xl'>Home</Link>
                        <Link to='/about' className='hover:underline hover:text-cyan-300 text-xl'>About</Link>
                        <Link >
                            <img
                                src={user.picture || defaultProfilePic}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </Link>
                        <svg className="w-4 h-4 mt-1 text-white ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>

                        {isOpen && (
                            <div className="absolute right-0 top-16 w-48 bg-white rounded-xl shadow-2xl py-3 z-50 animate-fade-in">
                                <p className="text-blue-700 font-semibold text-center mb-2">{user.name || "User"}</p>
                                <hr className="border-blue-100" />
                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                {user.role !== 'employer' && (
                                    <>
                                        <Link to="/saved-jobs" className="dropdown-item">Saved Jobs</Link>
                                    </>
                                )}
                                {user.role === 'candidate' && (
                                    <>
                                        <Link to="/my-applications" className="dropdown-item">My Applications</Link>
                                    </>
                                )}
                                <Link to="/setting" className="dropdown-item">Setting</Link>
                                <Link to="/chats" className="dropdown-item">Chats</Link>
                                <button
                                    onClick={logout}
                                    className="dropdown-item text-red-600 hover:text-red-700"
                                >
                                    Logout
                                </button>
                            </div>
                        )}

                    </div>
                ) : (
                    <Link to='/login' className='hover:underline hover:text-cyan-300 text-xl'>Login | SignUp</Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
