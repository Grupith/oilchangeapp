import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '../AuthContext'

export default function Signup() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    
    const { signup, currentUser } = useAuth()
    const navigate = useNavigate()

    // Create a users collection and document when the user signs up
    useEffect(() => {
      const createUserCollection = async () => {
        try {
          const docRef = await addDoc(collection(db, 'users'), {
            uid: currentUser.uid,
            email: currentUser.email
          })
          console.log("This Document was written with ID: ", docRef.id)
          navigate('/dashboard')
        } catch(e) {
          console.error('Error creating user collection', e)
        }
      }
      if (currentUser) {
        setLoading(true)
        createUserCollection().finally(() => setLoading(false))
      }
    }, [currentUser, navigate])
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      // Confirm if passwords match 
      if (password !== confirmPassword) {
        return setError('Passwords do not match')
      }
      // Sign up user to firebase auth
      try {
        setError('')
        setLoading(true)
        await signup(email, password)
      } catch (e) {
        setError(e.message);
        console.error('catch error',e)
      }
    }
    
  return (
    <div className='bg-gray-100 h-screen flex justify-center'>
      {!loading ? <div className='bg-white max-w-sm m-auto border rounded-xl p-12 shadow-sm'>
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
              {error && <p className='flex justify-center text-red-500 italic'>{error}</p>}
              <button type='submit' className='text-lg text-white bg-blue-500 rounded-md py-2 w-full'>Create Account</button>
              <p className='text-center text-md text-gray-700'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link> </p>
        </form>
      </div> : <div className="flex items-center justify-center">
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span
                    >
                  </div>
        </div>}
    </div>
  )
}
