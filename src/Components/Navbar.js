import React, { useState, useRef, useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { BsFillMoonStarsFill, BsMoonStars, BsPersonCircle, BsFilterLeft, BsSearch } from 'react-icons/bs'

export default function Navbar({ darkmode, setDarkmode}) { 

    const { logout } = useAuth()
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
            setShowDropdown(false)
        } catch(e) {
            console.error(e)
        }
    }

    const [showDropdown, setShowDropdown] = useState(false)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleDarkMode = () => {
        setDarkmode(!darkmode)
        localStorage.setItem('darkMode', JSON.stringify(!darkmode))
    }

    useEffect(() => {
        const userPreference = localStorage.getItem('darkMode')
        if (userPreference !== null) {
            setDarkmode(JSON.parse(userPreference))
        }
    }, [setDarkmode])

  return (
    <nav className='bg-white dark:text-white dark:bg-gray-800 fixed w-full h-16 border-b border-gray-200 dark:border-gray-600'>
        <div className="relative flex items-center justify-between h-16 mx-4">
            <div className="flex items-center">
                <div className='flex items-center space-x-4'>
                    <button className='cursor-pointer hover:bg-gray-200 rounded-md p-1 dark:hover:bg-gray-700'>
                        <BsFilterLeft className='w-8 h-8'/>
                    </button>
                    <Link to='/' className="font-bold text-xl">TrackMyOilChange</Link>
                </div>
                    <form className='flex items-center ml-10 bg-gray-100 px-4 py-1 text-lg border rounded-lg space-x-3 focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-700 dark:border-gray-600'>
                        <BsSearch className='h-4 w-4' />
                        <input type='text' placeholder='Search' className='w-72 text-lg bg-gray-100 rounded-sm outline-none dark:bg-gray-700'/>
                    </form>
            </div>
            <div className="flex items-center space-x-3 mr-2">
                <div onClick={toggleDarkMode}>
                    {!darkmode ? <button className='cursor-pointer hover:bg-gray-200 rounded-md p-2 dark:hover:bg-gray-700'><BsFillMoonStarsFill className='w-5 h-5'/></button> : <button className='cursor-pointer hover:bg-gray-200 rounded-md p-2 dark:hover:bg-gray-700'><BsMoonStars className='w-5 h-5' /></button>}
                </div>
                <button className='cursor-pointer hover:bg-gray-200 rounded-md p-2 dark:hover:bg-gray-700'>
                    <BsPersonCircle onClick={toggleDropdown} className='w-6 h-6' />
                </button>
            {showDropdown && 
                <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-40 mr-4 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <Link to='/dashboard' onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-gray-700" role="menuitem">Dashboard</Link>
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 line-through cursor-pointer dark:text-white dark:hover:bg-gray-700" role="menuitem">Settings</span>
                        <span onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-white dark:hover:bg-gray-700" role="menuitem">Logout</span>
                    </div>
                </div>
            }
            </div>
        </div>
  </nav>
  )
}
