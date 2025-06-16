// src/components/BannerSlider.jsx

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        heading: "Share Your Services Effortlessly",
        subtext:
            "Add, update, and manage your own services with ease. Unlock the full potential of your skills and connect with those who need them.",
        bgImage: "https://i.ibb.co/dsMWyRKB/service-1013724.jpg",
    },
    {
        id: 2,
        heading: "Explore Services from Others",
        subtext:
            "Browse and discover services shared by our community. Whether you need help with design, coding, or tutoring, find the perfect match here.",
        bgImage: "https://i.ibb.co/6RBbJPFY/delivery-6970072.png",
    },
    {
        id: 3,
        heading: "Book & Track Service Status",
        subtext:
            "Book services instantly and keep track of your booking status in real time. Stay informed every step of the way—from request to completion.",
        bgImage: "https://i.ibb.co/Jjfw8x5x/receptionists-5975962.jpg",
    },
];

const BannerSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);
    const delay = 5000;

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, delay);
        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex]);

    const prevSlide = () =>
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const nextSlide = () =>
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const goToSlide = (index) => setCurrentIndex(index);

    const letterVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
                ease: "easeOut",
                delay: i * 0.05,
            },
        }),
    };

    const headingContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    return (
        <div className="relative w-full h-full overflow-hidden rounded-3xl">
            <div
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative flex-shrink-0 w-full h-full flex items-center justify-start px-8 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/50 to-transparent rounded-3xl" />

                        <div className="relative z-10 ml-4 md:ml-10 p-4 md:p-8 max-w-xl md:max-w-3xl text-left">
                            <AnimatePresence exitBeforeEnter>
                                {currentIndex === slide.id - 1 && (
                                    <motion.div
                                        key={`content-${slide.id}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {/* Blue Colored Typewriter Heading */}
                                        <motion.div
                                            className="flex flex-wrap text-blue-400 font-semibold mb-4"
                                            variants={headingContainer}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {slide.heading.split("").map((char, index) => (
                                                <motion.span
                                                    key={`char-${slide.id}-${index}`}
                                                    className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl whitespace-pre"
                                                    variants={letterVariant}
                                                    custom={index}
                                                >
                                                    {char}
                                                </motion.span>
                                            ))}
                                        </motion.div>

                                        <p className="text-white mb-6 text-base sm:text-sm md:text-lg">
                                            {slide.subtext}
                                        </p>

                                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                            <button className="px-6 py-3 sm:px-8 sm:py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-black transition text-sm sm:text-base min-w-[130px]">
                                                Get It Now
                                            </button>
                                            <button className="px-6 py-3 sm:px-8 sm:py-3 text-white border border-gray-400 hover:border-white rounded-full hover:bg-gray-700 hover:text-white transition text-sm sm:text-base min-w-[130px]">
                                                Read More
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-md hover:bg-gray-100 transition"
            >
                <svg
                    className="h-8 w-8 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-md hover:bg-gray-100 transition"
            >
                <svg
                    className="h-8 w-8 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-3 w-3 rounded-full transition-all ${idx === currentIndex ? "bg-gray-800" : "bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;
