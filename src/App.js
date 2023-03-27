import React, { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './components/LandingPage'
import Modal from './components/Modal'
import DashboardSettings from './components/DashboardSettings'
import EditCard from './components/EditCard'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [oilLogs, setOilLogs] = useState([])
  const [darkmode, setDarkmode] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <BrowserRouter>
      <div className={`font-Nunito overflow-x-hidden ${darkmode ? 'dark' : ''}`}>
        {isModalOpen && <div onClick={() => {setIsModalOpen(false)}} className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
          <Modal setIsModalOpen={setIsModalOpen} oilLogs={oilLogs} setOilLogs={setOilLogs} />
        </div>}
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard setIsModalOpen={setIsModalOpen} oilLogs={oilLogs} setOilLogs={setOilLogs} darkmode={darkmode} setDarkmode={setDarkmode} showSidebar={showSidebar} setShowSidebar={setShowSidebar} /></PrivateRoute>}>
            <Route path='settings' element={<DashboardSettings />} />
            <Route path='editcard' element={<EditCard />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
