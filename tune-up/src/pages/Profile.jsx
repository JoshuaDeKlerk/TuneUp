import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../config/firebase';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || 'User');
          setProfilePicURL(userDoc.data().profilePicURL || '');
          setDescription(userDoc.data().description || '');
        }
      }
    };
    fetchUserData();
  }, [user, profilePicURL]);

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);
        await user.delete();
        navigate('/');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while trying to delete your account.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out.');
    }
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleUploadProfilePic = async () => {
    if (!profilePic) return;

    const profilePicRef = ref(storage, `profile_pictures/${user.uid}`);
    try {
      await uploadBytes(profilePicRef, profilePic);
      const downloadURL = await getDownloadURL(profilePicRef);
      
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { profilePicURL: downloadURL });

      setProfilePicURL(downloadURL);
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture.');
    }
  };

  const handleDescriptionSave = async () => {
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, { description });
      setIsEditingDescription(false);
      alert('Description updated successfully!');
    } catch (error) {
      console.error('Error updating description:', error);
      alert('Failed to update description.');
    }
  };

  return (
    <div className="profileCont">
      <div className="ProfileFromCont">
        <h1 className="ProfileTitle">Profile</h1>

        <div className="profileDetails">
          {profilePicURL ? (
            <img
              src={profilePicURL}
              alt="Profile"
              key={profilePicURL} // Add key here to re-render image on URL change
              className="ProfilePic"
            />
          ) : (
            <div className="ProfilePic">
            </div>
          )}
          <div>
            <h2 className="userName">{username}</h2>
            {isEditingDescription ? (
              <div className='editDescription'>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="descriptionProfileBox"
                />
                <div className="buttonCont">
                  <button
                    onClick={handleDescriptionSave}
                    className="SaveButton save"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingDescription(false)}
                    className="SaveButton cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p
                className="descriptionProfile"
                onClick={() => setIsEditingDescription(true)}
              >
                {description}
              </p>
            )}
          </div>
          <div className="AccountOptionsButtons">
            <button
            onClick={handleLogout}
            className="LogoutButtons logout"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteUser}
              className="LogoutButtons delete"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="ProfilePicContainer">
          <label className="ProfilePicText">Upload Profile Picture</label>

          <div className="ProfilePicFormCont">
            <input type="file" onChange={handleProfilePicChange} className="FileButton" />
            <button
              onClick={handleUploadProfilePic}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Upload
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}

export default Profile;
