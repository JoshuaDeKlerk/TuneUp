import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import '../componentsCss/musicPlayer.css';

function MusicPlayer({ track, tracks, setCurrentTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef(null);

  const handleNextTrack = () => {
    if (tracks.length > 0) {
      const currentIndex = tracks.findIndex(t => t.id === track?.id);
      const nextTrack = tracks[(currentIndex + 1) % tracks.length];
      setCurrentTrack(nextTrack);
    }
  };

  const handlePreviousTrack = () => {
    if (tracks.length > 0) {
      const currentIndex = tracks.findIndex(t => t.id === track?.id);
      const previousTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
      setCurrentTrack(previousTrack);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.audioUrl;
      setDuration(0);
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener('ended', handleNextTrack);
    }
  }, [audioRef]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`music-player ${isFullscreen ? 'fullscreen' : ''}`}>
      <audio ref={audioRef} />

      <div className="cover-art">
        {track?.coverArtUrl ? (
          <img src={track.coverArtUrl} alt="Cover Art" className="cover-art-image" />
        ) : (
          <div className="cover-art-placeholder"></div>
        )}
      </div>

      <div className="track-details">
        <span className="track-title">{track?.title || 'No Track Selected'}</span>
        <span className="track-artist">{track?.artist || 'Unknown Artist'}</span>
      </div>

      <FaHeart
        onClick={() => setIsFavorite(!isFavorite)}
        className={`favorite-icon ${isFavorite ? 'favorite' : ''}`}
      />

      {/* Centered controls and time-info container */}
      <div className="controls-time-container">
        <div className="centered-controls">
          <FaStepBackward onClick={handlePreviousTrack} className="control-icon" />
          {isPlaying ? (
            <FaPause onClick={handlePlayPause} className="control-icon" />
          ) : (
            <FaPlay onClick={handlePlayPause} className="control-icon" />
          )}
          <FaStepForward onClick={handleNextTrack} className="control-icon" />
        </div>

        <div className="time-info">
          <span className="current-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              setCurrentTime(e.target.value);
            }}
            className="seek-bar"
          />
          <span className="total-duration">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="volume-control">
        {isMuted ? (
          <FaVolumeMute onClick={toggleMute} className="volume-icon" />
        ) : (
          <FaVolumeUp onClick={toggleMute} className="volume-icon" />
        )}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
        {isFullscreen ? (
          <FaCompress onClick={toggleFullscreen} className="fullscreen-icon" />
        ) : (
          <FaExpand onClick={toggleFullscreen} className="fullscreen-icon" />
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
