import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
