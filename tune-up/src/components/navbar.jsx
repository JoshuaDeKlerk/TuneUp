import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../componentsCss/Navbar.css'
import logo from '../assets/LogoHor.svg'

function Navbar() {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e) => setSearch(e.target.value)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo with SVG from assets */}
        <div className="navbar-logo">
          <Link to="/" className="flex items-center space-x-2">
            {/* SVG Logo */}
            <img src={logo} alt="Tune Up Logo" className="navbar-logo-icon" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
          <li><Link to="/upload" className="navbar-link">Upload Track</Link></li>
          <li><Link to="/discover" className="navbar-link">Discover</Link></li>
          <li><Link to="/profile" className="navbar-link">Profile</Link></li>
          <li><Link to="/login" className="navbar-link">Login</Link></li>
        </ul>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.9 14.32l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387a8 8 0 111.414-1.414zm-6.9-5.32a6 6 0 1112 0 6 6 0 01-12 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
