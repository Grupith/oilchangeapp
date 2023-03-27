import React from 'react'
import { BsBookmarkFill, BsSearch, BsHousesFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Sidebar({ setIsModalOpen, search, setSearch }) {
  const { currentUser } = useAuth()
  return (
    <aside className='fixed z-20 flex flex-col justify-between w-64 h-screen pt-16 bg-white border-t border-r border-gray-200 shadow-md dark:bg-gray-800 dark:text-white dark:border-gray-600'>
        <ul className='p-3 space-y-4'>
          <form onSubmit={(e) => {
            e.preventDefault()
            setSearch('')
            e.target.reset()
          }} className='flex items-center visible px-4 py-1 mx-2 space-x-3 text-lg bg-gray-100 border rounded-lg md:hidden focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-700 dark:border-gray-600'>
              <BsSearch className='w-4 h-4' />
              <input onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search' className='w-full text-lg bg-gray-100 rounded-sm outline-none dark:bg-gray-700'/>
            </form>
          <Link to='/dashboard' className='flex items-center justify-center py-2 transition-all bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'>
              <BsHousesFill className='mr-3 text-lg dark:text-gray-200'/>
              <span className='text-lg dark:text-gray-200'>Dashboard</span>
          </Link>
          <div onClick={() => setIsModalOpen(true)} className='flex items-center justify-center py-2 transition-all bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'>
              <BsBookmarkFill className='mr-3 text-lg dark:text-gray-200'/>
              <span className='text-lg dark:text-gray-200'>Create Oil Change</span>
          </div>
        </ul>
        <div className='flex justify-center mb-4'>
            <Link to='/dashboard/settings' className='text-blue-500 text-md hover:animate-pulse'>Email: {currentUser && currentUser.email}</Link>
          </div>
      </aside>
  )
}
