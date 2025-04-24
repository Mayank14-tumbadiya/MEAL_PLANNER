import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './GetStarted.css';

const GetStarted = () => {
  useEffect(() => {
    // Add a class to the body when component mounts
    document.body.classList.add('get-started-page');
    
    // Clean up function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('get-started-page');
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-200 opacity-30"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 5 + 5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-md w-full bg-white/90 backdrop-blur-sm shadow-xl rounded-lg p-8 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="absolute -top-20 left-1/2 transform -translate-x-1/2"
          variants={itemVariants}
        >
          <motion.div
            className="bg-white rounded-full shadow-lg flex items-center justify-center w-40 h-40"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="./Logo.jpg" 
              alt="NutriVista Logo" 
              className="w-25 h-25 rounded-full object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-4xl font-bold text-green-700 mt-16 mb-4"
          variants={itemVariants}
        >
          Welcome to <span className="text-green-500">NutriVista</span>
        </motion.h1>

        <motion.div 
          className="w-24 h-1 bg-green-500 mx-auto mb-6"
          variants={itemVariants}
        />

        <motion.p 
          className="text-gray-600 mb-8"
          variants={itemVariants}
        >
          Transform your health journey with personalized nutrition plans, expert guidance, and a vibrant community to support you.
        </motion.p>

        <motion.div 
          className="space-y-4"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/login"
              className="w-full border-2 text-white py-3 rounded-md hover:from-green-600 hover:to-green-700 transition-colors duration-200 block font-medium shadow-md"
            >
              Log In
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/signup"
              className="w-full border-2 border-green-500 text-green-600 py-3 rounded-md hover:bg-green-50 transition-colors duration-200 block font-medium"
            >
              Sign Up
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-8 text-sm text-gray-500 flex justify-center items-center space-x-2"
          variants={itemVariants}
        >
          <span>Already have an account?</span>
          <Link to="/login" className="text-green-600 hover:underline font-medium">
            Log in here
          </Link>
        </motion.div>

        <motion.div 
          className="mt-8 flex justify-center space-x-6"
          variants={itemVariants}
        >
          {/* <div className="text-center">
            <motion.div 
              className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2"
              whileHover={{ y: -5, backgroundColor: "#dcfce7" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </motion.div>
            <p className="text-xs text-gray-500">Personalized Plans</p>
          </div> */}
          
          {/* <div className="text-center">
            <motion.div 
              className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2"
              whileHover={{ y: -5, backgroundColor: "#dcfce7" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <p className="text-xs text-gray-500">Track Progress</p>
          </div> */}
          
          {/* <div className="text-center">
            <motion.div 
              className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2"
              whileHover={{ y: -5, backgroundColor: "#dcfce7" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>
            <p className="text-xs text-gray-500">Expert Support</p>
          </div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GetStarted;