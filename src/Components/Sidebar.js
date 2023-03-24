import React from 'react'
import { BsBookmarkFill, BsFilterLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className='bg-white w-64 fixed h-screen border-t border-gray-300 dark:bg-gray-800 dark:text-white shadow-lg border-r dark:border-gray-600'>
      <div className='flex items-center space-x-4'>
          <BsFilterLeft className='text-xl w-8 h-8 cursor-pointer'/>
          <Link to='/' className="font-bold text-xl">TrackMyOilChange</Link>
        </div>
        <ul className='p-4'>
          <div className='flex justify-center p-2 rounded-md items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'>
              <BsBookmarkFill className='text-xl mr-3 dark:text-gray-200'/>
              <li className='text-lg dark:text-gray-200'>Create Oil Change</li>
          </div>
        </ul>
      </aside>
  )
}
