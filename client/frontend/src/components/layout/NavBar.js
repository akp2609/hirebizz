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
                <h1 className="text-2xl font-bold" >HireBizz</h1>
                </Link>
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
                        <Link to="/profile">
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
                            <div className="absolute right-0 top-16 w-40 bg-white border rounded-md shadow-lg py-2 z-50 items-center mt-2">
                                <p className='text-black flex justify-center items-center'>{user.name || "User"}</p>
                                <hr className='mt-2 border-gray-300' />
                                <Link to="/profile" className='text-black flex justify-center items-center mt-2 hover:bg-gray-100'>Profile</Link>
                                {user.role !== 'employer' && (
                                    <>
                                        <hr className='mt-2 border-gray-300' />
                                        <Link to="/saved-jobs" className='text-black flex justify-center items-center mt-2 hover:bg-gray-100'>Saved Jobs</Link>
                                    </>
                                )}
                                {user.role === 'candidate' && (
                                    <>
                                        <hr className='mt-2 border-gray-300' />
                                        <Link to="/my-applications" className='text-black flex justify-center items-center mt-2 hover:bg-gray-100'>My Applications</Link>
                                    </>
                                )}
                                <hr className='mt-2 border-gray-300' />
                                <Link to='/setting' className='text-black flex justify-center items-center mt-2 hover:bg-gray-100'>Setting</Link>
                                <hr className='mt-2 border-gray-300' />
                                <Link to='/chats' className='text-black flex justify-center items-center mt-2 hover:bg-gray-100'>Chats</Link>
                                <hr className='mt-2 border-gray-300' />
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 hover:bg-gray-100 text-black flex justify-center items-center"
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
