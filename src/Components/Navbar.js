import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Navbar() {  
    const { logout } = useAuth()
    const navigate = useNavigate()

    const [showDropdown, setShowDropdown] = useState(false)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
            setShowDropdown(false)
        } catch(e) {
            console.error(e)
        }
    }

  return (
    <nav>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
                <a href="/" className="font-bold text-2xl">TrackMyOilChange</a>
            </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button onClick={toggleDropdown} className="p-1 rounded-full hover:text-gray-400 focus:text-gray-400 focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {showDropdown && 
                    <div className="origin-top-right absolute right-0 mt-28 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
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
