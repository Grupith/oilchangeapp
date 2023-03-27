import React, { useCallback, useEffect, useState } from 'react'
import Card from './Card'
import {collection, query, where, getDocs, deleteDoc, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../AuthContext'
import Sidebar from './Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

export default function Dashboard({ setIsModalOpen, oilLogs, setOilLogs, darkmode, setDarkmode, showSidebar, setShowSidebar }) {

  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [searchedLogs, setSearchedLogs] = useState([])

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

  // Reverse array before displaying so the most recent one is displayed last (first)
  // const reversedLogs = oilLogs.slice(0).reverse()

  // Search for filtered results in search bar
  useEffect(() => {
    const filteredLogs = oilLogs.filter((log) => {
      return log.miles.toLowerCase().includes(search.toString().toLowerCase()) || log.oiltype.toLowerCase().includes(search.toString().toLowerCase()) || log.date.toLowerCase().includes(search.toString().toLowerCase()) 
    })
    setSearchedLogs(filteredLogs)
  }, [search, oilLogs])

  const logsToRender = searchedLogs.length > 0 ? searchedLogs : oilLogs;

  return (
    <>
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode} showSidebar={showSidebar} setShowSidebar={setShowSidebar} search={search} setSearch={setSearch} />
        <div className='flex h-screen bg-gray-200 dark:bg-gray-900 dark:text-white'>
            <div className={`transition-all absolute ease-in-out duration-300 z-10 ${showSidebar ? 'left-0' : '-left-64'}`}>
                <Sidebar setIsModalOpen={setIsModalOpen} search={search} setSearch={setSearch} />
            </div>
          <main className={`${showSidebar ? 'ml-64 blur-sm sm:blur-none' : ''} w-full transition-all duration-300 ease-in-out`}>
              <Outlet />
              {location.pathname === '/dashboard' && <div className='mt-16'>
                <h1 className='pt-10 mx-10 text-2xl font-bold dark:text-gray-200'>My Oil Changes</h1>
                {!loading ? <div className='flex flex-wrap overflow-auto bg-gray-200 dark:bg-gray-900'>
                  {logsToRender.map((log) => <Card onDelete={() => handleDelete(log.id)} key={log.id} date={log.date} miles={log.miles} oiltype={log.oiltype} price={log.price} />)}
                </div> : <div className="flex items-center justify-center pt-40">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] "role="status">
                              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                          </div>
                  </div>}
              </div>}
          </main>
        </div>
    </>
  )
}
