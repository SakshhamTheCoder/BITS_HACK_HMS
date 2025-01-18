import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signOut,
} from "firebase/auth";
import { auth, } from "../helpers/firebase";
import { FaBars } from "react-icons/fa";


function Navbar({ visible }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

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
  if (!visible) {
    return null;
  }
  return (
    <>
      <nav className="bg-[#14737e] text-white fixed w-[calc(100%-4rem)] shadow-lg z-10 top-9 mx-6 rounded-lg">
        <div className="relative container mx-auto px-6 flex items-center justify-between py-4 z-20">
          {/* Left Section */}
          <div className="text-xl font-bold tracking-wide z-20">
            <Link to="/" className="hover:text-yellow-100">
              Arogyam
            </Link>
          </div>

          {/* Centered Logo */}
          <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none">
            <div className="rounded-full bg-[#14737e] w-24 h-24 flex justify-center items-center">
              <img
                src="arogyamlogo.jpg"
                alt="Arogyam Logo"
                className="w-20 h-20 rounded-full object-contain"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="relative z-20">
            <FaBars
              className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg py-2 w-40">
                <li
                  className="px-4 py-2 hover:bg-[#125e66] cursor-pointer"
                  onClick={() => navigate('/AboutUs')}
                >
                  About Us
                </li>
                <li
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-[#125e66] cursor-pointer"
                >
                  Logout
                </li>
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

