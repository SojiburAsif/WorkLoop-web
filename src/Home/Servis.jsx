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
  FaClock,
  FaThumbsUp,
} from 'react-icons/fa';
import { MdSchedule } from 'react-icons/md';
import { ThemeContext } from '../Them/ThemProvider';

const ServiceFeatures = () => {
  const { theme } = useContext(ThemeContext);

  const iconColor = theme === 'dark' ? 'text-white' : 'text-black';

  const features = [
    {
      title: 'Scheduled',
      icon: <MdSchedule className={`text-5xl ${iconColor}`} />,
      description: 'We ensure timely and scheduled services for your convenience.',
    },
    {
      title: 'Verified Partners',
      icon: <FaHandshake className={`text-5xl ${iconColor}`} />,
      description: 'Our partners are carefully vetted to guarantee quality.',
    },
    {
      title: 'Service Warranty',
      icon: <FaShieldAlt className={`text-5xl ${iconColor}`} />,
      description: 'We offer warranty to secure your satisfaction and trust.',
    },
    {
      title: 'Transparent Pricing',
      icon: <FaMoneyBillWave className={`text-5xl ${iconColor}`} />,
      description: 'No hidden fees—clear pricing so you know what to expect.',
    },
    {
      title: 'Online Payments',
      icon: <FaCreditCard className={`text-5xl ${iconColor}`} />,
      description: 'Easy and secure online payment options for all services.',
    },
    {
      title: 'Support',
      icon: <FaHeadset className={`text-5xl ${iconColor}`} />,
      description: '24/7 customer support to assist you anytime.',
    },
    {
      title: 'Expert Tools',
      icon: <FaTools className={`text-5xl ${iconColor}`} />,
      description: 'Our experts use the best tools to deliver quality work.',
    },
    {
      title: 'Mobile Friendly',
      icon: <FaMobileAlt className={`text-5xl ${iconColor}`} />,
      description: 'Book and manage services easily via mobile devices.',
    },
    // নতুন ২টি ফিচার
    {
      title: 'Quick Response',
      icon: <FaClock className={`text-5xl ${iconColor}`} />,
      description: 'We respond quickly to your inquiries and requests.',
    },
    {
      title: 'Customer Satisfaction',
      icon: <FaThumbsUp className={`text-5xl ${iconColor}`} />,
      description: 'Our top priority is to keep every customer happy and satisfied.',
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
    <div>
      <section
        className={`${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        } py-12`}
      >
        <div className="max-w-7xl mx-auto  mt-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-3">Why Choose Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We are committed to providing top-notch services with transparency, professionalism, and customer satisfaction at the forefront.
            </p>
          </motion.div>

          <motion.div
            className="flex  flex-wrap gap-8 justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`rounded-lg p-6 text-center ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                } flex-grow flex-shrink basis-[220px] max-w-[220px] flex flex-col justify-start items-center`}
                variants={cardVariants}
                whileHover={{
                  boxShadow: '0px 8px 20px rgba(0,0,0,0.08)',
                }}
              >
                <motion.div className="flex justify-center mb-4" {...iconJitter(index * 0.2)}>
                  {feature.icon}
                </motion.div>

                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceFeatures;
