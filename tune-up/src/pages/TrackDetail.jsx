import React from 'react'
import { useParams } from 'react-router-dom'

function TrackDetail() {
  const { id } = useParams() // Get track ID from the URL parameters

  // Sample data for a single track (replace with actual data fetching)
  const track = {
    id: id,
    title: 'Song Title',
    artist: 'Artist Name',
    genre: 'Pop',
    description: 'This is a sample track description. It gives more details about the song, inspiration, and other notes from the artist.',
    rating: 4.5,
    feedback: [
      { user: 'Listener123', comment: 'Amazing track! Love the vibe.', rating: 5 },
      { user: 'MusicFan98', comment: 'Nice beat, but could use a bit more bass.', rating: 4 },
    ]
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{track.title}</h1>
        <p className="text-lg text-gray-600 mb-2">Artist: {track.artist}</p>
        <p className="text-lg text-gray-600 mb-2">Genre: {track.genre}</p>
        <p className="text-yellow-500 font-semibold mb-6">Rating: {track.rating} ⭐</p>
        
        {/* Description Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Description</h2>
          <p className="text-gray-600">{track.description}</p>
        </div>

        {/* Feedback Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Feedback</h2>
          <div className="space-y-4">
            {track.feedback.map((feedback, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800">{feedback.user}</h3>
                <p className="text-yellow-500">Rating: {feedback.rating} ⭐</p>
                <p className="text-gray-600">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackDetail
