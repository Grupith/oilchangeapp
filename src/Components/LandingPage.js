import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className='bg-gray-100 h-screen mt-16 dark:bg-gray-900 dark:text-white'>
        <h1 className='text-center text-4xl py-10'>Welcome to TrackMyOilChange</h1>
        <div className='flex justify-center space-x-4 pt-10'>
            <Link to='/signup'><button className='text-xl text-white bg-blue-500 rounded-md py-1 px-6 shadow-md'>Signup</button></Link>
            <Link to='/login'><button className='text-xl text-white bg-blue-500 rounded-md py-1 px-6 shadow-md'>Login</button></Link>
        </div>
    </div>
  )
}
