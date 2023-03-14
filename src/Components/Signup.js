import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='bg-gray-100 h-screen flex justify-center'>
      <div className='bg-white max-w-sm m-auto border rounded-xl p-12 shadow-sm'>
        <form className='space-y-6'>
          <h1 className='font-bold text-4xl text-center text-gray-700 m-3'>Sign Up</h1>
            <div>
              <label htmlFor='Email' className='text-lg text-gray-400'>Email </label>
              <input required type='email' name='Email' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100'  />
            </div>
              <div>
                <label htmlFor='Password' className='text-lg text-gray-400'>Password </label>
                <input required type='password' name='Password' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100' />
              </div>
              <div>
                <label htmlFor='confirmPassword' className='text-lg text-gray-400'>Confirm Password </label>
                <input required type='password' name='confirmPassword' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100' />
              </div>
              <button type='submit' className='text-lg text-white bg-orange-500 rounded-md py-2 w-full'>Create Account</button>
              <p className='text-center text-md text-gray-700'>Already have an account? <Link to='/login' className='text-orange-500'>Login</Link> </p>
        </form>
      </div>
    </div>
  )
}
