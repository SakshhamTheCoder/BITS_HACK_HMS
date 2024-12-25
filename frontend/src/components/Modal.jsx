import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ showModal, setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const url = isLogin
      ? 'http://localhost:3000/api/auth/login':'http://localhost:3000/api/auth/register';

    try {
      if (!/\S+@\S+\.\S+/.test(email)) {
        setLoading(false);
        setMessage('Please enter a valid email address.');
        return;
      }

      const payload = isLogin
        ? { email, password }
        : { email, password, displayName: name }; // Send name for registration

      const response = await axios.post(url, payload);
      setLoading(false);
      
      if (response.status === 200 || response.status === 201) {
        setMessage(isLogin ? 'Login successful!' : 'Registration successful!');
        setIsAuthenticated(true);
        localStorage.setItem('authToken', response.data.user.email); // Store auth token or user data
        setTimeout(() => window.location.reload(), 2000); // Reload page after login
      }
    } catch (error) {
      setLoading(false);
      
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(''); 
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
            {message && <p className="text-teal-600 mb-4">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-teal-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-teal-700">Name</label>
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
              <div className="mb-4">
                <label htmlFor="password" className="block text-teal-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
              </button>
            </form>
            <button
              onClick={toggleForm}
              className="mt-4 text-teal-600 hover:text-teal-800"
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
