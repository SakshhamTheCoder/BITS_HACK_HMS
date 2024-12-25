import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Modal = ({ showModal, setShowModal, setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const modalRef = useRef(); // Ref for the modal

  // Close modal on clicking outside the modal container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, setShowModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const url = isLogin
      ? 'http://localhost:3000/api/auth/login'
      : 'http://localhost:3000/api/auth/register';

    const payload = isLogin
      ? { email, password }
      : { email, password, displayName: name }; // Include name for registration

    try {
      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      // Send request to server
      const response = await axios.post(url, payload);
      setLoading(false);

      if (response.status === 200 || response.status === 201) {
        setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
        setIsAuthenticated(true);
        localStorage.setItem('authToken', response.data.user.email); // Store token or user data

        // Close modal and reload page after a delay
        setTimeout(() => {
          setShowModal(false);
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.error || error.message || 'An error occurred. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Register'}</h2>

            {/* Message */}
            {message && (
              <p className={`mb-4 text-${message.includes('successful') ? 'green' : 'red'}-600`}>
                {message}
              </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-teal-900">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Name field only for registration */}
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-teal-900">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Password field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-teal-900">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-teal-800 text-white py-2 rounded-md hover:bg-teal-600"
                disabled={loading}
              >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
              </button>
            </form>

            {/* Toggle between login and registration */}
            <button
              onClick={toggleForm}
              className="mt-4 text-teal-800 hover:text-teal-600"
            >
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;



