import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


function NavBar() {

    const { isAuthenticated, user, logout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    const defaultProfilePic = "https://www.w3schools.com/howto/img_avatar.png";

    return (
        <nav className="bg-blue-700 text-white px-7 py-6  shadow-md flex justify-between">
            <h1 className='text-2xl font-bold'>HireBizz</h1>
            <div className='space-x-4 flex'>
                <Link to='/' className='hover:text-cyan-300 hover:underline text-xl'>Home</Link>
                <Link to='/about' className='hover:underline hover:text-cyan-300 text-xl'>About</Link>

                {user ? (
                    <div className=" inline-flex items-center cursor-pointer" onMouseEnter={() => setIsOpen(true)}
                        onClick={() => setIsOpen(!isOpen)}>
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <svg className="w-4 h-4 mt-1 text-white ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>


                        {isOpen && (
                            <div className="absolute right-0 overflow-hidden top-16 w-40 bg-white border rounded-md shadow-lg py-2 z-50 items-center">
                                <p className='text-black flex justify-center items-center'>{user.name}</p>
                                <hr style={{ border: '1px solid gray' }} className='mt-2' />
                                <Link to="/profile" className='text-black flex justify-center items-center mt-2 hover:bg-gray-100'>Profile</Link>
                                <hr style={{ border: '1px solid gray' }} className='mt-2' />
                                <Link to="/saved-jobs" className='text-black flex justify-center items-center mt-2 hover:bg-gray-100'>Saved Jobs</Link>
                                <hr style={{ border: '1px solid gray' }} className='mt-2' />
                                <Link to='/setting' className='text-black flex justify-center items-center mt-2 hover:bg-gray-100'>Setting</Link>
                                <hr style={{ border: '1px solid gray' }} className='mt-2' />

                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4  hover:bg-gray-100 text-black flex justify-center items-center"
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

    )
}

export default NavBar
