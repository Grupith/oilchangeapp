import React, { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import Modal from './components/Modal'


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className='font-Nunito'>
        <Navbar />
        {isModalOpen && <div onClick={() => {setIsModalOpen(false)}} className='flex items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm'>
          <Modal setIsModalOpen={setIsModalOpen} />
        </div>}
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard setIsModalOpen={setIsModalOpen} /> </PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
