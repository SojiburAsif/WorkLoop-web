import React, { useContext,  } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaArrowRight, FaRegClock, FaShieldAlt, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ThemeContext } from '../Them/ThemProvider';

const primaryColor = 'blue-500';

const SingleServiceDetails = () => {
    const service = useLoaderData();
    const { theme } = useContext(ThemeContext);
  

    const {
        _id,
        title = 'Service Title',
        description = 'No description provided.',
        serviceImageUrl,
        priceRange = [],
        currency = 'BDT',
        providerImage,
        serviceArea = [],
        providerName = 'Provider Name',
        verified = true,
    } = service || {};

    const isDark = theme === 'dark';
    const sectionBg = isDark ? 'bg-black' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-gray-900';
    const subTextClass = isDark ? 'text-gray-300' : 'text-gray-600';
    const borderClass = isDark ? 'border-gray-700' : 'border-gray-200';

 
  

    return (
        <div className={`max-w-7xl rounded-2xl shadow-lg my-9 mx-auto mt-24 px-6 md:px-8 lg:px-12 py-8 ${sectionBg} rounded-3xl`}>
            <article className="md:flex md:items-stretch overflow-hidden ">
                {/* LEFT column */}
                <div className={`md:w-2/5 w-full flex flex-col justify-between p-6 md:p-8 border-r ${borderClass}`}>
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Provider</div>
                        <div className="flex items-center gap-3">
                            <img
                                src={providerImage || 'https://i.pravatar.cc/96'}
                                alt={providerName}
                                className={`w-12 h-12 rounded-full object-cover border-2 border-${primaryColor}`}
                            />
                            <div>
                                <div className={`font-semibold ${textClass}`}>{providerName}</div>
                                <div className="text-xs text-green-400">{verified ? 'Verified' : 'Unverified'}</div>
                            </div>
                        </div>
                    </div>

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

                    <div>
                        <span className="block  mb-2">Price options</span>
                        <div className="space-y-2">
                            {priceRange.length > 0 ? (
                                <div className="flex items-center justify-between px-3 py-2 rounded-md">
                                    <span className="text-sm font-medium  ">
                                        Price: {priceRange.join("-")}
                                    </span>
                                    <span className="text-xs ">{currency}</span>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500">N/A</div>
                            )}
                        </div>
                    </div>

                </div>

                {/* RIGHT column */}
                <div className="md:w-3/5 w-full p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <h1 className={`text-2xl md:text-3xl font-extrabold ${textClass} mb-4`}>{title}</h1>
                        <p className={`text-sm md:text-base leading-relaxed ${subTextClass} mb-6`}>{description}</p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {[
                                { icon: <FaRegClock />, title: 'Fast Service', desc: 'Same-day & scheduled slots' },
                                { icon: <FaShieldAlt />, title: 'Trusted Pros', desc: 'Certified & background-checked' },
                                { icon: <FaTags />, title: 'Verified Pricing', desc: 'Transparent quotes' },
                                { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg>, title: 'Support', desc: '24/7 customer care' }
                            ].map((f, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className={`p-2 rounded-md bg-${primaryColor}/10 text-${primaryColor}`}>{f.icon}</div>
                                    <div>
                                        <div className="text-sm font-semibold">{f.title}</div>
                                        <div className={`text-xs ${subTextClass}`}>{f.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Service Areas */}
                        <div className="mb-6">
                            <h3 className={`text-sm font-semibold ${textClass} mb-3`}>Service Areas</h3>
                            <div className="flex flex-wrap gap-2">
                                {serviceArea.length > 0 ? (
                                    serviceArea.map((area, i) => (
                                        <span
                                            key={i}
                                            className={`px-4 py-1 rounded-full text-sm font-medium bg-${primaryColor}/10 text-${primaryColor} dark:bg-${primaryColor}/30 dark:text-${primaryColor} shadow-sm hover:shadow-md hover:scale-105 transition`}
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

                    <div className="mt-4 flex items-center gap-4 border-t pt-4">
                        <img
                            src={providerImage || 'https://i.pravatar.cc/100'}
                            alt={providerName}
                            className={`w-12 h-12 rounded-full object-cover border-2 border-${primaryColor}`}
                        />
                        <div>
                            <div className={`text-sm font-semibold ${textClass}`}>{providerName}</div>
                            <div className={`text-xs ${subTextClass}`}>Verified provider</div>
                        </div>
                    </div>
                </div>




            </article>

            {/* Book Now */}
            <div className="mt-8 flex flex-col items-center gap-4">
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                    <Link
                        to={`/Dashboard/booking/${_id}`}
                        className={`inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-${primaryColor} hover:bg-blue-600 text-white font-semibold text-lg shadow`}
                    >
                        Book Now <FaArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>



                <div className="text-center text-xs text-gray-400 max-w-xl">
                    Booking subject to provider confirmation. Price shown are estimates — final quote may vary after inspection.
                </div>
            </div>
        </div>
    );
};

export default SingleServiceDetails;
