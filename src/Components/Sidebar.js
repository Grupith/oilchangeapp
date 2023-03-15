import React from 'react'
import { FaBook } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className='bg-white w-60'>
        <h2 className='text-xl text-center '>TrackMyOilChange</h2>
        <ul>
            <div className='flex justify-center space-x-2 items-center hover:bg-gray-200  cursor-pointer px-2 py-1 rounded-md'>
                <FaBook className='text-lg'/>
                <li className='text-lg'>Add Oil Change</li>
            </div>
        </ul>
    </aside>
  )
}
