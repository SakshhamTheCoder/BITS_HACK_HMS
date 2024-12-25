import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated, onLoginClick }) {
  const handleLogout = () => {
    console.log("Logging out...");
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    console.log("Token removed, state updated");
    window.location.reload();
  };

  return (
    <nav className="bg-teal-700 text-white shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="text-2xl font-semibold">Hospital Management</div>
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-teal-100"><Link to="#about">About Us</Link></li>
          <li className="hover:text-teal-100 cursor-pointer" onClick={onLoginClick}>
            Login
          </li>
          {isAuthenticated ? (
            <li
              onClick={handleLogout}
              className="hover:text-teal-100 cursor-pointer"
            >
              Logout
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

