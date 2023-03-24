import React from 'react'
import { BsBookmarkFill } from "react-icons/bs";

export default function Sidebar({ setIsModalOpen }) {
  return (
    <aside className='bg-white w-64 fixed h-screen border-r border-t shadow-md mt-16 z-20 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600'>
        <ul className='p-3'>
          <div onClick={() => setIsModalOpen(true)} className='flex justify-center py-2 rounded-md items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'>
              <BsBookmarkFill className='text-lg mr-3 dark:text-gray-200'/>
              <span className='text-lg dark:text-gray-200'>Create Oil Change</span>
          </div>
        </ul>
      </aside>
  )
}
