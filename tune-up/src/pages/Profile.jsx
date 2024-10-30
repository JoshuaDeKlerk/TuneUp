import React from 'react'

function Profile() {
  // Sample user data (replace with actual data fetching)
  const user = {
    name: 'John Doe',
    bio: 'Music enthusiast and upcoming artist. I love creating and sharing music with the world.',
    tracks: [
      { id: 1, title: 'Song One', genre: 'Pop', rating: 4.5 },
      { id: 2, title: 'Song Two', genre: 'Rock', rating: 4.0 },
      { id: 3, title: 'Song Three', genre: 'Hip-Hop', rating: 4.7 },
    ],
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>

        {/* User Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">{user.name}</h2>
          <p className="text-gray-600">{user.bio}</p>
        </div>

        {/* Uploaded Tracks Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {user.tracks.map(track => (
              <div key={track.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">{track.title}</h3>
                <p className="text-gray-500">Genre: {track.genre}</p>
                <p className="text-yellow-500 font-semibold">Rating: {track.rating} ⭐</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
