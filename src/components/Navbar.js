import React, { useState, useRef, useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { BsFillMoonStarsFill, BsMoonStars, BsPersonCircle, BsFilterLeft, BsSearch } from 'react-icons/bs'

export default function Navbar({ darkmode, setDarkmode, showSidebar, setShowSidebar, search, setSearch }) { 

    const { logout } = useAuth()
    const navigate = useNavigate()
    const dropdownRef = useRef(null)
    const buttonRef = useRef(null)

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
    if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
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
        const themePreference = localStorage.getItem('darkMode')
        if (themePreference !== null) {
            setDarkmode(JSON.parse(themePreference))
        }
    }, [setDarkmode])

  return (
    <nav className='fixed z-40 w-full h-16 bg-white border-b border-gray-200 dark:text-white dark:bg-gray-800 dark:border-gray-600'>
        <div className="relative flex items-center justify-between h-16 mx-4 transition-all duration-300 ease-in-out">
            <div className="flex items-center">
                <div className='flex items-center space-x-4'>
                    <button onClick={() => setShowSidebar(!showSidebar)} className='p-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'>
                        <BsFilterLeft className='w-8 h-8'/>
                    </button>
                    <Link to='/' className="text-xl font-bold">TrackMyOilChange</Link>
                </div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        setSearch('')
                        e.target.reset()
                    }} className='items-center hidden px-4 py-1 ml-10 space-x-3 text-lg bg-gray-100 border rounded-lg md:flex focus-within:ring-2 focus-within:ring-blue-500 dark:bg-gray-700 dark:border-gray-600'>
                        <BsSearch className='w-4 h-4' />
                        <input onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search' className='text-lg bg-gray-100 rounded-sm outline-none w-72 dark:bg-gray-700'/>
                    </form>
            </div>
            <div className="flex items-center mr-2 space-x-3">
                <div onClick={toggleDarkMode}>
                    {!darkmode ? <button className='p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'><BsFillMoonStarsFill className='w-5 h-5'/></button> : <button className='p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'><BsMoonStars className='w-5 h-5' /></button>}
                </div>
                <button ref={buttonRef} className='p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'>
                    <BsPersonCircle onClick={toggleDropdown} className='w-6 h-6' />
                </button>
            {showDropdown && 
                <div ref={dropdownRef} className="absolute right-0 w-48 mt-40 mr-4 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <Link to='/dashboard' onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:rounded-md dark:text-white dark:hover:bg-gray-700" role="menuitem">Dashboard</Link>
                        <Link to='/dashboard/settings' onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:rounded-md dark:text-white dark:hover:bg-gray-700" role="menuitem">Settings</Link>
                        <span onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:rounded-md dark:text-white dark:hover:bg-gray-700" role="menuitem">Logout</span>
                    </div>
                </div>
            }
            </div>
        </div>
  </nav>
  )
}
