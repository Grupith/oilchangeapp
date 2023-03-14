import React from 'react'
import {Link} from 'react-router-dom'

export default function Dashboard() {
  return (
    <div >
      <h1 className='text-center text-3xl font-bold mt-10'>Dashboard</h1>
      <div className='flex justify-center space-x-3'>
        <Link to='/signup' className='text-xl text-orange-500 font-bold'>Signup</Link>
        <Link to='/login' className='text-xl text-orange-500 font-bold'>Login</Link>
      </div>
        <button className='flex justify-center m-auto text-xl text-white bg-orange-500 rounded-md py-1 px-4 mt-4'>Logout</button>
    </div>
  )
}
