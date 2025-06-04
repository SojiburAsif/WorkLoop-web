import React, { useState, useEffect, useRef } from "react";

const slides = [
    {
        id: 1,
        heading: "Share Your Services Effortlessly",
        subtext: "Add, update, and manage your own services with ease. Unlock the full potential of your skills and connect with those who need them.",
        bgImage: "https://pixabay.com/get/gd01ce4cb3d4a0468e832d2e94de4c305e3a3a1be5fcd59a439f8e650324461182661db81dffbc5b30614abe2ff1f84ebaa7be531a938aceff55b077ee48f79a3_1280.jpg",
    },
    {
        id: 2,
        heading: "Explore Services from Others",
        subtext: "Browse and discover services shared by our community. Whether you need help with design, coding, or tutoring, find the perfect match here.",
        bgImage: "https://pixabay.com/get/g1b7a362933c762a27e35901673c5d61cd2de6cd28c2509d3a01f59552a0dbf54518c5546822c4ead543ac8fcdd1433cbec6ad541d113455e799174df111e1dde_1280.jpg",
    },
    {
        id: 3,
        heading: "Book & Track Service Status",
        subtext: "Book services instantly and keep track of your booking status in real time. Stay informed every step of the way—from request to completion.",
        bgImage: "https://pixabay.com/get/g343faee7059382748149d68c1aba2e987ec0b2e7264f1beb3eb77aee1941834c012094ab3de044a3f532b4ca5378cac6592fb3cff0354d61c837a0b096ef4896_1280.jpg",
    },
];

const BannerSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);
    const delay = 5000;

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, delay);

        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex]);

    const prevSlide = () =>
        setCurrentIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    const nextSlide = () =>
        setCurrentIndex((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
        );
    const goToSlide = (index) => setCurrentIndex(index);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-3xl">
            {/* Slides Container */}
            <div
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative flex-shrink-0 w-full h-full flex items-center justify-start px-8 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.bgImage})` }}>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/50 to-transparent rounded-3xl"></div>



                        {/* Content Card */}
                        <div className="relative z-10 bg-opacity-70 rounded-xl ml-9 md:ml-14 p-4 md:p-8 max-w-xl md:max-w-3xl text-left">
                            <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                                {slide.heading}
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-6">
                                {slide.subtext}
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <button className="px-6 py-3 sm:px-8 sm:py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-black transition text-sm sm:text-base min-w-[130px]">
                                    Get It Now
                                </button>
                                <button className="px-6 py-3 sm:px-8 sm:py-3 text-white border border-gray-400 hover:border-white rounded-full hover:bg- hover:text-white transition text-sm sm:text-base min-w-[130px]">
                                    Read More
                                </button>

                            </div>
                        </div>



                    </div>
                ))}
            </div>

            {/* Prev Arrow */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 text-gray-800 shadow-md transition"
                aria-label="Previous Slide"
            >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            {/* Next Arrow */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 text-gray-800 transition"
                aria-label="Next Slide"
            >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-3 w-3 rounded-full transition-all ${idx === currentIndex
                            ? "bg-gray-800"
                            : "bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;
