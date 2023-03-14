import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Signup() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    
    const { signup } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (password !== confirmPassword) {
        return setError('Passwords do not match')
      }

      try {
        setError('')
        setLoading(true)
        await signup(email, password)
        navigate('/')
      } catch {
        setError('Failed to create an account')
      }
      setLoading(false)
    }

  return (
    <div className='bg-gray-100 h-screen flex justify-center'>
      <div className='bg-white max-w-sm m-auto border rounded-xl p-12 shadow-sm'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <h1 className='font-bold text-4xl text-center text-gray-700 m-3'>Sign Up</h1>
            <div>
              <label htmlFor='Email' className='text-lg text-gray-400'>Email </label>
              <input onChange={e => setEmail(e.target.value)} required type='email' name='Email' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100'  />
            </div>
              <div>
                <label htmlFor='Password' className='text-lg text-gray-400'>Password </label>
                <input onChange={e => setPassword(e.target.value)} required type='password' name='Password' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100' />
              </div>
              <div>
                <label htmlFor='confirmPassword' className='text-lg text-gray-400'>Confirm Password </label>
                <input onChange={e => setConfirmPassword(e.target.value)} required type='password' name='confirmPassword' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100' />
              </div>
              <button type='submit' className='text-lg text-white bg-orange-500 rounded-md py-2 w-full'>Create Account</button>
              <p className='text-center text-md text-gray-700'>Already have an account? <Link to='/login' className='text-orange-500'>Login</Link> </p>
        </form>
      </div>
    </div>
  )
}
