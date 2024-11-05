import React, { useEffect, useState } from 'react';
import { db, storage, auth } from '../config/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardMusicCard from '../components/dasboardMusicCard';

function Dashboard() {
  const [tracks, setTracks] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchTracks = async () => {
      if (user) {
        const q = query(collection(db, 'tracks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const tracksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTracks(tracksList);
      }
    };

    fetchTracks();
  }, [user]);

  const handleDelete = async (trackId, coverArtUrl, audioUrl) => {
    try {
      await deleteDoc(doc(db, 'tracks', trackId));

      // Delete files from storage
      if (coverArtUrl) {
        const coverRef = ref(storage, coverArtUrl);
        await deleteObject(coverRef);
      }
      if (audioUrl) {
        const audioRef = ref(storage, audioUrl);
        await deleteObject(audioRef);
      }

      setTracks(prevTracks => prevTracks.filter(track => track.id !== trackId));
      alert('Track deleted successfully!');
    } catch (error) {
      console.error('Error deleting track:', error);
      alert('Failed to delete track.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tracks.map(track => (
              <DashboardMusicCard
                key={track.id}
                track={track}
                onDelete={() => handleDelete(track.id, track.coverArtUrl, track.audioUrl)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
