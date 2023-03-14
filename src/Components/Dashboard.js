import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Dashboard() {

  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setError('')
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to logout')
    }
  
  }

  return (
    <div >
      <h1 className='text-center text-3xl font-bold mt-10'>Dashboard</h1>
        <p className='text-center text-3xl py-3'>{currentUser && currentUser.email}</p>
        {error && <p>{error}</p>}
        <button onClick={handleSubmit} className='flex justify-center m-auto text-xl text-white bg-orange-500 rounded-md py-1 px-4 mt-4'>Logout</button>
    </div>
  )
}
