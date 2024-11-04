// SignUp.jsx
import React, { useState, useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from "../config/firebase";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import '../css/User.css';
import logo from '../assets/SignUpLogo.svg';
import LoadingScreen from '../components/loadingScreen';

function SignUp() {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    // Validate form fields
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    // Check if email already exists in Firestore
    const emailQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      setEmailError('This email is already associated with an account.');
      return;
    }

    // Proceed to create user in Firebase Authentication
    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);

      if (userCredential && userCredential.user) {
        const userId = userCredential.user.uid;

        // Navigate immediately after user creation
        navigate("/");

        // Save user info to Firestore in the background
        await setDoc(doc(db, "users", userId), {
          userId: userId,
          username: username,
          email: email,
          createdAt: new Date(),
        });

        console.log("User registered and saved to Firestore with userId");
      }
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setEmailError('This email is already associated with an account.');
      } else if (err.code === 'auth/invalid-email') {
        setEmailError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setPasswordError('Password must be at least 6 characters long.');
      } else {
        setGeneralError('An error occurred. Please try again.');
      }
      console.error("Error creating user:", err);
    }
  };

  // Show loading screen while user creation is in progress
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="signUp">
      <div className="signUpCont">
        <div className="logoCont">
          <img src={logo} alt="Tune Up Logo" className="LogoIcon" />
        </div>

        <form className="SignUpForm" noValidate onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username1"
                name="username"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email1"
                name="email"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                autoComplete="email"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password1"
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
              Sign Up
            </button>
          </div>
          {generalError && <p className="text-red-500 text-center mt-4">{generalError}</p>}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
