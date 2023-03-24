import React, { useState, useRef, useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { BsFillMoonStarsFill, BsMoonStars, BsFilterRight, BsFilterLeft } from 'react-icons/bs'

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

  return (
    <nav className='bg-white dark:text-white dark:bg-gray-800 fixed w-full border-b border-gray-300 dark:border-gray-600'>
        <div className="relative flex items-center justify-between h-16 mx-4">
            <div className="flex items-center">
                <div className='flex items-center space-x-4'>
                    <BsFilterLeft className='text-xl w-8 h-8 cursor-pointer'/>
                    <Link to='/' className="font-bold text-xl">TrackMyOilChange</Link>
                </div>
            </div>
            <div className="flex items-center">
                <div onClick={() => setDarkmode(!darkmode)}>
                    {!darkmode ?<BsFillMoonStarsFill className='text-xl cursor-pointer mr-6'/> : <BsMoonStars className='text-xl cursor-pointer mr-6' />}
                </div>
                <BsFilterRight onClick={toggleDropdown} className='text-xl w-8 h-8 cursor-pointer' />
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
