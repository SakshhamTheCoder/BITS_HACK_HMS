import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from './Modal';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

function HeroSection() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="bg-teal-50 py-16 text-center relative pt-24">
      <div className="container mx-auto">
        <Slider {...sliderSettings}>
          <div><img src="image1.jpg" alt="" className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg" /></div>
          <div><img src="image2.jpg" alt="" className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg" /></div>
          <div><img src="image3.jpg" alt="" className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg" /></div>
        </Slider>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="dashboard" className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center text-teal-700 mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-teal-50 shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-teal-800 mb-3">Nearby Hospital Locator</h3>
            <p className="text-teal-600 mb-4">Tracks and displays Nearby Hospital.</p>
            <Link to="/nearby">
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300">
                Explore
              </button>
            </Link>
          </div>
          <div className="bg-teal-50 shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-teal-800 mb-3">Appointment Scheduling</h3>
            <p className="text-teal-600 mb-4">Easily schedule, reschedule, or cancel appointments.</p>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300">
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authToken') ? true : false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3500); 

    console.log("Checking authentication state:", localStorage.getItem('authToken'));
    if (localStorage.getItem('authToken')) {
      setIsAuthenticated(true);
    }

    return () => clearTimeout(timer);
  }, [isAuthenticated]);


  const handleAuthenticationChange = (authenticated) => {
    console.log('Authentication changed:', authenticated);
    setIsAuthenticated(authenticated);
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={handleAuthenticationChange} />
      <HeroSection />
      <FeaturesSection />
      <Footer />

      {/* Modal Popup for Login/Register */}
      {showModal && !isAuthenticated && <Modal showModal={showModal} setIsAuthenticated={handleAuthenticationChange} />}
    </>
  );
}

export default Home;
