import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const { login } = useAuth()
    const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      navigate('/dashboard')
    } catch(e) {
      setError(e.message)
    }
    setLoading(false)

  }
  return (
    <div className='bg-gray-100 h-screen flex justify-center'>
      {!loading ? <div className='bg-white max-w-sm m-auto border rounded-xl p-12 shadow-sm'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <h1 className='font-bold text-4xl text-center text-gray-700 m-3'>Login</h1>
            <div>
              <label htmlFor='Email' className='text-lg text-gray-400'>Email </label>
              <input onChange={e => setEmail(e.target.value)} required type='email' name='Email' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100'  />
            </div>
              <div>
                <label htmlFor='Password' className='text-lg text-gray-400'>Password </label>
                <input onChange={e => setPassword(e.target.value)} required type='password' name='Password' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100' />
              </div>
              {error && <p className='flex justify-center text-red-500 italic'>{error}</p>}
              <button type='submit' className='text-lg text-white bg-orange-500 rounded-md py-2 w-full'>Login</button>
              <p className='text-center text-md text-gray-700'>Don't have an account? <Link to='/signup' className='text-orange-500'>Sign Up</Link> </p>
        </form>
      </div> : <div class="flex items-center justify-center">
                  <div
                    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span
                    >
                  </div>
        </div>}
    </div>
  )
}
