import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ThemeContext } from '../Them/ThemProvider';

function SingleServiceDetails() {
    const service = useLoaderData();
    const { theme } = useContext(ThemeContext);

    const {
        _id,
        title,
        description,
        serviceImageUrl,
        priceRange,
        currency,
        providerImage,
        serviceArea,
        providerName,
    } = service;
    // console.log(service);
    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const subTextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const borderClass = theme === 'dark' ? 'border-gray-600' : 'border-gray-200';

    return (
        <div className={`max-w-7xl mx-auto p-10 space-grotesk rounded-4xl shadow-2xl my-6 ${bgClass}`}>
            <div className="overflow-hidden flex flex-col md:flex-row-reverse gap-8">

                {/* --- Image Section --- */}
                <div className="w-full md:w-3/5">
                    <img
                        src={serviceImageUrl}
                        alt={title}
                        className="w-full h-[40rem] object-cover rounded-2xl"
                    />
                </div>

                {/* --- Text Content Section --- */}
                <div className="w-full md:w-2/5 p-6 flex flex-col justify-between space-y-10">

                    <div className={`space-y-6 border-b pb-6 ${borderClass}`}>
                        <h1 className={`text-5xl font-bold ${textClass}`}>{title}</h1>

                        <p className={`text-xl ${subTextClass}`}>{description}</p>

                        <p className="text-3xl font-semibold text-red-500">
                            Price: {priceRange?.join(" - ")} {currency || "BDT"}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className={`text-2xl font-semibold mb-2 ${textClass}`}>Service Provider</h2>

                        <div className="flex items-center gap-6">
                            <img
                                src={providerImage}
                                alt={providerName || "Provider"}
                                className={`w-16 h-16 rounded-full border-2 ${borderClass}`}
                            />
                            <div>
                                <p className={`text-xl font-medium ${textClass}`}>
                                    {providerName || "Unknown Provider"}
                                </p>
                                <p className={`text-base ${subTextClass}`}>Service Areas:</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {serviceArea && serviceArea.length > 0 ? (
                                        serviceArea.map((area, idx) => (
                                            <span
                                                key={idx}
                                                className="badge badge-outline badge-info"
                                            >
                                                {area}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">No service areas listed</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                 
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    >
                        <Link
                            to={`/booking/${_id}`}
                            className="mt-6 w-[60%] px-8 py-4 bg-blue-500 text-white text-xl font-semibold rounded-full flex items-center justify-center transition hover:bg-blue-600"
                        >
                            Book Now
                            <FaArrowRight className="ml-3 text-2xl" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default SingleServiceDetails;
