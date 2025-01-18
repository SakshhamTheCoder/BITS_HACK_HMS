import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaCalendarCheck } from 'react-icons/fa';

const Dashboard = () => {
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
        hidden: { opacity: 0, y: -50, scale: 0.8 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: 'easeOut',
                type: 'spring',
                stiffness: 200,
            },
        },
    };

    return (
        <div className='py-16 min-h-screen overflow-hidden'>
            <Navbar />
            <div className="mt-16 text-center">
                <motion.h1
                    variants={headingVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl font-extrabold text-gray-800 mb-8"
                >
                    Welcome to Your Dashboard
                </motion.h1>
            </div>
            {/* Section Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-6 md:px-20"
            >
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
                                    backgroundColor: '#FFFFFF',
                                }}
                                whileTap={{ scale: 0.9 }}
                                className="px-6 py-3 bg-white text-[#14737e] font-medium rounded-full hover:bg-[#0f8273] transition duration-300"
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
                                    backgroundColor: '#FFFFFF',
                                }}
                                whileTap={{ scale: 0.9 }}
                                className="px-6 py-3 bg-white text-[#14737e] font-medium rounded-full hover:bg-[#0f8273] transition duration-300"
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
                                    backgroundColor: '#FFFFFF',
                                }}
                                whileTap={{ scale: 0.9 }}
                                className="px-6 py-3 bg-white text-[#14737e] font-medium rounded-full hover:bg-[#0f8273] transition duration-300"
                            >
                                Explore
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;



