import React from 'react'
import { Link } from 'react-router-dom'


function NavBar() {
    return (
        <nav className="bg-blue-600 text-white px-7 py-6  shadow-md flex justify-between">
            <h1 className='text-2xl font-bold'>JobTracker</h1>
            <div className='space-x-4'>
                <Link to='/' className='hover:text-cyan-300 hover:underline text-xl'>Home</Link>
                <Link to='/about' className='hover:underline hover:text-cyan-300 text-xl'>About</Link>
                <Link to='/login' className='hover:underline hover:text-cyan-300 text-xl'>Login</Link>
                <Link to='/signup' className='hover:underline hover:text-cyan-300 text-xl'>SignUp</Link>
            </div>
        </nav>

    )
}

export default NavBar
