import React from 'react'
import { useAuth } from '../AuthContext'
import { FaBook, FaTrash } from "react-icons/fa"

export default function Dashboard() {

  const { currentUser } = useAuth()

  return (
    <div className='bg-gray-100 h-screen'>
      <nav className='bg-white border py-3 px-10'>
        <ul className='flex'>
            <div className='flex justify-center space-x-2 items-center hover:bg-gray-200  cursor-pointer px-2 py-1 rounded-md'>
                <FaBook className='text-md'/>
                <li className='text-lg'>Add Oil Change</li>
            </div>
            <div className='flex justify-center space-x-2 items-center hover:bg-gray-200  cursor-pointer px-2 py-1 rounded-md'>
                <FaTrash className='text-md'/>
                <li className='text-lg'>Reset All</li>
            </div>
        </ul>
      </nav>
      <h1 className='text-xl font-bold'>Dashboard</h1>
        <p className='text-xl'>{currentUser && currentUser.email}</p>
    </div>
  )
}
