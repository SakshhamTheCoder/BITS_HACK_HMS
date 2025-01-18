import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../helpers/firebase";
import { doc, setDoc } from "firebase/firestore";
import { FaBars } from "react-icons/fa";

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
        await setDoc(doc(db, "users", userCredential.user.uid), {
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
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {loginOrRegister ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!loginOrRegister && (
            <div className="mb-4">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                required={!loginOrRegister}
              />
            </div>
          )}
          <div className="mb-4">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white font-medium rounded-lg px-4 py-2 hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            {loginOrRegister ? "Login" : "Register"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-teal-700 hover:underline w-full text-center"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
 <nav className="bg-[#14737e] text-white fixed w-[calc(100%-4rem)] shadow-lg z-10 top-9 mx-6 rounded-lg">
      <div className="relative container mx-auto px-6 flex items-center justify-between py-4">
        {/* Left Section */}
        <div className="text-xl font-bold tracking-wide">
          <Link to="/" className="hover:text-yellow-100">
            Arogyam
          </Link>
        </div>

        {/* Centered Logo */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="rounded-full bg-[#14737e] w-24 h-24 flex justify-center items-center">
            <img
              src="arogyamlogo.jpg"
              alt="Arogyam Logo"
              className="w-20 h-20 rounded-full object-contain"
            />
          </div>
        </div>

        <div className="relative">
          <FaBars
            className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {/* Dropdown Menu */}
          {isMenuOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg py-2 w-40">
              <li className="px-4 py-2 hover:bg-[#125e66] cursor-pointer">
                <Link to="/AboutUs">About Us</Link>
              </li>
              {auth.currentUser !== null ? (
                <li
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-[#125e66] cursor-pointer"
                >
                  Logout
                </li>
              ) : (
                <>
                  <li
                    className="px-4 py-2 hover:bg-[#125e66] cursor-pointer"
                    onClick={() => {
                      setIsLogin(true);
                      setIsModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[#125e66] cursor-pointer"
                    onClick={() => {
                      setIsLogin(false);
                      setIsModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Register
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
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

