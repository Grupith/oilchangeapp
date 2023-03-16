import React from 'react'
import { BsHouseFill, BsBookmarkFill, BsTrash2Fill} from 'react-icons/bs'
import Card from './Card'

export default function Dashboard({ setIsModalOpen }) {

  return (
    <div className='bg-gray-200 h-screen border-t'>
      <nav className='bg-white px-2'>
        <ul className='flex items-center h-14 ml-4'>
            <div className='flex justify-center space-x-1 items-center border-b border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsHouseFill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Dashboard</li>
            </div>
            <div onClick={() => setIsModalOpen(true)}className='flex justify-center space-x-1 items-center border-b border-transparent hover:border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsBookmarkFill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Create Oil Change</li>
            </div>
            <div className='flex justify-center space-x-1 items-center border-b border-transparent hover:border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsTrash2Fill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Reset List</li>
            </div>
        </ul>
      </nav>
      <h1 className='text-2xl font-bold mx-10 mt-5'>My Oil Changes</h1>
      <div className='overflow-auto bg-gray-200 flex flex-wrap'>
          <Card />
          <Card />
          <Card />
          <Card />
      </div>
    </div>
  )
}
