import React from 'react'

function Footer() {
    return (
        <footer className='bg-slate-900 p-6'>
            <p className='text-white text-sm'>© {new Date().getFullYear()} HireBizz. All rights reserved.</p>
        </footer>
    )
}

export default Footer
