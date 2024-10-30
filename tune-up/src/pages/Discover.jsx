import React, { useState } from 'react'

function Discover() {
  const [genre, setGenre] = useState('')

  // Sample tracks data (for demonstration)
  const tracks = [
    { id: 1, title: 'Song One', artist: 'Artist A', genre: 'Pop', rating: 4.5 },
    { id: 2, title: 'Song Two', artist: 'Artist B', genre: 'Rock', rating: 4.0 },
    { id: 3, title: 'Song Three', artist: 'Artist C', genre: 'Hip-Hop', rating: 4.7 },
    { id: 4, title: 'Song Four', artist: 'Artist D', genre: 'EDM', rating: 4.3 },
    // Add more sample tracks as needed
  ]

  // Filter tracks by genre if a genre is selected
  const filteredTracks = genre ? tracks.filter(track => track.genre === genre) : tracks

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Discover New Music</h1>

        {/* Genre Filter */}
        <div className="mb-6">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Filter by Genre</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Genres</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="EDM">EDM</option>
            <option value="Classical">Classical</option>
            <option value="Jazz">Jazz</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTracks.map(track => (
            <div key={track.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-1">{track.title}</h3>
              <p className="text-gray-600 mb-1">Artist: {track.artist}</p>
              <p className="text-gray-600 mb-1">Genre: {track.genre}</p>
              <p className="text-yellow-500 font-semibold">Rating: {track.rating} ⭐</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Discover
