import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { FaMapMarkedAlt, FaCalendarCheck } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

function HeroSection() {
  return (
    <section className="bg-white py-6 text-center relative pt-0">
        <img
          src="hms.jpg" // Add the image URL here
          alt=""
          className="w-full h-full object-cover"
        />
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
      className="py-0 bg-white text-gray-800 mt-16" 
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
            className="text-5xl justify-center text-center md:text-6xl font-extrabold text-[#14737e] bg-clip-text bg-gray-400 inline-block tracking-wide"
            initial={{ rotate: 0, scale: 1, textShadow: "none" }} // Initial state
            whileHover={{
              scale: 1.1,
              transition: {
                duration: 1, // Duration for the hover effect
                type: "spring", // Smooth spring transition
              },
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
            className="text-lg text-gray-900 text-center mb-12 leading-relaxed"
          >
            Our platform provides cutting-edge solutions for your healthcare
            needs, ensuring convenience and efficiency at every step.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-[#14737e] shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center bg-white rounded-full w-16 h-16 mb-6">
                <FaMapMarkedAlt className="text-[#14737e] text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Nearby Hospital Locator
              </h3>
              <p className="text-white mb-6">
                Tracks and displays nearby hospitals for emergencies or routine
                care.
              </p>
              <Link to="/nearby">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#FFFFFF",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-3 bg-white text-[#14737e] font-medium rounded-full hover: transition duration-300"
                >
                  Explore
                </motion.button>
              </Link>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-[#14737e] shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center bg-white rounded-full w-16 h-16 mb-6">
                <FaCalendarCheck className="text-[#14737e] text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Appointment Scheduling
              </h3>
              <p className="text-white mb-6">
                Easily schedule, reschedule, or cancel appointments with a few
                clicks.
              </p>
              <Link to="/appointment">
              <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#FFFFFF",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-3 bg-white text-[#14737e] font-medium rounded-full hover: transition duration-300"
                >
                  Explore
                </motion.button>
              </Link>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-[#14737e] shadow-md rounded-lg p-8 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center bg-white rounded-full w-16 h-16 mb-6">
                <FaCalendarCheck className="text-[#14737e] text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Report Analysis
              </h3>
              <p className="text-white mb-6">
                Analyse your reports and get a detailed summary about your
                health!
              </p>
              <Link to="/report">
              <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#FFFFFF",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-3 bg-white text-[#14737e] font-medium rounded-full hover: transition duration-300"
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

