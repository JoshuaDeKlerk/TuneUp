import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase'; // Import Firebase auth
import '../componentsCss/Navbar.css';
import logo from '../assets/LogoHor.svg';

function Navbar() {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set user if logged in, null if logged out
    });
    return () => unsubscribe();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="navbar-logo">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Tune Up Logo" className="navbar-logo-icon" />
          </Link>
        </div>

        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
          <li><Link to="/upload" className="navbar-link">Upload Track</Link></li>
          <li><Link to="/discover" className="navbar-link">Discover</Link></li>
          <li><Link to="/profile" className="navbar-link">Profile</Link></li>
          {!user && <li><Link to="/login" className="navbar-link">Login</Link></li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
