import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import LocationTracker from './components/LocationTracker';
import Appointment from './pages/Appointment';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Navigate } from 'react-router-dom';

function App() {
  const auth = getAuth();
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
