import { addDoc, collection } from 'firebase/firestore';
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
                price: price
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
        <div className='bg-white p-10 rounded-md space-y-5'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-3xl text-center pb-8 font-bold'>Create an Oil Log</h2>
                <div className='space-y-6'>
                    <div>
                        <label htmlFor='date' className='text-lg'>Date</label>
                        <DatePicker name='date' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100' selected={selectedDate} onChange={(date) => {
                            setSelectedDate(date)
                            console.log(selectedDate)
                        }} />
                    </div>
                    <div>
                        <label htmlFor='miles' className='text-lg'>Miles</label>
                        <input onChange={e => setMiles(e.target.value)} required type='text' name='miles' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100'  />
                    </div>
                    <div>
                        <label htmlFor='oiltype' className='text-lg'>Oil Type</label>
                        <input onChange={e => setOiltype(e.target.value)} required type='text' name='oiltype' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100'  />
                    </div>
                    <div>
                        <label htmlFor='price' className='text-lg'>Price</label>
                        <input onChange={e => setPrice(e.target.value)} required type='text' name='price' autoComplete='off' className='border border-gray-300 rounded-md text-lg w-full px-3 py-1 bg-gray-100'  />
                    </div>
                </div>
                <button className='text-xl bg-blue-500 text-white py-1 px-6 mt-10 rounded-md shadow-md hover:scale-105 transition-all'>Submit</button>
            </form>
        </div>
    </div>
  )
}
