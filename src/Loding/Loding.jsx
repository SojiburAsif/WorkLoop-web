// src/components/ServicesLoader.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBolt, FaSnowflake, FaBroom } from 'react-icons/fa';

const icons = [
  { component: <FaBolt />, name: 'Electrician' },
  { component: <FaSnowflake />, name: 'AC Repair' },
  { component: <FaBroom />, name: 'Home Cleaning' },
];

const iconVariants = {
  enter: { opacity: 0, scale: 0.8 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, scale: 1.2, transition: { duration: 0.5 } },
};

const ServicesLoader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % icons.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="relative text-white text-6xl w-24 h-24 flex items-center justify-center">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={icons[index].name}
            variants={iconVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute"
          >
            {icons[index].component}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p
        className="mt-6 text-white text-xl font-semibold"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading services...
      </motion.p>
    </div>
  );
};

export default ServicesLoader;
