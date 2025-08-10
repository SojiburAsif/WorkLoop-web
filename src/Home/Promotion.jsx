import React, { useContext, useState } from "react";
import { ThemeContext } from "../Them/ThemProvider";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const promotions = [
    {
        id: 1,
        category: "Home Services",
        title: "SEO-promotion",
        description: "We attract a huge flow of customers to your website from Google",
        price: "Starting from 340$/month",
    },
    {
        id: 2,
        category: "Marketing",
        title: "Contextual advertising",
        description: "We make the sales skyrocket using advertising in Google",
        price: "Starting from 300$/month",
    },
    {
        id: 3,
        category: "Social",
        title: "Social media promotion",
        description: "We create a community around your business",
        price: "Starting from 350$/month",
    },
];

const Promotion = () => {
    const { theme } = useContext(ThemeContext);
    const [modalData, setModalData] = useState(null);

    const bgClass = theme === "dark" ? "bg-base-100" : "bg-white";
    const modalBgClass = theme === "dark" ? "bg-neutral" : "bg-white";

    return (
        <section className={`${bgClass} px-6 bg-black`}>
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-4xl font-extrabold mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    Tools for Promotion
                </motion.h2>

                <motion.p
                    className="text-center text-gray-500 max-w-xl mx-auto mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Discover our powerful promotion tools designed to boost your business growth and attract more customers.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {promotions.map(({ id, category, description, price }, index) => (
                        <motion.div
                            key={id}
                            className={`card cursor-pointer`}
                            onClick={() => setModalData({ category, description, price })}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="card-body text-left">
                                <h3 className="card-title text-xl p-1 hover:bg-blue-600 font-semibold">{category}</h3>
                                <p className="text-base-content p-1 hover:bg-blue-600 text-left text-lg">{description}</p>
                                <p className="font-semibold mt-4 text-left p-1 hover:bg-blue-600 text-lg">{price}</p>
                                <button className="link link-info btn-md mt-2 text-blue-500 hover:text-primary-focus text-left flex items-center space-x-2">
                                    <span>Learn more</span>
                                    <FaArrowRight className="text-blue-500" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalData && (
                    <motion.div
                        className="modal modal-open modal-bottom sm:modal-middle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={`modal-box ${modalBgClass} text-base-content relative`}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <button
                                onClick={() => setModalData(null)}
                                className="btn btn-sm btn-circle absolute right-2 top-2"
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                            <h3 className="font-bold text-lg">{modalData.category}</h3>
                            <p className="py-4">{modalData.description}</p>
                            <p className="font-semibold">{modalData.price}</p>
                        </motion.div>

                        <motion.div
                            className="modal-backdrop"
                            onClick={() => setModalData(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Promotion;
