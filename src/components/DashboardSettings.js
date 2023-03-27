import React from 'react'
import { useAuth } from '../AuthContext'

export default function DashboardSettings() {
  const { currentUser } = useAuth()
  return (
    <div className='z-40 w-full h-screen p-10 mt-16 bg-gray-200 dark:bg-gray-900 dark:text-white'>
        <h1 className='text-2xl font-bold dark:text-gray-200'>Dashboard Settings</h1>
        <p to='/dashboard/settings' className='mt-5 text-lg'>Email: {currentUser && currentUser.email}</p>
    </div>
  )
}
