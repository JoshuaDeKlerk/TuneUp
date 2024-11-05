// App.js
import React, { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UploadTrack from './pages/UploadTrack';
import Discover from './pages/Discover';
import TrackDetail from './pages/TrackDetail';
import Profile from './pages/Profile';
import MusicPlayer from './components/musicPlayer';

import './App.css';

function App() {
  const location = useLocation();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // State to control play status
  const [tracks, setTracks] = useState([]);

  const hideMusicPlayer = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} setTracks={setTracks} setIsPlaying={setIsPlaying} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadTrack />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/track/:id" element={<TrackDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideMusicPlayer && <MusicPlayer track={currentTrack} tracks={tracks} setCurrentTrack={setCurrentTrack} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
    </div>
  );
}

export default App;
