import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LocationTracker from './components/LocationTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nearby" element={<LocationTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
