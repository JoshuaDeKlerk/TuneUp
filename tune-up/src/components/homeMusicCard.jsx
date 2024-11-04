import React from 'react';
import '../componentsCss/homeMusicCard.css';
import oliverTray from '../assets/Stay.png';
import playIcon from '../assets/playIcon.svg';

function HomeMusicCard() {
  return (
    <div className="musicCard">
      <div className="image">
        <img src={oliverTray} alt="Music Cover" className="imageMusicCard" />
        <div className="overlay">
          <img src={playIcon} alt="Play Icon" className="playButton" /> {/* Play button as image */}
        </div>
      </div>
      <div className="text">
        <h1>Stay</h1>
        <h2>Oliver Tray</h2>
      </div>
    </div>
  );
}

export default HomeMusicCard;
