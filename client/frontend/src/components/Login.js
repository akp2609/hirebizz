import React from 'react'
import loginImage from '../assets/loginImage.png'
import GoogleLoginButton from './GoogleLoginButton'
import GithubLoginButton from './GithubLoginButton'

function Login() {
    return (
        <div className='flex h-screen'>

            <div className='flex justify-center items-center w-1/2 h-screen bg-blue-500'>

                <div className='bg-white/80 p-6 sm:p-8 md:p-10 backdrop-blur-md rounded-lg shadow-md w-full max-w-md '>
                    <h1 className='font-robotoMono text-black font-semibold flex justify-center m-2 text-3xl'>Login</h1>
                    <form>
                        <input type='email' placeholder='Email' className='mb-4 mt-2 p-2 w-full border rounded outline-none text-xl' />
                        <input type='password' placeholder='password' className='mb-2 p-2 w-full border rounded outline-none text-xl' />
                        <button className='bg-blue-500 w-full mt-2 text-white font-bold hover:bg-blue-600 p-2 rounded-3xl'>Login</button>
                    </form>
                    <text className='mt-4 font-robotoMono text-gray-600 flex justify-center'>Or login with</text>

                    {/* Fixme error 401 google auth access denied */}
                    <div className='mt-4 flex justify-between items-center'>
                        <GoogleLoginButton/>
                        <GithubLoginButton/>
                    </div>

                </div>


            </div>

            <div className='relative justify-center items-center w-1/2'>
            {/* <div className='bg-cover overflow-hidden justify-center items-center w-full' style={{backgroundImage:`url(${loginImage})`}}></div> */}

            <img src={loginImage} alt='' className='h-screen opacity-80 p-1'/>
            </div>


        </div>

    )
}

export default Login
