import React from 'react'

export default function Card() {
  return (
    <div className='max-w-md border rounded-xl m-10 bg-white p-4 shadow-lg'>
        <img className='rounded-xl' src={'https://cdnb.artstation.com/p/assets/images/images/020/069/649/large/amal-kumar-05-render.jpg?1566240380'} alt='pouring oil into a car' />
        <div className='p-4'>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold'>Oil Log 1</h2>
                <h2 className='text-2xl font-semibold'>$57.32</h2>
            </div>
            <p className='text-xl my-2'><span className='font-semibold'>Date:</span> 3/15/23</p>
            <p className='text-xl my-2'><span className='font-semibold'>Miles:</span> 35,630</p>
            <p className='text-xl my-2'><span className='font-semibold'>Oil Type:</span> 5w-20fs</p>
            <button className='text-xl bg-blue-500 text-white py-1 px-6 mt-2 rounded-md shadow-md hover:scale-105 transition-all'>Delete</button>
        </div>
    </div>
  )
}
