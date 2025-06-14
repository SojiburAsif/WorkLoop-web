import React, { useContext } from 'react';
import {
    FaTwitter,
    FaYoutube,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from 'react-icons/fa';
import { ThemeContext } from '../Them/ThemProvider';

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    // Dynamic classes based on theme
    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white shadow-2xl ';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const subBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const linkHoverDark = theme === 'dark' ? 'hover:text-blue-400' : '';

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
                    <h6 className="text-2xl font-semibold mb-4">Pages</h6>
                    <ul className="space-y-3 text-lg">
                        <li><a href="/" className={`hover:underline ${textClass}`}>Home</a></li>
                        <li><a href="/about" className={`hover:underline ${textClass}`}>About Us</a></li>
                        <li><a href="/team" className={`hover:underline ${textClass}`}>Our Team</a></li>
                        <li><a href="/blog-classic" className={`hover:underline ${textClass}`}>Blog Classic</a></li>
                        <li><a href="/blog-grid" className={`hover:underline ${textClass}`}>Blog Grid</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h6 className="text-2xl font-semibold mb-4">Services</h6>
                    <ul className="space-y-3 text-lg">
                        <li><a href="/services/engine-cleaning" className={`hover:underline ${textClass}`}>Engine Cleaning</a></li>
                        <li><a href="/services/crystal-shine" className={`hover:underline ${textClass}`}>Crystal Shine</a></li>
                        <li><a href="/services/diagnostic-tests" className={`hover:underline ${textClass}`}>Diagnostic Tests</a></li>
                        <li><a href="/services/interior-cleaning" className={`hover:underline ${textClass}`}>Interior Cleaning</a></li>
                        <li><a href="/services/engine-service" className={`hover:underline ${textClass}`}>Engine Service</a></li>
                    </ul>
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
