import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import LocationTracker from './components/LocationTracker';
import Appointment from './pages/Appointment';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './helpers/firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Navigate } from 'react-router-dom';
import Schedule from './pages/Schedule';
import AboutUs from './components/AboutUs';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <Router>
      {/* React-toastify container with custom styling */}
      <ToastContainer
        // position="top-center"
        // autoClose={3000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="colored"
        // toastStyle={{
        //   backgroundColor: '#14737e',
        //   color: '#fff'
        // }}
      />
      
      <Navbar visible={
        (window.location.pathname !== '' || window.location.pathname !== '/') && loggedIn
      } />
      <Routes>
        <Route path="/" element={loggedIn ? <Dashboard /> : <Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/nearby" element={<LocationTracker />} />
        <Route
          path="/appointment"
          element={loggedIn ? <Appointment /> : <Navigate to="/" />}
        />
        <Route path="/appointment/schedule" element={loggedIn ? <Schedule /> : <Navigate to="/" />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/report" element={loggedIn ? <Report /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;