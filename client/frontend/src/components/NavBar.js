import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="bg-red-900 text-white p-4 shadow-md">
            <Link to='/' style={{ margin: '10px' }}>Home</Link>
            <Link to='/about' style={{ margin: '10px' }}>About</Link>
            <Link to='/login' style={{ margin: '10px' }}>Login</Link>
            <Link to='/signup' style={{ margin: '10px' }}>SignUp</Link>
        </nav>
    )
}

export default NavBar
