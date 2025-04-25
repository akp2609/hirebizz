import React from 'react'
import signupImage from '../assets/signupImage.png'

function SignUp() {
    return (
        <div className='h-full w-full flex justify-center items-center px-4 bg-gray-900/10'>
            
            <div className='relative w-full sm:w-[60%] md:w-[85%] lg:w-[90%] xl:w-[95%] h-[90vh] bg-cover bg-center
            rounded-xl shadow-xl overflow-hidden mt-2 max-w-7xl opacity-95 ' style={{ backgroundImage: `url(${signupImage})` }}>

                <div className='absolute inset-0 bg-black/35' />

                <div className='relative z-10 flex items-center justify-center h-full px-2 mt-4'>
                    <form className='bg-white/80 p-6 sm:p-8 md:p-10 backdrop-blur-md rounded-lg shadow-md w-full max-w-md'>

                        <h2 className='flex justify-center text-2xl font-robotoMono font-semibold mb-4 '>Sign Up</h2>
                        <input type='text' placeholder='Name' className='mb-2 p-2 w-full border rounded outline-none' />
                        <input type='email' placeholder='Email' className='mb-2 p-2 w-full border rounded outline-none' />
                        <input type='password' placeholder='Create password' className='mb-4 p-2 w-full border rounded outline-none' />
                        <button className='w-full bg-blue-500 text-white py-2 rounded-3xl hover:bg-blue-600'>Sign Up
                        </button>

                    </form>
                </div>



            </div>


        </div>
    )
}

export default SignUp
