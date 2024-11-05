import React from 'react';
import '../componentsCss/dashboardMusicCard.css';

function DashboardMusicCard({ track, onDelete }) {
  return (
    <div className="dashboardMusicCard">
      <div className="image">
        <img src={track.coverArtUrl} alt="Cover Art" className="imageMusicCard" />
        <div className="dashBoardOverlay">
          <span className="genre">{track.genre}</span>
          <div className="actions">
            <button className="editButton">Edit</button>
            <button className="deleteButton" onClick={onDelete}>Remove</button>
          </div>
        </div>
      </div>
      <div className="text">
        <h1>{track.title}</h1>
        <h2>{track.artist}</h2>
      </div>
    </div>
  );
}

export default DashboardMusicCard;
