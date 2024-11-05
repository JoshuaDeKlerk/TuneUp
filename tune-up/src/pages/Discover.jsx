// Discover.js
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import HomeMusicCard from '../components/HomeMusicCard';

function Discover({ setCurrentTrack, setIsPlaying }) {
  const [genre, setGenre] = useState('');
  const [tracks, setTracks] = useState([]);

  // Fetch tracks from Firestore
  useEffect(() => {
    const fetchTracks = async () => {
      const tracksCollection = collection(db, 'tracks');
      const trackSnapshot = await getDocs(tracksCollection);
      const trackList = trackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTracks(trackList);
    };

    fetchTracks();
  }, []);

  // Filter tracks by genre if a genre is selected
  const filteredTracks = genre ? tracks.filter(track => track.genre === genre) : tracks;

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
            <HomeMusicCard
              key={track.id}
              track={track}
              setCurrentTrack={(track) => {
                setCurrentTrack(track);
                setIsPlaying(true); // Start playing when the track is clicked
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discover;
