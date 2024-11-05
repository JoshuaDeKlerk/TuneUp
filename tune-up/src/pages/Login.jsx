import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import '../css/User.css';
import logo from '../assets/SignUpLogo.svg';

function Login() {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser] = useSignInWithGoogle(auth);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    signInWithEmailAndPassword(email, password).catch((err) => {
      if (err.code === 'auth/user-not-found') {
        setEmailError('Email does not exist.');
      } else if (err.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password. Please try again.');
      } else {
        setGeneralError('An error occurred. Please try again.');
      }
    });
  };

  // Function to save Google user to Firestore if new
  const saveGoogleUserToFirestore = async (gUser) => {
    if (gUser) {
      const userRef = doc(db, "users", gUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {  // Only save if user doesn't already exist
        await setDoc(userRef, {
          userId: gUser.user.uid,
          username: gUser.user.displayName,
          email: gUser.user.email,
          profilePicURL: gUser.user.photoURL,  // Save Google profile picture URL
          createdAt: new Date(),
        });
        console.log("New Google user saved to Firestore");
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (gUser) {
      saveGoogleUserToFirestore(gUser);  // Save Google user if new
      navigate("/");
    }
  }, [user, gUser, navigate]);

  return (
    <div className="LogIn">
      <div className="logInCont">
        <form className="LogInForm" noValidate onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                autoComplete="email"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => signInWithGoogle()}
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login with Google
            </button>
          </div>
          {generalError && <p className="text-red-500 text-center mt-4">{generalError}</p>}
          <p className="text-sm text-center text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </form>
        <div className="logInLogoCont">
          <img src={logo} alt="Tune Up Logo" className="LogoIcon" />
        </div>
      </div>
    </div>
  );
}

export default Login;
