import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className='h-screen mt-16 bg-gray-100 dark:bg-gray-900 dark:text-white'>
        <h1 className='py-10 text-4xl text-center'>Welcome to TrackMyOilChange</h1>
        <div className='flex justify-center pt-10 space-x-4'>
            <Link to='/signup'><button className='px-6 py-1 text-xl text-white bg-blue-500 rounded-md shadow-md'>Signup</button></Link>
            <Link to='/login'><button className='px-6 py-1 text-xl text-white bg-blue-500 rounded-md shadow-md'>Login</button></Link>
        </div>
    </div>
  )
}
