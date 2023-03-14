import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Dashboard() {

  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to logout')
    }
  
  }

  return (
    <div >
      <h1 className='text-center text-3xl font-bold mt-10'>Dashboard</h1>
      <div className='flex justify-center space-x-3'>
        <Link to='/signup' className='text-xl text-orange-500 font-bold'>Signup</Link>
        <Link to='/login' className='text-xl text-orange-500 font-bold'>Login</Link>
      </div>
        <p className='text-center text-3xl'>{currentUser && currentUser.email}</p>
        <button onClick={handleSubmit} className='flex justify-center m-auto text-xl text-white bg-orange-500 rounded-md py-1 px-4 mt-4'>Logout</button>
    </div>
  )
}
