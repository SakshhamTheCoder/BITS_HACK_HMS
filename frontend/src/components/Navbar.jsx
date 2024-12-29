import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      } else {
        // Register
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Update the username
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
    <div className="z-50 sticky bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {loginOrRegister ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!loginOrRegister && (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required={!loginOrRegister} // Required only for register
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-700 text-white rounded-lg px-4 py-2 hover:bg-teal-600 transition duration-300"
          >
            {loginOrRegister ? "Login" : "Register"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-teal-700 hover:underline"
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
      <nav className="bg-teal-700 text-white shadow-md fixed w-full z-10 top-0">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <div className="text-2xl font-semibold">Hospital Management</div>
          <ul className="hidden md:flex space-x-6">
            <li className="hover:text-teal-100">
              <Link to="#about">About Us</Link>
            </li>
            {auth.currentUser !== null ? (
              <li
                onClick={handleLogout}
                className="hover:text-teal-100 cursor-pointer"
              >
                Logout
              </li>
            ) : (
              <>
                <li
                  className="hover:text-teal-100 cursor-pointer"
                  onClick={() => {
                    setIsLogin(true);
                    setIsModalOpen(true);
                  }}
                >
                  Login
                </li>
                <li
                  className="hover:text-teal-100 cursor-pointer"
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
