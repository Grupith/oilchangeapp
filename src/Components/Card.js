import React from 'react'

export default function Card({ date, miles, oiltype, price, onDelete, logNumber }) {
  return (
    <div className='max-w-md border rounded-xl m-10 bg-white p-4 shadow-lg'>
        <img className='rounded-xl' src={'https://cdnb.artstation.com/p/assets/images/images/020/069/649/large/amal-kumar-05-render.jpg?1566240380'} alt='pouring oil into a car' />
        <div className='p-4'>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold'>Oil Log {logNumber}</h2>
                <h2 className='text-2xl font-semibold'>${price}</h2>
            </div>
            <p className='text-xl my-2'><span className='font-semibold'>Date:</span> {date}</p>
            <p className='text-xl my-2'><span className='font-semibold'>Miles:</span> {miles}</p>
            <p className='text-xl my-2'><span className='font-semibold'>Oil Type:</span> {oiltype}</p>
            <button onClick={onDelete} className='text-xl bg-blue-500 text-white py-1 px-6 mt-2 rounded-md shadow-md hover:scale-105 transition-all'>Delete</button>
        </div>
    </div>
  )
}
