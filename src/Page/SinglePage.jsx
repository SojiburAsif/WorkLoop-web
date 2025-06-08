import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../Them/ThemProvider';

function SingleServiceDetails() {
    const service = useLoaderData();
    const { theme } = useContext(ThemeContext);

    const {
        _id,
        title,
        description,
        image,
        priceRange,
        currency,
        provider,
        serviceArea,
        providerName,
    } = service;

    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const subTextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const borderClass = theme === 'dark' ? 'border-gray-600' : 'border-gray-200';
    const badgeClass = theme === 'dark'
        ? 'badge badge-outline border-white text-white'
        : 'badge badge-outline badge-info';
    const btnBgClass = theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'text-black hover:bg-sky-100/40';

    return (
        <div className={`max-w-7xl mx-auto p-10 space-grotesk rounded-4xl shadow-2xl my-6 ${bgClass}`}>
            <div className="overflow-hidden flex flex-col md:flex-row-reverse gap-8">

                {/* --- Image Section --- */}
                <div className="w-full md:w-3/5">
                    <img
                        src={image || "https://i.ibb.co/3KxyBQT/courier-driver-4886839.jpg"}
                        alt={title}
                        className="w-full h-[40rem] object-cover rounded-2xl"
                    />
                </div>

                {/* --- Text Content Section --- */}
                <div className="w-full md:w-2/5 p-6 flex flex-col justify-between space-y-10">

                    {/* --- Service Info --- */}
                    <div className={`space-y-6 border-b pb-6 ${borderClass}`}>
                        <h1 className={`text-5xl font-bold ${textClass}`}>{title}</h1>

                        <p className={`text-xl ${subTextClass}`}>{description}</p>

                        <p className={`text-3xl font-semibold ${textClass}`}>
                            Price: {priceRange?.join(" - ")} {currency || "BDT"}
                        </p>
                    </div>

                    {/* --- Provider Info --- */}
                    <div className="space-y-4">
                        <h2 className={`text-2xl font-semibold mb-2 ${textClass}`}>Service Provider</h2>

                        <div className="flex items-center gap-6">
                            <img
                                src={provider?.logo || "https://i.ibb.co/zPGQF5C/user.png"}
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
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}
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

                    {/* --- Booking Button --- */}
                    <Link
                        to={`/booking/${_id}`}
                        className={`mt-6 w-[60%] px-8 py-4 border border-sky-400 text-xl font-semibold rounded-full flex items-center justify-center transition ${btnBgClass}`}
                    >
                        Book Now
                        <FaArrowRight className="ml-3 text-2xl" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SingleServiceDetails;
