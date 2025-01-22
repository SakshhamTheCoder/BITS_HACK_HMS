import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="bg-gray-600 text-white min-h-screen flex flex-col items-center py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="w-full max-w-[1400px] mt-12 sm:mt-16 mb-20">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-teal-600 to-gray-300 text-center tracking-wide mb-16 sm:mb-20 pt-8 sm:pt-0"
          initial={{ rotate: 0, scale: 1, textShadow: "none" }}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            textShadow: "0px 0px 12px rgba(0, 150, 130, 0.8)",
            transition: { duration: 1, type: "spring" }
          }}
          animate={{
            rotate: 0,
            scale: 1,
            textShadow: "none",
            transition: { duration: 1, delay: 1, type: "spring" }
          }}
        >
          Meet Our Team
        </motion.h1>

        <div className="space-y-16 sm:space-y-20">
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
            className="flex justify-start w-full px-4 sm:px-8"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm w-full sm:w-[90%] md:w-3/4 p-8 sm:p-10 rounded-xl shadow-2xl min-h-[320px] sm:min-h-[360px]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center">
                <div className="w-44 h-44 sm:w-52 sm:h-52 flex-shrink-0">
                  <img
                    src="/shree.jpeg"
                    alt="team member"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 space-y-4 sm:space-y-5 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 hover:text-teal-400 transition-colors duration-300">
                    Shree
                  </h2>
                  <p className="text-base sm:text-lg text-teal-500">Frontend Developer</p>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Worked on UI/UX and integrated the frontend with backend. Passionate about creating intuitive user interfaces & seamless experiences.
                  </p>
                  <div className="flex justify-center sm:justify-start space-x-6">
                    <a
                      href="https://www.linkedin.com/in/shree-mishra-aa2351288/"
                      className="text-teal-600 hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={32} />
                    </a>
                    <a
                      href="https://github.com/ShreeMishraa"
                      className="text-teal-600 hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={32} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Member 2 */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1,
              duration: 1.2,
              type: "spring",
              stiffness: 120,
            }}
            className="flex justify-end w-full px-4 sm:px-8"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm w-full sm:w-[90%] md:w-3/4 p-8 sm:p-10 rounded-xl shadow-2xl min-h-[320px] sm:min-h-[360px]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center">
                <div className="w-44 h-44 sm:w-52 sm:h-52 flex-shrink-0">
                  <img
                    src="/navnoor.jpg"
                    alt="team member"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 space-y-4 sm:space-y-5 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 hover:text-teal-400 transition-colors duration-300">
                    Navnoor Bawa
                  </h2>
                  <p className="text-base sm:text-lg text-teal-500">ML Developer</p>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Worked on developing various ML models for the project. Passionate about AI and ML.
                  </p>
                  <div className="flex justify-center sm:justify-start space-x-6">
                    <a
                      href="https://www.linkedin.com/in/navnoorbawa/"
                      className="text-teal-600 hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={32} />
                    </a>
                    <a
                      href="https://github.com/NavnoorBawa"
                      className="text-teal-600 hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={32} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Member 3 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.5,
              duration: 1.2,
              type: "spring",
              stiffness: 120,
            }}
            className="flex justify-start w-full px-4 sm:px-8"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm w-full sm:w-[90%] md:w-3/4 p-8 sm:p-10 rounded-xl shadow-2xl min-h-[320px] sm:min-h-[360px]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center">
                <div className="w-44 h-44 sm:w-52 sm:h-52 flex-shrink-0">
                  <img
                    src="/dhruv.jpg"
                    alt="team member"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 space-y-4 sm:space-y-5 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 hover:text-teal-400 transition-colors duration-300">
                    Dhruv Goyal
                  </h2>
                  <p className="text-base sm:text-lg text-teal-500">Backend Developer</p>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    A backend developer with a passion for building scalable and efficient systems. Developed backend for this project.
                  </p>
                  <div className="flex justify-center sm:justify-start space-x-6">
                    <a
                      href="https://www.linkedin.com/in/DhruvGoyalThapar/"
                      className="text-teal-600 hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={32} />
                    </a>
                    <a
                      href="https://github.com/DhruvGoyal404"
                      className="text-teal-600 hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={32} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Member 4 */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 2,
              duration: 1.2,
              type: "spring",
              stiffness: 120,
            }}
            className="flex justify-end w-full px-4 sm:px-8"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm w-full sm:w-[90%] md:w-3/4 p-8 sm:p-10 rounded-xl shadow-2xl min-h-[320px] sm:min-h-[360px]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-center">
                <div className="w-44 h-44 sm:w-52 sm:h-52 flex-shrink-0">
                  <img
                    src="/sakshham.jpg"
                    alt="team member"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 space-y-4 sm:space-y-5 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 hover:text-teal-400 transition-colors duration-300">
                    Sakshham Bhagat
                  </h2>
                  <p className="text-base sm:text-lg text-teal-500">Backend Developer</p>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    A backend developer with a passion for building scalable and efficient systems. Developed backend for this project.
                  </p>
                  <div className="flex justify-center sm:justify-start space-x-6">
                    <a
                      href="https://www.linkedin.com/in/SakshhamTheCoder"
                      className="text-teal-600 hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin size={32} />
                    </a>
                    <a
                      href="https://github.com/SakshhamTheCoder"
                      className="text-teal-600 hover:text-teal-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={32} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;