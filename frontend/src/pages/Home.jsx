import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function HeroSection() {
  return (
<section className="bg-white py-6 text-center relative pt-0">
      {/* Content above the image */}
      <motion.div
        className="absolute w-2/5 top-1/4 left-24 bg-white bg-opacity-70 p-24 rounded-full shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="text-6xl font-extrabold text-[#14737e] mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Why Arogyam?
        </motion.h1>
        <motion.p
          className="text-lg font-semibold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          We streamline the flow of critical information across all departments, equipping hospitals with real-time insights to enhance patient care, optimize administration, simplify billing, manage insurance, and much more. empowering healthcare decisions with precision and efficiency.
        </motion.p>
      </motion.div>

      {/* Background image */}
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
      className="text-center mb-0"
    >
      <motion.h1
        className="text-3xl justify-center text-center md:text-4xl font-extrabold text-[#14737e] bg-clip-text bg-gray-400 inline-block tracking-wide"
        initial={{ rotate: 0, scale: 1, textShadow: "none" }}
        whileHover={{
          scale: 1.1,
          transition: {
            duration: 1,
            type: "spring",
          },
        }}
      >
        Comprehensive Hospital Management Solutions That Help You Focus on What
        Truly Matters ~ "Your Patients"
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
        className="text-xl text-gray-900 text-center mt-12 mb-12 leading-relaxed"
      >
        Our platform provides cutting-edge solutions designed to meet the
        diverse healthcare needs of hospitals and healthcare providers. By
        integrating advanced technologies, we ensure seamless operations,
        reducing manual processes, and enhancing patient care. From patient
        registration to billing and discharge, our system streamlines every
        step, offering unparalleled convenience and operational efficiency.
      </motion.p>
    </motion.div>

    {/* Feature Blocks */}
    <motion.div
      className="mt-12 space-y-16"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Feature 1 */}
      <motion.div
        className="flex flex-col md:flex-row items-center"
        variants={itemVariants}
      >
        <motion.img
          src="img1.jpeg"
          alt=""
          className="w-4/5 md:w-4/5 rounded-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="md:ml-8">
          <motion.h2
            className="text-3xl font-extrabold text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nearby Hospital Locator
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg mt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Finding the right hospital became effortless using our advanced GPS
            and real-time data, we provide tailored recommendations based on
            specialties, services, and reviews. With precise navigation and
            live updates, we ensure stress-free, quick access to quality
            healthcare facilities when you need it most.
          </motion.p>
        </div>
      </motion.div>

      {/* Feature 2 */}
      <motion.div
        className="flex flex-col md:flex-row-reverse items-center"
        variants={itemVariants}
      >
        <motion.img
          src="img2.jpeg"
          alt=""
          className="w-4/5 md:w-4/5 rounded-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="md:mr-8">
          <motion.h2
            className="text-3xl font-extrabold text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Appointment Scheduling
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg mt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Book appointments hassle-free with our Appointment Scheduling
            feature. View real-time doctor availability, confirm bookings
            instantly, and reschedule effortlessly. Automated reminders and a
            seamless interface ensure a smooth healthcare experience, saving
            you time and eliminating long waits.
          </motion.p>
        </div>
      </motion.div>

      {/* Feature 3 */}
      <motion.div
        className="flex flex-col md:flex-row items-center"
        variants={itemVariants}
      >
        <motion.img
          src="img3.jpeg"
          alt=""
          className="w-4/5 md:w-4/5 rounded-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="md:ml-8">
          <motion.h2
            className="text-3xl font-extrabold text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Report Analysis
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg mt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Make sense of your medical data with our Report Analysis tool. Get
            clear insights, interactive visualizations, and trend comparisons
            at a glance. Powered by AI, it highlights key health patterns,
            ensures secure storage, and empowers informed decisions for better
            health management.
          </motion.p>
        </div>
      </motion.div>
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

