import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase'
import { useAuth } from '../AuthContext'


export default function Modal({ setIsModalOpen, oilLogs, setOilLogs }) {

        const [selectedDate, setSelectedDate] = useState(new Date())
        const [miles, setMiles] = useState()
        const [oiltype, setOiltype] = useState()
        const [price, setPrice] = useState()

        const { currentUser } = useAuth()
        
        const handleSubmit = async (e) => {
            e.preventDefault()

            const formatedDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`

            const newOilLog = {
                id: uuidv4(),
                userId: currentUser.uid,
                date: formatedDate,
                miles: miles,
                oiltype: oiltype,
                price: price,
                dateCreated: Timestamp.now().toMillis()
            }
            try {
                const docRef = await addDoc(collection(db, 'oilLogs'), newOilLog)
                console.log('document written with ID: ', docRef)
                setOilLogs([...oilLogs, newOilLog])
                setIsModalOpen(false)

            } catch(e) {
                console.error('Error adding document: ', e)
            }
        }

  return (
    <div onClick={(e) => {e.stopPropagation()}}>      
        <div className='p-10 space-y-5 bg-white rounded-md dark:bg-gray-800 dark:text-white'>
            <form onSubmit={handleSubmit}>
                <h2 className='pb-8 text-3xl font-bold text-center'>Create an Oil Log</h2>
                <div className='space-y-6'>
                    <div className='space-y-1'>
                        <label htmlFor='date' className='text-lg'>Date</label>
                        <DatePicker name='date' className='w-full px-4 py-2 text-lg bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700' selected={selectedDate} onChange={(date) => {
                            setSelectedDate(date)
                            console.log(selectedDate)
                        }} />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor='miles' className='text-lg'>Miles</label>
                        <input onChange={e => setMiles(e.target.value)} required type='text' name='miles' autoComplete='off' className='w-full px-4 py-2 text-lg bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700'  />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor='oiltype' className='text-lg'>Oil Type</label>
                        <input onChange={e => setOiltype(e.target.value)} required type='text' name='oiltype' autoComplete='off' className='w-full px-4 py-2 text-lg bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700'  />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor='price' className='text-lg'>Price</label>
                        <input onChange={e => setPrice(e.target.value)} required type='text' name='price' autoComplete='off' className='w-full px-4 py-2 text-lg bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-700'  />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className='px-10 py-1 mt-10 text-xl text-white transition-all bg-blue-500 rounded-md shadow-md hover:scale-105'>Create Log</button>
                </div>
            </form>
        </div>
    </div>
  )
}
