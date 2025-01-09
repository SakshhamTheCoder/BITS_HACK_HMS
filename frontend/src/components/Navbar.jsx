import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../helpers/firebase";

function Modal({ loginOrRegister, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginOrRegister) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        db.collection("users").doc(userCredential.user.uid).set({
          email: email,
          displayName: username,
          uid: userCredential.user.uid,
          createdAt: new Date(),
        });
        alert("Registered successfully!");
      }
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-gradient-to-br from-white to-gray-100 p-8 rounded-2xl shadow-2xl w-96 relative">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">
          {loginOrRegister ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!loginOrRegister && (
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                required={!loginOrRegister}
              />
            </div>
          )}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white font-medium rounded-lg px-4 py-3 hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            {loginOrRegister ? "Login" : "Register"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-6 text-teal-700 hover:underline w-full text-center font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-teal-700 to-teal-800 text-white fixed w-full shadow-lg z-10 top-0">
        <div className="container mx-auto px-6 flex justify-between items-center py-4">
          <div className="text-2xl font-bold tracking-wide hover:scale-110 transition-transform duration-300">
            <Link to="/" className="hover:text-yellow-100">
              Arogyam
            </Link>
          </div>
          <ul className="hidden md:flex space-x-6 items-center">
            <li className="cursor-pointer hover:text-yellow-200 transition duration-300 tracking-wide">
              <Link to="#about">About Us</Link>
            </li>
            {auth.currentUser !== null ? (
              <li
                onClick={handleLogout}
                className="cursor-pointer hover:text-yellow-200 transition duration-300 tracking-wide"
              >
                Logout
              </li>
            ) : (
              <>
                <li
                  className="cursor-pointer hover:text-yellow-200 transition duration-300 tracking-wide"
                  onClick={() => {
                    setIsLogin(true);
                    setIsModalOpen(true);
                  }}
                >
                  Login
                </li>
                <li
                  className="cursor-pointer hover:text-yellow-200 transition duration-300 tracking-wide"
                  onClick={() => {
                    setIsLogin(false);
                    setIsModalOpen(true);
                  }}
                >
                  Register
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      {isModalOpen && (
        <Modal
          loginOrRegister={isLogin}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;


