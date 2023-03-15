import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import {BsFillMoonStarsFill} from 'react-icons/bs'

export default function Navbar() { 

    const { logout } = useAuth()
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
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
    <nav>
        <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center justify-between h-16 px-10">
            <div className="flex items-center">
                <div>
                    <Link to='/' className="font-semibold text-xl">TrackMyOilChange</Link>
                </div>
            </div>
            <div className="flex items-center">
                <BsFillMoonStarsFill className='text-lg cursor-pointer mr-6'/>
                <button onClick={toggleDropdown} className="p-1 rounded-full hover:text-gray-400 focus:text-gray-400 focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {showDropdown && 
                    <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-40 mr-4 w-48 rounded-md shadow-lg bg-white">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 line-through cursor-pointer" role="menuitem">Settings</span>
                            <span onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">Logout</span>
                        </div>
                    </div>
                }
            </div>
        </div>
        </div>
  </nav>
  )
}
