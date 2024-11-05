// Dashboard.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import HomeMusicCard from '../components/HomeMusicCard';

function Dashboard({ setCurrentTrack, setIsPlaying }) {
  const [tracks, setTracks] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchUserTracks = async () => {
      if (user) {
        try {
          const q = query(collection(db, 'tracks'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const tracksList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTracks(tracksList);
        } catch (error) {
          console.error('Error fetching user tracks:', error);
        }
      }
    };

    fetchUserTracks();
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        {tracks.length > 0 ? (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Tracks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tracks.map(track => (
                <HomeMusicCard
                  key={track.id}
                  track={track}
                  setCurrentTrack={(track) => {
                    setCurrentTrack(track);
                    setIsPlaying(true); // Start playing on click
                  }}
                />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-gray-600">You don't have any tracks yet. Start by uploading a track!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
