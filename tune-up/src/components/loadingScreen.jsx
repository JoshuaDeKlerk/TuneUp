// LoadingScreen.jsx
import React from 'react';
import '../componentsCss/LoadingScreen.css'; // Create a CSS file for custom styling

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading, please wait...</p>
    </div>
  );
}

export default LoadingScreen;
