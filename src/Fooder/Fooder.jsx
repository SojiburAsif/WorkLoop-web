import React, { useContext } from 'react';
import {
    FaTwitter,
    FaYoutube,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from 'react-icons/fa';
import { NavLink } from 'react-router';
import { ThemeContext } from '../Them/ThemProvider';

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    // Dynamic classes based on theme
    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white shadow-2xl ';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const subBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const linkHoverDark = theme === 'dark' ? 'hover:text-blue-400' : '';
    const navLinkClass = ({ isActive }) =>
        `block text-lg ${isActive ? 'text-blue-500 underline' : textClass} hover:underline`;

    return (
        <footer className={`${bgClass} space-grotesk ${textClass}`}>            
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Logo & Contact */}
                <div className="space-y-5">
                    <div className="flex items-center space-x-3 sh">
                        {theme === 'dark' ? (
                            <img
                                className="mr-[5px] w-40 h-auto"
                                src="../../public/dark.png"
                                alt="Footer Dark Logo"
                            />
                        ) : (
                            <img
                                className="mr-[5px] w-40 h-auto"
                                src="../../public/ChatGPT Image Jun 8, 2025, 01_10_41 PM.png"
                                alt="Footer Light Logo"
                            />
                        )}
                    </div>
                    <p className="text-lg leading-relaxed">
                        <strong>Phone:</strong> +12 (3) 456 0000
                        <br />
                        <strong>Email:</strong>{' '}
                        <a href="mailto:asif81534@gmail.com" className="underline">
                            asif81534@gmail.com
                        </a>
                    </p>
                    <div className="flex space-x-4 text-2xl mt-4">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className={`hover:text-blue-500 ${linkHoverDark}`}>
                            <FaTwitter />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className={`hover:text-red-500 ${linkHoverDark}`}>
                            <FaYoutube />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className={`hover:text-blue-600 ${linkHoverDark}`}>
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className={`hover:text-pink-500 ${linkHoverDark}`}>
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={`hover:text-blue-700 ${linkHoverDark}`}>
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Pages */}
                <div>
                    <h6 className="text-3xl font-semibold mb-4">Pages</h6>
                    <ul className="p-2 space-y-2">
                        <li>
                            <NavLink to="/addtask" className={navLinkClass}>
                                Add Service
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/manage-service" className={navLinkClass}>
                                Manage Service
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/booked-services" className={navLinkClass}>
                                Booked Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/service-to-do" className={navLinkClass}>
                                Service-To-Do
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Contact Form */}
                <div>
                    <h6 className="text-3xl font-semibold mb-4">Contact Us</h6>
                    <form className="space-y-3">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-3.5  rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Copyright */}
            <div className={`${subBgClass} py-5 mt-4 text-center text-lg ${textClass}`}>                
                <p>© 2025 Servicehub. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
