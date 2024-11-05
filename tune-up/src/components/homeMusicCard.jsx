import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../componentsCss/homeMusicCard.css';
import playIcon from '../assets/playIcon.svg';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function HomeMusicCard({ track, setCurrentTrack }) {
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  const handlePlay = async () => {
    setIsLoadingAudio(true);
    try {
      const trackRef = doc(db, 'tracks', track.id);
      const trackDoc = await getDoc(trackRef);
      if (trackDoc.exists()) {
        const audioUrl = trackDoc.data().audioUrl;
        setCurrentTrack({ ...track, audioUrl });
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  return (
    <div className="musicCard" onClick={handlePlay}>
      <div className="image">
        <img src={track.coverArtUrl} alt="Music Cover" className="imageMusicCard" />
        <div className="overlay home-overlay">
          {isLoadingAudio ? (
            <div className="loading">Loading...</div>
          ) : (
            <img src={playIcon} alt="Play Icon" className="playButton" />
          )}
        </div>
      </div>
      <div className="text">
        <Link to={`/track/${track.id}`}>
          <h1>{track.title}</h1>
        </Link>
        <Link to={`/artist/${track.artist}`}>
          <h2>{track.artist}</h2>
        </Link>
      </div>
    </div>
  );
}

export default HomeMusicCard;
