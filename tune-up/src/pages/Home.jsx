import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../css/Home.css';
import HeroLogo from '../assets/HomeHeroLogo.svg';
import HomeMusicCard from '../components/HomeMusicCard';

function Home({ setCurrentTrack, setTracks }) {
  const [tracks, setLocalTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const tracksCollection = collection(db, 'tracks');
      const trackSnapshot = await getDocs(tracksCollection);
      const trackList = trackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLocalTracks(trackList);
      setTracks(trackList); // Pass tracks up to App for MusicPlayer control
    };

    fetchTracks();
  }, [setTracks]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="heroSection">
        <div className="heroLeft">
          <h1>Welcome to <b>T</b>une<b>U</b>p</h1>
          <p>Discover fresh, new music and provide feedback to upcoming artists.</p>
          <a href="/discover">Discover</a>
        </div>
        <div className="heroRight">
          <img src={HeroLogo} alt="Tune Up Logo" className="heroLogo" />
        </div>
      </section>

      <div className="featured">
        <h1>Featured</h1>
        <div className="topRated">
          <h2>Top Rated</h2>
          <div className="topRatedRow">
            {tracks.map((track) => (
              <HomeMusicCard key={track.id} track={track} setCurrentTrack={setCurrentTrack} />
            ))}
          </div>
        </div>
      </div>

      <section className="bg-gray-200 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to share your music?</h2>
          <p className="text-gray-700 mb-6">Join our community of creators and listeners today.</p>
          <a href="/signup" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600">Sign Up</a>
        </div>
      </section>
    </div>
  );
}

export default Home;
