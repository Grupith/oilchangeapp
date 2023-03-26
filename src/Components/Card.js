import React, { useState } from 'react'
import { BsGearFill } from 'react-icons/bs'

export default function Card({ date, miles, oiltype, price, onDelete }) {

  const [showCardSettings, setShowCardSettings] = useState(false)

  return (
    <div className='max-w-md border relative rounded-xl m-10 bg-white p-4 shadow-lg dark:bg-gray-800 dark:border-none'>
        <img className='rounded-xl' src={'https://cdnb.artstation.com/p/assets/images/images/020/069/649/large/amal-kumar-05-render.jpg?1566240380'} alt='pouring oil into a car' />
        <div className='p-4'>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold'>Oil Log</h2>
                <div className='flex items-center'>
                  <h2 className='text-2xl font-semibold'>${price}</h2>
                  <button onClick={() => setShowCardSettings(!showCardSettings)} className='cursor-pointer hover:bg-gray-200 rounded-md p-1 dark:hover:bg-gray-700 ml-2'>
                    <BsGearFill className={`w-6 h-6 ${showCardSettings ? 'animate-pulse' : 'animate-none'}`}/>
                  </button>
                  {showCardSettings && <div className="absolute mt-40 right-5 mr-4 w-48 rounded-md shadow-lg z-40 bg-white dark:bg-gray-800 dark:border dark:border-gray-600">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md cursor-pointer dark:text-white dark:hover:bg-gray-700" role="menuitem">Edit Card</span>
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md line-through cursor-pointer dark:text-white dark:hover:bg-gray-700" role="menuitem">Change Photo</span>
                        <span onClick={onDelete} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md cursor-pointer dark:text-white dark:hover:bg-gray-700" role="menuitem">Delete</span>
                    </div>
                  </div>}
                </div>
            </div>
            <p className='text-xl my-2'><span className='font-semibold'>Date:</span> {date}</p>
            <p className='text-xl my-2'><span className='font-semibold'>Miles:</span> {miles}</p>
            <p className='text-xl my-2'><span className='font-semibold'>Oil Type:</span> {oiltype}</p>
        </div>
    </div>
  )
}
