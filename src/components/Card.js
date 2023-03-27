import React, { useState, useRef, useEffect } from 'react'
import { BsGearFill } from 'react-icons/bs'

export default function Card({ date, miles, oiltype, price, onDelete }) {

  const [showCardSettings, setShowCardSettings] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
      setShowCardSettings(false)
    } 
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
       document.removeEventListener('mousedown', handleClickOutside)
    }
  },[])

  const handleShowCardSettings = (e) => {
    setShowCardSettings(!showCardSettings)
  }

  return (
    <div className='relative max-w-md p-4 m-10 bg-white border shadow-lg rounded-xl dark:bg-gray-800 dark:border-none'>
        <img className='rounded-xl' src={'https://cdnb.artstation.com/p/assets/images/images/020/069/649/large/amal-kumar-05-render.jpg?1566240380'} alt='pouring oil into a car' />
        <div className='p-4'>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold'>Oil Log</h2>
                <div className='flex items-center'>
                  <h2 className='text-2xl font-semibold'>${price}</h2>
                  <button ref={buttonRef} onClick={handleShowCardSettings} className='p-1 ml-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'>
                    <BsGearFill className={`w-6 h-6 ${showCardSettings ? 'animate-pulse' : 'animate-none'}`}/>
                  </button>
                  {showCardSettings && <div ref={dropdownRef} className="absolute z-40 w-48 mt-40 mr-4 bg-white rounded-md shadow-lg right-5 dark:bg-gray-800 dark:border dark:border-gray-600">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:rounded-md dark:text-white dark:hover:bg-gray-700" role="menuitem">Edit Card</span>
                        <span onClick={onDelete} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:rounded-md dark:text-white dark:hover:bg-gray-700" role="menuitem">Delete</span>
                    </div>
                  </div>}
                </div>
            </div>
            <p className='my-2 text-xl'><span className='font-semibold'>Date:</span> {date}</p>
            <p className='my-2 text-xl'><span className='font-semibold'>Miles:</span> {miles}</p>
            <p className='my-2 text-xl'><span className='font-semibold'>Oil Type:</span> {oiltype}</p>
        </div>
    </div>
  )
}
