import React from 'react'
import { BsBookmarkFill, BsFilterLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className='bg-white w-64 fixed h-screen border-r shadow-md z-0 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600'>
      <div className='flex items-center justify-center space-x-3 py-4 border-b'>
          <BsFilterLeft className='text-xl w-9 h-9 cursor-pointer text-gray-600 hover:bg-gray-200 rounded-md'/>
          <Link to='/' className="font-bold text-xl">TrackMyOilChange</Link>
        </div>
        <ul className='p-4'>
          <div className='flex justify-center py-2 rounded-md items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'>
              <BsBookmarkFill className='text-xl mr-3 dark:text-gray-200'/>
              <li className='text-lg dark:text-gray-200'>Create Oil Change</li>
          </div>
        </ul>
      </aside>
  )
}
