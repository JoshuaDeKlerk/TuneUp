import React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../css/User.css';
import logo from '../assets/SignUpLogo.svg';

function SignUp() {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);

      if (userCredential && userCredential.user) {
        const userId = userCredential.user.uid;

        // Optional: reload user to avoid lookup error
        await userCredential.user.reload();

        // Save user info to Firestore
        await setDoc(doc(db, "users", userId), {
          userId: userId,
          username: username,
          email: email,
          createdAt: new Date(),
        });

        console.log("User registered and saved to Firestore with userId");
      } else {
        console.error("User creation failed, userCredential is undefined");
      }
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign Up
            </button>
          </div>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </form>

        {error && <p className="text-red-500 text-center">{error.message}</p>}
      </div>
    </div>
  );
}

export default SignUp;
