import React from 'react'

export default function Modal({ setIsModalOpen }) {

  return (
    <div onClick={(e) => {e.stopPropagation()}}>      
        <div className='bg-white p-10 rounded-md text-center space-y-5'>
            <h2 className='text-xl'>Modal</h2>
        </div>
    
    </div>
  )
}
