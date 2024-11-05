import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import MusicPlayer from './components/MusicPlayer';
import FullScreenPlayer from './components/FullScreenPlayer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UploadTrack from './pages/UploadTrack';
import Discover from './pages/Discover';
import TrackDetail from './pages/TrackDetail';
import ArtistDetail from './pages/ArtistDetail';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef(null);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setCurrentTrack={setCurrentTrack} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadTrack />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/track/:id" element={<TrackDetail />} />
        <Route path="/artist/:artistName" element={<ArtistDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/fullscreen-player"
          element={
            <FullScreenPlayer
              track={currentTrack}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              duration={duration}
              setDuration={setDuration}
              volume={volume}
              setVolume={setVolume}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
              audioRef={audioRef}
              setCurrentTrack={setCurrentTrack}
              tracks={[]}
            />
          }
        />
      </Routes>
      <MusicPlayer
        track={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        duration={duration}
        setDuration={setDuration}
        volume={volume}
        setVolume={setVolume}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
        audioRef={audioRef}
        setCurrentTrack={setCurrentTrack}
        tracks={[]}
      />
    </div>
  );
}

export default App;
