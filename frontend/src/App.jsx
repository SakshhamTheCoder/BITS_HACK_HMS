import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import LocationTracker from './components/LocationTracker';
import Appointment from './pages/Appointment';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './helpers/firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Navigate } from 'react-router-dom';
import Schedule from './pages/Schedule';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false); // Authentication state is resolved
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show a loading indicator while checking the authentication state
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/nearby" element={<LocationTracker />} />
        <Route
          path="/appointment"
          element={loggedIn ? <Appointment /> : <Navigate to="/" />}
        />
        <Route path="/appointment/schedule" element={loggedIn ? <Schedule /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
