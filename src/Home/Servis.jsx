import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import {
  FaHandshake,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaHeadset,
  FaTools,
  FaMobileAlt,
} from 'react-icons/fa';
import { MdSchedule } from 'react-icons/md';
import { ThemeContext } from '../Them/ThemProvider';

const ServiceFeatures = () => {
  const { theme } = useContext(ThemeContext);

  // আইকনের জন্য কালার এখন শুধু black/white
  const iconColor = theme === 'dark' ? 'text-white' : 'text-black';

  const features = [
    {
      title: 'Scheduled',
      icon: <MdSchedule className={`text-5xl ${iconColor}`} />,
    },
    {
      title: 'Verified Partners',
      icon: <FaHandshake className={`text-5xl ${iconColor}`} />,
    },
    {
      title: 'Service Warranty',
      icon: <FaShieldAlt className={`text-5xl ${iconColor}`} />,
    },
    {
      title: 'Transparent Pricing',
      icon: <FaMoneyBillWave className={`text-5xl ${iconColor}`} />,
    },
    {
      title: 'Online Payments',
      icon: <FaCreditCard className={`text-5xl ${iconColor}`} />,
    },
    {
      title: 'Support',
      icon: <FaHeadset className={`text-5xl ${iconColor}`} />,
    },
    {
      title: 'Expert Tools',
      icon: <FaTools className={`text-5xl ${iconColor}`} />,
    },
    {
      title: 'Mobile Friendly',
      icon: <FaMobileAlt className={`text-5xl ${iconColor}`} />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 15 },
    },
  };

  const iconJitter = (delay = 0) => ({
    animate: {
      x: [0, -8, 8, -5, 5, 0],
      y: [0, -5, 5, -3, 3, 0],
    },
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut',
      delay,
    },
  });

  return (
    <div className=" mb-13 mx-7 ">
    <section className={`${theme === 'dark' ?  'bg-black text-white rounded-2xl' : 'bg-white text-black'} py-12 mt-12`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </motion.h2>

        <motion.div
          className="flex flex-wrap gap-6 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`rounded-lg p-6 text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
              variants={cardVariants}
              whileHover={{
                boxShadow: '0px 8px 20px rgba(0,0,0,0.08)',
              }}
            >
              <motion.div
                className="flex justify-center mb-4"
                {...iconJitter(index * 0.2)}
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-lg font-semibold">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default ServiceFeatures;
