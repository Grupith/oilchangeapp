import React from 'react'
import { BsHouseFill, BsBookmarkFill, BsTrash2Fill} from 'react-icons/bs'

export default function Dashboard() {

  return (
    <div className='bg-gray-100 h-screen border-t'>
      <nav className='bg-white px-2'>
        <ul className='flex items-center h-14 ml-4'>
            <div className='flex justify-center space-x-1 items-center border-b border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsHouseFill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Dashboard</li>
            </div>
            <div className='flex justify-center space-x-1 items-center border-b border-transparent hover:border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsBookmarkFill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Create Oil Change</li>
            </div>
            <div className='flex justify-center space-x-1 items-center border-b border-transparent hover:border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsTrash2Fill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Reset List</li>
            </div>
        </ul>
      </nav>
      <h1 className='text-2xl text-gray-700 font-bold m-10'>My Oil Changes</h1>
      <div className='h-screen'>
          <div className='max-w-xs border border-red-500'>
            <img src={'https://www.kbb.com/wp-content/uploads/2020/03/how-often-change-oil.jpg?resize=763,429'} alt='pouring oil into a car' />
            <div>
              <h2>Change #1</h2>
              <p>3/15/23</p>
            </div>
          </div>
      </div>
    </div>
  )
}
