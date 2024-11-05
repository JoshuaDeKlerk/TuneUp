import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../config/firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import imageCompression from 'browser-image-compression';
import '../css/UploadTrack.css';

function UploadTrack() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [coverArt, setCoverArt] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [artist, setArtist] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserId(user.uid);
          setArtist(userSnap.data().username);
        }
      }
    };
    fetchUserDetails();
  }, [user]);

  const handleImageCompression = async (file) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setCoverArt(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let coverArtUrl = '';
      if (coverArt) {
        const coverArtRef = ref(storage, `coverArt/${coverArt.name}`);
        await uploadBytes(coverArtRef, coverArt);
        coverArtUrl = await getDownloadURL(coverArtRef);
      }

      let audioUrl = '';
      if (audioFile) {
        const audioRef = ref(storage, `audio/${audioFile.name}`);
        await uploadBytes(audioRef, audioFile);
        audioUrl = await getDownloadURL(audioRef);
      }

      await addDoc(collection(db, 'tracks'), {
        title,
        genre,
        description,
        coverArtUrl,
        audioUrl,
        userId,
        artist,
        createdAt: new Date(),
      });

      setTitle('');
      setGenre('');
      setDescription('');
      setCoverArt(null);
      setAudioFile(null);
      alert('Track uploaded successfully!');
    } catch (error) {
      console.error("Error uploading track:", error);
      alert("Failed to upload track.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center uploadTrackCont">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg uploadTrackForm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Upload New Track</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Song Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter song name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter genre"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter a description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cover Art</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageCompression(e.target.files[0])}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isSubmitting ? "Uploading..." : "Submit Track"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadTrack;
