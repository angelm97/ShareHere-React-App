import React from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import ProtectedRoutes from './guards/ProtectedRoutes';

const App = () => {
  return (
    <Routes>
        <Route path='login' element={<Login />} />
        <Route  path='/*' element={<ProtectedRoutes />}>
          <Route path='/*' element={<Home />} />
        </Route>
    </Routes>
  )
}

export default App
