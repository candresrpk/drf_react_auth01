import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'


import './App.css'

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path='/'  element={<HomePage/> }   />
          <Route  path='/login' element={<LoginPage/> } />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
