import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


function Navbar() {
    return (
      <nav className="bg-teal-500 text-white shadow-md fixed w-full z-10 top-0">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <div className="text-2xl font-semibold">Hospital Management</div>
          <ul className="hidden md:flex space-x-6">
            <li className="hover:text-teal-100">
              <a href="#dashboard">Dashboard</a>
            </li>
            <li className="hover:text-teal-100">
              <a href="#services">Services</a>
            </li>
            <li className="hover:text-teal-100">
              <a href="#about">About Us</a>
            </li>
            <li className="hover:text-teal-100">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
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
            <div>
              <img
                src="image1.jpg"
                alt=""
                className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src=""
                alt=""
                className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src=""
                alt=""
                className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg"
              />
            </div>
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
              <p className="text-teal-600 mb-4">
                Tracks and displays Nearby Hospital.
              </p>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300">
                Explore
              </button>
            </div>
            <div className="bg-teal-50 shadow-md rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-teal-800 mb-3">Appointment Scheduling</h3>
              <p className="text-teal-600 mb-4">
                Easily schedule, reschedule, or cancel appointments.
              </p>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300">
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  function Footer() {
    return (
      <footer className="bg-teal-500 text-white py-6">
        <div className="container mx-auto text-center">
        </div>
      </footer>
    );
  }

function Home() {
    return (
      <>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </>
    );
  }
  
  export default Home;
