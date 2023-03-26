import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
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
          // Check if user exists, if not then create a document
          const usersRef = collection(db, 'users')
          const querySnapshot = await getDocs(query(usersRef, where('uid', '==', currentUser.uid)))
           if (querySnapshot.empty) {
            const docRef = await addDoc(usersRef, {
              uid: currentUser.uid,
              email: currentUser.email
            })
            console.log("A user document was created in the collection users ", docRef)
           } 
          navigate('/dashboard')
        } catch(e) {
          console.error('Error creating user collection', e)
          console.log('Logged Error', e)
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
    <div className='flex justify-center h-screen bg-gray-100 dark:bg-gray-900 dark:text-white'>
      {!loading ? <div className='max-w-sm p-12 m-auto bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-none'>
        <form onSubmit={handleSubmit} className='space-y-7'>
          <h1 className='m-3 text-4xl font-bold text-center'>Sign Up</h1>
            <div className='space-y-1'>
              <label htmlFor='Email' className='text-lg'>Email </label>
              <input onChange={e => setEmail(e.target.value)} required type='email' name='Email' autoComplete='off' className='w-full px-3 py-1 text-lg bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-none'  />
            </div>
              <div className='space-y-1'>
                <label htmlFor='Password' className='text-lg'>Password </label>
                <input onChange={e => setPassword(e.target.value)} required type='password' name='Password' autoComplete='off' className='w-full px-3 py-1 text-lg bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-none' />
              </div>
              <div className='space-y-1'>
                <label htmlFor='confirmPassword' className='text-lg'>Confirm Password </label>
                <input onChange={e => setConfirmPassword(e.target.value)} required type='password' name='confirmPassword' autoComplete='off' className='w-full px-3 py-1 text-lg bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-900 dark:border-none' />
              </div>
              {error && <p className='flex justify-center italic text-red-500'>{error}</p>}
              <button type='submit' className='w-full py-2 text-lg text-white transition-all bg-blue-500 rounded-md hover:scale-105'>Create Account</button>
              <p className='text-center text-md'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link> </p>
        </form>
      </div> : <div className="flex items-center justify-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] "role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
        </div>}
    </div>
  )
}
