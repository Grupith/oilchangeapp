import React from 'react'
import { useAuth } from '../AuthContext'

export default function Dashboard() {

  const { currentUser } = useAuth()

  return (
    <div className='bg-gray-100 h-screen'>
      <h1 className='text-center text-3xl font-bold'>Dashboard</h1>
        <p className='text-center text-3xl py-3'>{currentUser && currentUser.email}</p>
    </div>
  )
}
