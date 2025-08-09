import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaArrowRight, FaRegClock, FaShieldAlt, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ThemeContext } from '../Them/ThemProvider';

/**
 * SingleServiceDetails
 * - Left column (vertical): provider avatar+name+verify -> main image -> price list (mapped)
 * - Right column: title, description, features, service areas (blue badges)
 * - Book Now button centered below whole section
 * - Dark / Light theme support from ThemeContext
 */

const SingleServiceDetails = () => {
    const service = useLoaderData(); // expect service object from loader
    const { theme } = useContext(ThemeContext);
    const [copied, setCopied] = useState(false);

    // destructure with safe defaults
    const {
        _id,
        title = 'Service Title',
        description = 'No description provided.',
        serviceImageUrl,
        priceRange = [], // e.g. ['2050', '50-40', '50']
        currency = 'BDT',
        providerImage,
        serviceArea = [],
        providerName = 'Provider Name',
        verified = true, // optional flag
    } = service || {};

    const isDark = theme === 'dark';
    const sectionBg = isDark ? 'bg-black' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-gray-900';
    const subTextClass = isDark ? 'text-gray-300' : 'text-gray-600';
    const borderClass = isDark ? 'border-gray-700' : 'border-gray-200';

    const promoCode = service?.promoCode || 'SAVE20';

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (err) {
            // ignore copy errors gracefully
        }
    };

    return (
        <div className={`max-w-7xl my-9 bg-black  mx-auto mt-24 px-6 md:px-8 lg:px-12 py-8 ${sectionBg} rounded-3xl`}>
            {/* Article: left & right columns */}
            <article className={`md:flex md:items-stretch overflow-hidden rounded-2xl shadow-lg`}>
                {/* LEFT column: name(top) -> avatar -> main image -> price list(bottom) */}
                <div className={`md:w-2/5 w-full flex flex-col justify-between p-6 md:p-8 border-r ${borderClass} bg-transparent`}>
                    {/* top: provider small header */}
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Provider</div>

                        <div className="flex items-center gap-3">
                            <img
                                src={providerImage || 'https://i.pravatar.cc/96'}
                                alt={providerName}
                                className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                            />
                            <div>
                                <div className={`font-semibold ${textClass}`}>{providerName}</div>
                                <div className="text-xs text-green-400"> {verified ? 'Verified' : 'Unverified'}</div>
                            </div>
                        </div>
                    </div>

                    {/* middle: main image */}
                    <div className="flex-grow my-6">
                        <motion.img
                            src={serviceImageUrl || 'https://i.ibb.co/WNdTbN06/lake-9585821.jpg'}
                            alt={title}
                            className="w-full h-56 md:h-64 object-cover rounded-lg shadow-sm"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    {/* bottom: mapped price list */}
                    <div>
                        <span className="block text-sm text-gray-500 mb-2">Price options</span>

                        <div className="space-y-2">
                            {priceRange && priceRange.length > 0 ? (
                                priceRange.map((p, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between bg-blue-50/40 dark:bg-blue-900/20 px-3 py-2 rounded-md"
                                    >
                                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                            {p}
                                        </span>
                                        <span className="text-xs text-gray-500">{currency}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-gray-500">N/A</div>
                            )}
                        </div>
                    </div>


                </div>

                {/* RIGHT column: title, description, features, areas */}
                <div className={`md:w-3/5 w-full p-6 md:p-8 flex flex-col justify-between`}>
                    <div>
                        <h1 className={`text-2xl md:text-3xl font-extrabold ${textClass} mb-4`}>{title}</h1>

                        <p className={`text-sm md:text-base leading-relaxed ${subTextClass} mb-6`}>
                            {description}
                        </p>

                        {/* features grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-md bg-blue-50 text-blue-600"><FaRegClock /></div>
                                <div>
                                    <div className="text-sm font-semibold">Fast Service</div>
                                    <div className={`text-xs ${subTextClass}`}>Same-day & scheduled slots</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-md bg-blue-50 text-blue-600"><FaShieldAlt /></div>
                                <div>
                                    <div className="text-sm font-semibold">Trusted Pros</div>
                                    <div className={`text-xs ${subTextClass}`}>Certified & background-checked</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-md bg-blue-50 text-blue-600"><FaTags /></div>
                                <div>
                                    <div className="text-sm font-semibold">Verified Pricing</div>
                                    <div className={`text-xs ${subTextClass}`}>Transparent quotes</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">Support</div>
                                    <div className={`text-xs ${subTextClass}`}>24/7 customer care</div>
                                </div>
                            </div>
                        </div>

                        {/* Service Areas as blue badges */}
                        <div className="mb-6">
                            <h3 className={`text-sm font-semibold ${textClass} mb-3`}>Service Areas</h3>
                            <div className="flex flex-wrap gap-2">
                                {serviceArea && serviceArea.length > 0 ? (
                                    serviceArea.map((area, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                        >
                                            {area}
                                        </span>
                                    ))
                                ) : (
                                    <span className={`text-xs ${subTextClass}`}>No areas specified</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* provider compact info (bottom right column) */}
                    <div className="mt-4 flex items-center gap-4 border-t pt-4">
                        <img
                            src={providerImage || 'https://i.pravatar.cc/100'}
                            alt={providerName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                        />
                        <div>
                            <div className={`text-sm font-semibold ${textClass}`}>{providerName}</div>
                            <div className={`text-xs ${subTextClass}`}>Verified provider</div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Book Now button — centered bottom of the section */}
            <div className="mt-8 flex flex-col items-center gap-4">
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                    <Link
                        to={`/booking/${_id}`}
                        className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow"
                        aria-label="Book now"
                    >
                        Book Now <FaArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* small edit: promo + notes */}
                <div className="flex items-center gap-3 text-sm">
                    <div className="text-gray-400">Apply promo at checkout:</div>
                    <div
                        onClick={() => handleCopy(promoCode)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md font-mono text-sm text-blue-700 cursor-pointer select-text"
                    >
                        {promoCode}
                    </div>
                    <button
                        onClick={() => handleCopy(promoCode)}
                        className={`px-3 py-1 rounded-md text-sm ${copied ? 'bg-green-600 text-white' : 'bg-white/10 text-blue-600'}`}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                {/* small editable note below button */}
                <div className="text-center text-xs text-gray-400 max-w-xl">
                    Booking subject to provider confirmation. Price shown are estimates — final quote may vary after inspection.
                </div>
            </div>
        </div>
    );
};

export default SingleServiceDetails;
