import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useAnimation } from "framer-motion";
import { FaMapMarkedAlt, FaCalendarCheck } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

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
    <section className="bg-gradient-to-b from-black via-gray-800 to-gray-900 py-16 text-center relative pt-24">
      <div className="container mx-auto">
        <Slider {...sliderSettings}>
          <div>
            <img
              src="/pic1.jpeg"
              alt=""
              className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src="/pic2.jpeg"
              alt=""
              className="w-full h-[450px] object-cover mx-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <img
              src="/pic3.jpeg"
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
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -50, rotate: -10, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
      },
    },
  };

  return (
    <section
      id="dashboard"
      ref={ref}
      className="py-16 bg-gradient-to-b from-gray-800 via-gray-950 to-gray-900"
    >
      <div className="container mx-auto">
        {/* Creative Section Heading */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-5xl justify-center text-center md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-teal-600 to-gray-300 inline-block tracking-wide"
            initial={{ rotate: 0, scale: 1, textShadow: "none" }} // Initial state
            whileHover={{
              scale: 1.1,
              rotate: 5,
              textShadow: "0px 0px 12px rgba(0, 150, 130, 0.8)", // Effects while hovering
              transition: {
                duration: 1, // Duration for the hover effect
                type: "spring", // Smooth spring transition
              }
            }}
            animate={{
              rotate: 0, // Reset rotation after hover
              scale: 1, // Reset scale after hover
              textShadow: "none", // Reset text shadow after hover
              transition: {
                duration: 1, // Duration for the reset effect
                delay: 1, // Delay the reset effect to start after 1 second
                type: "spring", // Smooth spring transition
              }
            }}
          >
            Why Choose Us?
          </motion.h1>

        </motion.div>

        {/* Section Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="px-6 md:px-20"
        >
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 text-center mb-12 leading-relaxed"
          >
            Our platform provides cutting-edge solutions for your healthcare
            needs, ensuring convenience and efficiency at every step.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Feature 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center bg-gray-700 rounded-full w-16 h-16 mb-6">
                <FaMapMarkedAlt className="text-teal-500 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                Nearby Hospital Locator
              </h3>
              <p className="text-gray-400 mb-6">
                Tracks and displays nearby hospitals for emergencies or routine
                care.
              </p>
              <Link to="/nearby">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(15, 130, 115)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition duration-300"
                >
                  Explore
                </motion.button>
              </Link>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center bg-gray-700 rounded-full w-16 h-16 mb-6">
                <FaCalendarCheck className="text-teal-500 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                Appointment Scheduling
              </h3>
              <p className="text-gray-400 mb-6">
                Easily schedule, reschedule, or cancel appointments with a few
                clicks.
              </p>
              <Link to="/appointment">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(15, 130, 115)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition duration-300"
                >
                  Explore
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center bg-gray-700 rounded-full w-16 h-16 mb-6">
                <FaCalendarCheck className="text-teal-500 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-4">
                Report Analysis
              </h3>
              <p className="text-gray-400 mb-6">
                Analyse your reports and get a detailed summary about your health!
              </p>
              <Link to="/report">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgb(15, 130, 115)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition duration-300"
                >
                  Explore
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}

export default Home;
