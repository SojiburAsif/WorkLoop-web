// import React from 'react';
// import { Link, NavLink } from 'react-router';

// const Header = () => {

//     const user = {
//         name: 'John Doe',
//         photoURL: 'https://i.pravatar.cc/40'
//     };

//     return (
//         <div className="shadow-sm  ">
//             <div className="navbar bg-slate-100 min-h-[80px] px-4 ">
//                 {/* Navbar Start */}
//                 <div className="navbar-start">
//                     <div className="dropdown lg:hidden">
//                         <div tabIndex={0} role="button" className="btn btn-ghost">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
//                             <li><NavLink to="/">Home</NavLink></li>
//                             <li><NavLink to="/services">Services</NavLink></li>
//                             {user && (
//                                 <li>
//                                     <details>
//                                         <summary>Dashboard</summary>
//                                         <ul className="p-2 text-sm space-y-2">
//                                             <li><NavLink to="/add-service">Add Service</NavLink></li>
//                                             <li><NavLink to="/manage-service">Manage Service</NavLink></li>
//                                             <li><NavLink to="/booked-services">Booked Services</NavLink></li>
//                                             <li><NavLink to="/service-to-do">Service-To-Do</NavLink></li>
//                                         </ul>
//                                     </details>
//                                 </li>
//                             )}
//                         </ul>
//                     </div>
//                     <Link to="/">
//                         <img
//                             className="w-28 h-auto object-contain"
//                             src="/e9322ee7-eb8b-4e67-8f61-37f0067e70a1.png"
//                             alt="Workloop Logo"
//                         />
//                     </Link>
//                 </div>


//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1 text-lg font-medium gap-2">
//                         <li><NavLink to="/">Home</NavLink></li>
//                         <li><NavLink to="/services">Services</NavLink></li>
//                         {user && (
//                             <li>
//                                 <details>
//                                     <summary>Dashboard</summary>
//                                     <ul className="p-2 text-sm space-y-2">
//                                         <li><NavLink to="/add-service">Add Service</NavLink></li>
//                                         <li><NavLink to="/manage-service">Manage Service</NavLink></li>
//                                         <li><NavLink to="/booked-services">Booked Services</NavLink></li>
//                                         <li><NavLink to="/service-to-do">Service-To-Do</NavLink></li>
//                                     </ul>
//                                 </details>
//                             </li>
//                         )}
//                     </ul>
//                 </div>



//                 {/* Navbar End */}
//                 <div className="navbar-end gap-2">

//                     <label className="swap swap-rotate ">
//                         {/* this hidden checkbox controls the state */}
//                         <input type="checkbox" />

//                         {/* sun icon */}
//                         <svg
//                             className="swap-on h-7 w-7 fill-current"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24">
//                             <path
//                                 d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
//                         </svg>

//                         {/* moon icon */}
//                         <svg
//                             className="swap-off h-7 w-8 fill-current"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24">
//                             <path
//                                 d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
//                         </svg>
//                     </label>
//                     {/* 👇 Show Login & Register when NOT logged in */}
//                     {user && (
//                         <>
//                             <Link to="/login" className=" text-lg font-medium mx-2 hover:underline hover:text-blue-900">Login</Link>
//                             <Link
//                                 to="/register"
//                                 className=" text-lg  bg-white  font-medium  text-black  rounded-full  mx-2  px-7  py-3 transition  hover:bg-black  hover:text-white  "
//                             >
//                                 Register
//                             </Link>


//                         </>
//                     )}


//                     {!user && (
//                         <div className="dropdown dropdown-end">
//                             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//                                 <div className="w-10 rounded-full">
//                                     <img src={user.photoURL} alt="User Avatar" />
//                                 </div>
//                             </div>
//                             <ul
//                                 tabIndex={0}
//                                 className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//                                 <li>
//                                     <button className="btn btn-error w-full">Logout</button>
//                                 </li>
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header;

















import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser, googleSingIn } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get('email');
        const password = data.get('password');

        loginUser(email, password)
            .then(() => {
                toast.success('Login successful!');
                navigate('/');
            })
            .catch(() => {
                toast.error("Email or password incorrect!");
            });
    };

    const handleGoogleSignIn = () => {
        googleSingIn()
            .then(() => {
                toast.success("Google sign-in successful!");
                navigate('/');
            })
            .catch(() => {
                toast.error("Google sign-in failed!");
            });
    };

    return (
        <div className="min-h-screen roboto-font flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg bg-black">
                <div className="text-center">
                    <a href="/">
                        <img
                            src="https://i.ibb.co/tM1fXLzx/Chat-GPT-Image-May-20-2025-05-52-48-PM.png"
                            alt="logo"
                            className="mx-auto h-12 w-auto"
                        />
                    </a>
                    <h2 className="mt-6 text-3xl font-semibold text-gray-100">
                        Sign In to Your Account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-purple-500">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-purple-500">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-400">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="text-purple-500 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Or continue with
                    </p>
                    <div className="mt-2">
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.35 0 6.08 1.15 8.33 3.4l6.25-6.25C34.18 3.05 29.43 1 24 1 14.62 1 6.86 6.93 3.37 15.85l7.44 5.77C12.28 16.27 17.68 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.5 24c0-1.6-.15-3.13-.43-4.62H24v8.75h12.73c-.55 2.92-2.18 5.4-4.65 7.07l7.13 5.53C42.63 37.34 46.5 31.24 46.5 24z" />
                                <path fill="#FBBC05" d="M10.81 28.13A14.59 14.59 0 0110 24c0-1.13.2-2.22.56-3.25L3.12 14.98A23.997 23.997 0 001 24c0 3.88.93 7.55 2.56 10.86l7.25-6.73z" />
                                <path fill="#34A853" d="M24 46c5.43 0 10.18-1.8 14.01-4.86l-7.13-5.53A14.43 14.43 0 0124 36c-6.32 0-11.72-6.77-13.19-15.63l-7.44 5.77C6.86 41.07 14.62 47 24 47z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Not a member yet?{' '}
                    <Link to="/register" className="text-purple-500 hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;



// 
// booking








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







