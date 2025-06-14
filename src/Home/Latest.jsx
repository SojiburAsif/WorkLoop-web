// src/pages/CardsPage.jsx

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../Them/ThemProvider';

const cardsData = [
  {
    image: 'https://i.ibb.co/39qWMqsq/sunset-2801778.jpg',
    category: 'Electrician',
    title: 'Certified Electricians for Safe & Reliable Service',
    btnHref: '/services/electrician',
    date: 'June 1, 2025',
  },
  {
    image: 'https://i.ibb.co/YTK7LV9P/roofers-2891664.jpg',
    category: 'AC Repair',
    title: 'Instant AC Repair with Warranty',
    btnHref: '/services/ac-repair',
    date: 'June 2, 2025',
  },
  {
    image: 'https://i.ibb.co/cS0w446J/home-2486092.jpg',
    category: 'Home Cleaning',
    title: 'Deep Cleaning for Homes, Kitchens & Bathrooms',
    btnHref: '/services/cleaning',
    date: 'June 3, 2025',
  },
  {
    image: 'https://i.ibb.co/cS0w446J/home-2486092.jpg',
    category: 'Home Cleaning',
    title: 'Deep Cleaning for Homes, Kitchens & Bathrooms',
    btnHref: '/services/cleaning',
    date: 'June 3, 2025',
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const CardsPage = () => {
  const { theme } = useContext(ThemeContext);

  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
 
  const mainTextClass = theme === 'dark' ? 'text-white' : 'text-black';

  const subTextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
 
  const badgeClass = theme === 'dark'
    ? 'badge badge-outline badge-info border-gray-500 text-gray-300'
    : 'badge badge-outline badge-info border-blue-500 text-blue-600';

  return (
    <main className={`${theme === 'dark' ? ' text-white' : 'bg-white  text-black'} py-12 mt-14 space-grotesk`}>
      <div className="max-w-[80%] mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl font-bold ${mainTextClass}`}>
            Our Latest Features
          </h1>
          <p className={`mt-2 ${subTextClass} max-w-2xl mx-auto`}>
            Discover our newest home services and how we’re making your life easier.
          </p>
        </motion.div>

        {/* Cards Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cardsData.map((card, idx) => (
            <motion.div
              key={idx}
              className={`${bgClass} rounded-lg overflow-hidden flex flex-col h-full min-h-[400px] shadow-xl`}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: theme === 'dark'
                  ? '0px 10px 20px rgba(255,255,255,0.12)'
                  : '0px 10px 20px rgba(0,0,0,0.12)',
              }}
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden group">
                <motion.img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Category and Date Row */}
                <div className="flex justify-between items-center mb-2">
                  <span className={badgeClass}>
                    {card.category}
                  </span>
                  <span className={`text-sm ${subTextClass}`}>
                    {card.date}
                  </span>
                </div>

                {/* Title */}
                <motion.h3
                  className={`text-2xl font-semibold ${mainTextClass} hover:text-blue-600 hover:underline transition`}
                  whileHover={{ color: '#1d4ed8' }}
                >
                  {card.title}
                </motion.h3>

                {/* Read More Link */}
                <div className="mt-auto pt-6">
                  <motion.a
                    href={card.btnHref}
                    className={`inline-flex text-xl items-center font-medium ${mainTextClass} hover:underline transition`}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                  >
                    Read More
                    <FaArrowRight className="ml-2 text-sm" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default CardsPage;
