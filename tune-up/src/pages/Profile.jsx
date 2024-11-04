import React from 'react';
import { auth, db } from '../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Delete user document from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);

        // Delete user from Firebase Authentication
        await user.delete();

        // Navigate to the homepage after deletion
        navigate('/');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while trying to delete your account.');
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">{user?.displayName || "User"}</h2>
          <p className="text-gray-600">Music enthusiast and upcoming artist. I love creating and sharing music with the world.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Tracks</h2>
          {/* Your tracks list here */}
        </div>

        {/* Delete User Button */}
        <button
          onClick={handleDeleteUser}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;
