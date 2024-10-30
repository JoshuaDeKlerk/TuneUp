import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar"
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import UploadTrack from './pages/UploadTrack'
import Discover from './pages/Discover'
import TrackDetail from './pages/TrackDetail'
import Profile from './pages/Profile'

import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadTrack />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/track/:id" element={<TrackDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
