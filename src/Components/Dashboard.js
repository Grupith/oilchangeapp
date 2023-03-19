import React, { useCallback, useEffect, useState } from 'react'
import { BsHouseFill, BsBookmarkFill, BsTrash2Fill } from 'react-icons/bs'
import Card from './Card'
import {collection, query, where, getDocs, deleteDoc, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'

export default function Dashboard({ setIsModalOpen, oilLogs, setOilLogs }) {

  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id) => {
    setLoading(true)
      try {
        // Find the document with where the id equals the log.id
        const oilLogsRef = collection(db, 'oilLogs')     
        const q = query(oilLogsRef, where('id', '==', id))
        const querySnapshot = await getDocs(q)
        // Get the first doc from the query 
        const docSnapshot = querySnapshot.docs[0]
        await deleteDoc(docSnapshot.ref)
        // filter the updated logs
        const updatedLogs = oilLogs.filter((log) => log.id !== id);
        setOilLogs(updatedLogs);
      } catch (error) {
        console.error("Error removing document: ", error);
        console.log(error)
      } finally {
        setLoading(false)
      }
  }
  
  // This avoids multiple re-renders from the children in the callback
  const setOilLogsCallback = useCallback((oilLogsArray) => {
    setOilLogs(oilLogsArray)
  }, [setOilLogs]) 

  // Fetch Oillogs collection from database and query the specific oilLog attached to user
  useEffect(() => {
    const fetchOilLogs = async () => {
      setLoading(true)
      const oilLogsRef = collection(db, 'oilLogs')
      const q = query(oilLogsRef, where('userId', '==', currentUser.uid), orderBy('dateCreated'))
      const querySnapshot = await getDocs(q)
      const oilLogsArray = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      setOilLogsCallback(oilLogsArray)
      setLoading(false)
    }
    fetchOilLogs()
  }, [currentUser, setOilLogsCallback])

  // Reverse array before displaying so the most recent one is displayed last
  const reversedlogs = oilLogs.slice(0).reverse()

  return (
    <div className='bg-gray-200 h-screen border-t'>
      <nav className='bg-white px-2'>
        <ul className='flex items-center h-14 ml-4'>
            <div className='flex justify-center space-x-1 items-center border-b border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsHouseFill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Dashboard</li>
            </div>
            <div onClick={() => setIsModalOpen(true)} className='flex justify-center space-x-1 items-center border-b border-transparent hover:border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsBookmarkFill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Create Oil Change</li>
            </div>
            <div className='flex justify-center space-x-1 items-center border-b border-transparent hover:border-gray-700 px-4 cursor-pointer h-14 transition-all'>
                <BsTrash2Fill className='text-lg text-gray-700'/>
                <li className='text-lg text-gray-700'>Reset List</li>
            </div>
        </ul>
      </nav>
      <h1 className='text-2xl font-bold mx-10 mt-5'>My Oil Changes</h1>
      {!loading ? <div className='overflow-auto bg-gray-200 flex flex-wrap'>
        {reversedlogs.map((log) => <Card onDelete={() => handleDelete(log.id)} key={log.id} date={log.date} miles={log.miles} oiltype={log.oiltype} price={log.price} />)}
      </div> : <div className="flex items-center justify-center pt-40">
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
