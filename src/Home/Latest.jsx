import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { ThemeContext } from "../Them/ThemProvider";

const cardsData = [
  {
    id: 1,
    image: "https://i.ibb.co/39qWMqsq/sunset-2801778.jpg",
    category: "Electrician",
    title: "Certified Electricians for Safe & Reliable Service",
    shortDescription:
      "Experienced electricians ready to solve all your electrical problems quickly and safely.",
    fullDescription:
      "Our certified electricians provide comprehensive solutions for residential and commercial electrical needs. We ensure safety, reliability, and timely completion of all projects, including wiring, repairs, installations, and maintenance. Customer satisfaction is our priority.",
    btnHref: "/services/electrician",
    date: "June 1, 2025",
  },
  {
    id: 2,
    image: "https://i.ibb.co/YTK7LV9P/roofers-2891664.jpg",
    category: "AC Repair",
    title: "Instant AC Repair with Warranty",
    shortDescription:
      "Quick and reliable AC repair services with warranty and satisfaction guarantee.",
    fullDescription:
      "Our AC repair experts diagnose and fix all types of air conditioners efficiently. We offer warranty on repairs and use genuine parts to ensure long-lasting performance. Our goal is to keep you cool without any hassle.",
    btnHref: "/services/ac-repair",
    date: "June 2, 2025",
  },
  {
    id: 3,
    image: "https://i.ibb.co/cS0w446J/home-2486092.jpg",
    category: "Home Cleaning",
    title: "Deep Cleaning for Homes, Kitchens & Bathrooms",
    shortDescription:
      "Professional cleaning for every corner of your home, leaving it fresh and spotless.",
    fullDescription:
      "We provide deep cleaning services for homes, kitchens, and bathrooms using eco-friendly products and professional equipment to ensure your space is spotless and hygienic.",
    btnHref: "/services/cleaning",
    date: "June 3, 2025",
  },
  {
    id: 4,
    image:
      "https://i.postimg.cc/k56WGvXj/g5ebfedf29339e91734dcdc7d5072e878532c3056780136dda52111a63a4074a2b8c8e196c43b22e37a281977c5eb57ba2fd.jpg",
    category: "Home Repair",
    title: "Expert Repair Services for Electrical & Plumbing Issues",
    shortDescription:
      "Trusted professionals to fix your home’s electrical and plumbing problems efficiently.",
    fullDescription:
      "Our home repair experts specialize in fixing electrical and plumbing issues quickly and effectively to keep your household running smoothly.",
    btnHref: "/services/repair",
    date: "June 10, 2025",
  },
  {
    id: 5,
    image: "https://i.ibb.co/7gmMT3J/beauty.jpg",
    category: "Beauty & Grooming",
    title: "Top Beauty & Grooming Services at Your Doorstep",
    shortDescription:
      "Skilled beauticians offering personalized grooming and beauty treatments.",
    fullDescription:
      "We bring professional beauty and grooming services right to your doorstep, including haircuts, skincare, and makeup by experienced beauticians.",
    btnHref: "/services/beauty",
    date: "June 15, 2025",
  },
  {
    id: 6,
    image: "https://i.ibb.co/1bKszyR/education.jpg",
    category: "Educational",
    title: "Expert Tutors for All Subjects and Levels",
    shortDescription:
      "Get help from qualified tutors for school, college, or competitive exams.",
    fullDescription:
      "Our qualified tutors provide personalized lessons in a variety of subjects to help students succeed academically and in competitive exams.",
    btnHref: "/services/education",
    date: "June 18, 2025",
  },
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
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const CardsPage = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedCard, setSelectedCard] = useState(null);

  // Theme based classes
  const bgClass = theme === "dark" ? "bg-black" : "bg-white";
  const mainTextClass = theme === "dark" ? "text-white" : "text-black";
  const subTextClass = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const badgeClass =
    theme === "dark"
      ? "badge badge-outline badge-info border-blue-500 text-blue-400"
      : "badge badge-outline badge-info border-blue-500 text-blue-600";

  const borderClass = theme === "dark" ? "border-gray-700" : "border-gray-300";

  const btnClass = theme === "dark"
    ? "bg-blue-500 hover:bg-blue-600 text-white"
    : "bg-blue-600 hover:bg-blue-700 text-white";

  const modalBgClass = theme === "dark" ? "bg-black text-white border border-gray-700" : "bg-white text-black border border-gray-300";

  const modalCloseBtnClass = theme === "dark"
    ? "bg-gray-800 hover:bg-gray-700 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-black";

  const openModal = (card) => setSelectedCard(card);
  const closeModal = () => setSelectedCard(null);

  return (
    <main className={`${bgClass} py-12 `}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl font-bold ${mainTextClass}`}>
            Our Latest Features
          </h1>
          <p className={`mt-2 ${subTextClass} max-w-2xl mx-auto`}>
            Discover our newest home services and how we’re making your life easier.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cardsData.map((card) => (
            <motion.div
              key={card.id}
              className={`${bgClass} rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[450px] border ${borderClass}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className={badgeClass}>{card.category}</span>
                  <span className={`text-sm ${subTextClass}`}>{card.date}</span>
                </div>
                <h3 className={`text-2xl font-semibold mb-2 ${mainTextClass}`}>
                  {card.title}
                </h3>
                <p className={`flex-1 mb-4 ${subTextClass}`}>
                  {card.shortDescription}
                </p>

                {/* See More Button */}
                <button
                  className={`btn ${btnClass} text-base px-6 py-2 self-start`}
                  onClick={() => openModal(card)}
                >
                  See More <FaArrowRight className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        {selectedCard && (
          <>
            <input
              type="checkbox"
              id="details-modal"
              className="modal-toggle"
              checked={true}
              readOnly
            />
            <div className="modal modal-open">
              <div className={`modal-box max-w-3xl relative ${modalBgClass}`}>
                <label
                  htmlFor="details-modal"
                  className={`btn btn-sm btn-circle absolute right-4 top-4 ${modalCloseBtnClass}`}
                  onClick={closeModal}
                >
                  ✕
                </label>
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <span className={`badge badge-info mb-2`}>
                  {selectedCard.category}
                </span>
                <h2 className="text-3xl font-bold mb-4">{selectedCard.title}</h2>
                <p className="mb-6">{selectedCard.fullDescription}</p>
                <button
                  className={`btn ${btnClass} text-base px-6 py-2 inline-flex items-center`}
                  onClick={closeModal}
                >
                  Back to Home <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default CardsPage;
