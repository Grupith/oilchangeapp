import React from 'react'
import { useAuth } from '../AuthContext'
import { BsHouseFill, BsBookmarkFill, BsTrash2Fill} from 'react-icons/bs'

export default function Dashboard() {

  const { currentUser } = useAuth()

  return (
    <div className='bg-gray-100 h-screen border'>
      <nav className='bg-white'>
        <ul className='flex items-center h-14 ml-4'>
            <div className='flex justify-center space-x-1 items-center border-b-2 border-transparent hover:border-gray-700 px-4 cursor-pointer h-14'>
                <BsHouseFill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Dashboard</li>
            </div>
            <div className='flex justify-center space-x-1 items-center border-b-2 border-transparent hover:border-gray-700 px-4 cursor-pointer h-14'>
                <BsBookmarkFill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Create Oil Change</li>
            </div>
            <div className='flex justify-center space-x-1 items-center border-b-2 border-transparent hover:border-gray-700 px-4 cursor-pointer h-14'>
                <BsTrash2Fill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Reset List</li>
            </div>
        </ul>
      </nav>
      <h1 className='text-2xl font-bold m-10'>Dashboard</h1>
        <p className='text-xl m-10'>{currentUser && currentUser.email}</p>
    </div>
  )
}
