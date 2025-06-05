import React from 'react';
import {
    FaTwitter,
    FaYoutube,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-neutral  space-grotesk text-neutral-content">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Logo & Contact */}
                <div className="space-y-5">
                    <div className="flex items-center space-x-3">
                    
                        <span className="font-bold text-2xl">Vwash</span>
                    </div>
                    <p className="text-base leading-relaxed">
                        Unleash the Road Ahead: Your Next Car Awaits
                        <br />
                        <strong>Phone:</strong> +12 (3) 456 0000
                        <br />
                        <strong>Email:</strong>{' '}
                        <a href="mailto:Vwash123@gmail.com" className="underline">
                            asif81534@gmail.com
                        </a>
                    </p>
                    <div className="flex space-x-4 text-xl mt-4">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                            <FaTwitter />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500">
                            <FaYoutube />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Pages */}
                <div>
                    <h6 className="text-xl font-semibold mb-4">Pages</h6>
                    <ul className="space-y-3 text-base">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/team" className="hover:underline">Our Team</a></li>
                        <li><a href="/blog-classic" className="hover:underline">Blog Classic</a></li>
                        <li><a href="/blog-grid" className="hover:underline">Blog Grid</a></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h6 className="text-xl font-semibold mb-4">Quick Links</h6>
                    <ul className="space-y-3 text-base">
                        <li><a href="/help-center" className="hover:underline">Help Center</a></li>
                        <li><a href="/treats-program" className="hover:underline">Treats Program</a></li>
                        <li><a href="/careers" className="hover:underline">Careers</a></li>
                        <li><a href="/charities" className="hover:underline">Charities</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h6 className="text-xl font-semibold mb-4">Services</h6>
                    <ul className="space-y-3 text-base">
                        <li><a href="/services/engine-cleaning" className="hover:underline">Engine Cleaning</a></li>
                        <li><a href="/services/crystal-shine" className="hover:underline">Crystal Shine</a></li>
                        <li><a href="/services/diagnostic-tests" className="hover:underline">Diagnostic Tests</a></li>
                        <li><a href="/services/interior-cleaning" className="hover:underline">Interior Cleaning</a></li>
                        <li><a href="/services/engine-service" className="hover:underline">Engine Service</a></li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full flex justify-center mt-8">
                <div className="w-[85%] border-t border-gray-400"></div>
            </div>

            {/* Copyright */}
            <div className="bg-neutral-focus py-5 mt-4 text-center text-base">
                <p>© 2025 Vwash. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
