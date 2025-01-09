import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-800 to-gray-900 text-white min-h-screen flex flex-col justify-center pt-20 py-10">
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
  Meet Our Team
</motion.h1>

      {/* Member 1 */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.5,
          duration: 1.2,
          type: "spring",
          stiffness: 120,
        }}
        className="p-6 rounded-lg mb-6 flex w-full justify-start"
      >
        <motion.div
          className="bg-white w-3/5 p-6 rounded-xl shadow-2xl flex hover:scale-105 transition-transform duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Image Section */}
          <motion.div
            className="w-1/2 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <img
              src="/shree.png" // Make sure this is the correct path to your image
              alt="shree"
              className="w-43 h-42 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-1/2 pl-6 flex flex-col justify-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-teal-600 hover:text-teal-400 transition-colors duration-300">
              Shree
            </h2>
            <p className="text-sm text-teal-500">Frontend Developer</p>
            <p className="mt-4 text-gray-700 text-base">
              Worked on UI/UX and integrated the frontend with backend. Passionate about creating intuitive user interfaces & seamless experiences.
            </p>
            <motion.div
              className="flex space-x-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <a
                href="https://www.linkedin.com/in/shree-mishra-aa2351288/"
                className="text-teal-600 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://github.com/ShreeMishraa"
                className="text-teal-600 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <FaGithub size={28} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Member 2 */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1,
          duration: 1.2,
          type: "spring",
          stiffness: 120,
        }}
        className="p-6 rounded-lg mb-6 flex w-full justify-end"
      >
        <motion.div
          className="bg-white w-3/5 p-6 rounded-xl shadow-2xl flex hover:scale-105 transition-transform duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Image Section */}
          <motion.div
            className="w-1/2 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <img
              src="/navnoor.jpg" 
              className="w-35 h-30 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-1/2 pl-6 flex flex-col justify-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <h2 className="text-2xl font-bold text-teal-600 hover:text-teal-400 transition-colors duration-300">
              Navnoor Bawa
            </h2>
            <p className="text-sm text-teal-400">ML Developer</p>
            <p className="mt-4 text-gray-700 text-base">
              worked on developing various ML models for the project. Passionate about AI and ML.
            </p>
            <motion.div
              className="flex space-x-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <a
                href="https://www.linkedin.com/in/navnoorbawa/"
                className="text-teal-600 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://github.com/NavnoorBawa"
                className="text-teal-600 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <FaGithub size={28} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Member 3 */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1.5,
          duration: 1.2,
          type: "spring",
          stiffness: 120,
        }}
        className="p-6 rounded-lg mb-6 flex w-full justify-start"
      >
        <motion.div
          className="bg-white w-3/5 mr-0 p-6 rounded-xl shadow-2xl flex hover:scale-105 transition-transform duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Image Section */}
          <motion.div
            className="w-1/2 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <img
              src="/dhruv.jpeg" // Make sure this is the correct path to your image
              alt="dhruv"
              className="w-43 h-42 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-1/2 pl-6 flex flex-col justify-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <h2 className="text-2xl font-bold text-teal-600 hover:text-teal-400 transition-colors duration-300">
              Dhruv Goyal
            </h2>
            <p className="text-sm text-teal-400">backend developer</p>
            <p className="mt-4 text-gray-700 text-base"> A backend developer with a passion for building scalable and efficient systems. developed backend for this project. </p>
            
            <motion.div
              className="flex space-x-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <a
                href="https://www.linkedin.com/in/DhruvGoyalThapar/"
                className="text-teal-600 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://github.com/DhruvGoyal404"
                className="text-teal-600 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <FaGithub size={28} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Member 4 */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 2,
          duration: 1.2,
          type: "spring",
          stiffness: 120,
        }}
        className="p-6 rounded-lg mb-6 flex w-full justify-end"
      >
        <motion.div
          className="bg-white w-3/5 p-6 rounded-xl shadow-2xl flex hover:scale-105 transition-transform duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Image Section */}
          <motion.div
            className="w-1/2 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <img
              src="/sakshham.jpeg" // Make sure this is the correct path to your image
              alt="sakshham"
              className="w-43 h-42 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-1/2 pl-6 flex flex-col justify-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <h2 className="text-2xl font-bold text-teal-600 hover:text-teal-400 transition-colors duration-300">
              Sakshham Bhagat
            </h2>
            <p className="text-sm text-teal-400"> backend developer</p>
            <p className="mt-4 text-gray-700 text-base"> A backend developer with a passion for building scalable and efficient systems. developed backend for this project.
            </p>
            <motion.div
              className="flex space-x-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <a
                href="https://www.linkedin.com/in/SakshhamTheCoder"
                className="text-teal-600 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://github.com/SakshhamTheCoder"
                className="text-teal-600 hover:text-teal-400 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                <FaGithub size={28} />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;