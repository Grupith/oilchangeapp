import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './components/LandingPage'


function App() {
  return (
    <BrowserRouter>
      <div className='font-Nunito'>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
