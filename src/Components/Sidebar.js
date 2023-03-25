import React from 'react'
import { BsBookmarkFill, BsSearch } from "react-icons/bs";
import { useAuth } from '../AuthContext';

export default function Sidebar({ setIsModalOpen }) {
  const { currentUser } = useAuth()
  return (
    <aside className='bg-white w-64 fixed h-screen border-r border-t shadow-md pt-16 z-20 flex flex-col justify-between border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600'>
        <ul className='p-3 space-y-2'>
          <form className='visible md:hidden flex items-center bg-gray-100 px-4 py-1 mx-2 text-lg border rounded-lg space-x-3 focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-700 dark:border-gray-600'>
              <BsSearch className='h-4 w-4' />
              <input type='text' placeholder='Search' className='w-full text-lg bg-gray-100 rounded-sm outline-none dark:bg-gray-700'/>
            </form>
          <div onClick={() => setIsModalOpen(true)} className='flex justify-center py-2 rounded-md items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'>
              <BsBookmarkFill className='text-lg mr-3 dark:text-gray-200'/>
              <span className='text-lg dark:text-gray-200'>Create Oil Change</span>
          </div>
        </ul>
        <div className='flex justify-center mb-4'>
            <p className='text-md text-blue-500 hover:animate-pulse'>Email: {currentUser && currentUser.email}</p>
          </div>
      </aside>
  )
}
