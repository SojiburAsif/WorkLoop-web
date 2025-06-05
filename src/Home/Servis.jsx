import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHandshake,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaHeadset,
} from 'react-icons/fa';
import { MdSchedule } from 'react-icons/md';

const ServiceFeatures = () => {
  const features = [
    {
      title: 'Scheduled',
      icon: <MdSchedule className="text-5xl text-blue-600" />,
    },
    {
      title: 'Verified Partners',
      icon: <FaHandshake className="text-5xl text-green-600" />,
    },
    {
      title: 'Service Warranty',
      icon: <FaShieldAlt className="text-5xl text-purple-600" />,
    },
    {
      title: 'Transparent Pricing',
      icon: <FaMoneyBillWave className="text-5xl text-yellow-600" />,
    },
    {
      title: 'Online Payments',
      icon: <FaCreditCard className="text-5xl text-indigo-600" />,
    },
    {
      title: 'Support',
      icon: <FaHeadset className="text-5xl text-red-600" />,
    },
  ];

  // কার্ডগুলো স্ট্যাটিক থেকে ভিজ্যিবল এন্ট্রি এনিমেশন
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // কার্ডগুলো একে অপরের পরপর এন্ট্রি হবে
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

  // আইকনগুলোর জন্য জিটার/বাউন্স অ্যানিমেশন সেটিংস
  const iconJitter = (delay = 0) => ({
    animate: {
      x: [0, -8, 8, -5, 5, 0],   // বাঁ-পাশে সামান্য সরল, ফিরে আসা
      y: [0, -5, 5, -3, 3, 0],    // ঊর্ধ্ব-নিম্ন সামান্য বাউন্স
    },
    transition: {
      repeat: Infinity,           // অনন্তকাল পুনরাবৃত্তি
      duration: 3,                // পুরো সাইকেল ৩ সেকেন্ডে
      ease: 'easeInOut',          // মসৃণ ইজিং
      delay,                      // প্রতিটি কার্ডে স্ট্যাগার করে শুরু
    },
  });

  return (
    <section className="bg-white py-12 mt-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* শিরোনাম এন্ট্রি অ্যানিমেশন */}
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </motion.h2>

        {/* কার্ডগুলো দিয়ে একটা flex কনটেইনার */}
        <motion.div
          className="flex flex-nowrap gap-6 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-lg p-8 text-center flex-shrink-0 w-[18%]"
              variants={cardVariants}
              /* কার্ডের উপর hover করলে সামান্য ছায়া যোগ করবে */
              whileHover={{
                boxShadow: '0px 8px 20px rgba(0,0,0,0.08)',
              }}
            >
              {/* ================= ICON WITH JITTER ANIMATION ================= */}
              <motion.div
                className="flex justify-center mb-4"
                {...iconJitter(index * 0.2)} 
                // index * 0.2 দিয়ে প্রতিটি আইকনে স্ট্যাগার করা হবে (পারস্পরিক 0.2s দেরি)
              >
                {feature.icon}
              </motion.div>

              {/* সার্ভিসের শিরোনাম */}
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
