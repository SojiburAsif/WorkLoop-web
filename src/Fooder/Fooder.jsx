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

    // ডায়নামিক ক্লাসেস থিম অনুযায়ী
    const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const subBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const linkHoverDark = theme === 'dark' ? 'hover:text-blue-400' : ''; // ডার্ক মোডে লিংকে একটু আলাদা হোভার রং

    return (
        <footer className={`${bgClass} space-grotesk ${textClass}`}>
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Logo & Contact */}
                <div className="space-y-5">
                    <div className="flex items-center space-x-3">
                        <img
                            className="mr-[5px]"
                            src="/ChatGPT Image Jun 6, 2025, 12_40_50 AM.png"
                            alt="Vwash Logo"
                        />
                    </div>
                    <p className="text-base leading-relaxed">
                 
                        <br />
                        <strong>Phone:</strong> +12 (3) 456 0000
                        <br />
                        <strong>Email:</strong>{' '}
                        <a href="mailto:Vwash123@gmail.com" className="underline">
                            asif81534@gmail.com
                        </a>
                    </p>
                    <div className="flex space-x-4 text-xl mt-4">
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
                    <h6 className="text-xl font-semibold mb-4">Pages</h6>
                    <ul className="space-y-3 text-base">
                        <li><a href="/" className={`hover:underline ${textClass}`}>Home</a></li>
                        <li><a href="/about" className={`hover:underline ${textClass}`}>About Us</a></li>
                        <li><a href="/team" className={`hover:underline ${textClass}`}>Our Team</a></li>
                        <li><a href="/blog-classic" className={`hover:underline ${textClass}`}>Blog Classic</a></li>
                        <li><a href="/blog-grid" className={`hover:underline ${textClass}`}>Blog Grid</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h6 className="text-xl font-semibold mb-4">Services</h6>
                    <ul className="space-y-3 text-base">
                        <li><a href="/services/engine-cleaning" className={`hover:underline ${textClass}`}>Engine Cleaning</a></li>
                        <li><a href="/services/crystal-shine" className={`hover:underline ${textClass}`}>Crystal Shine</a></li>
                        <li><a href="/services/diagnostic-tests" className={`hover:underline ${textClass}`}>Diagnostic Tests</a></li>
                        <li><a href="/services/interior-cleaning" className={`hover:underline ${textClass}`}>Interior Cleaning</a></li>
                        <li><a href="/services/engine-service" className={`hover:underline ${textClass}`}>Engine Service</a></li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            {/* <div className="w-full flex justify-center mt-8">
                <div className={`w-[85%] border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-400'}`}></div>
            </div> */}

            {/* Copyright */}
            <div className={`${subBgClass} py-5 mt-4 text-center text-base ${textClass}`}>
                <p>© 2025 Vwash. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
