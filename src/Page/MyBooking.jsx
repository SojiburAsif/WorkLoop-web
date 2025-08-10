import React, { useEffect, useState, useContext } from 'react';
import Lottie from 'lottie-react';
import {
    FaInfoCircle,
    FaDollarSign,
    FaCalendarAlt,
    FaUserAlt,
    FaTag,
    FaThList,
    FaThLarge
} from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';
import { BookingByPromis } from '../API/BookingApplication';
import loginAnimation from '../assets/Animation - 1749975033533.json';

const MyBooking = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [viewMode, setViewMode] = useState('card');

    const isDark = theme === 'dark';
    const bgClass = isDark ? 'bg-black' : 'bg-gray-100';
    const textPrimary = isDark ? 'text-blue-400' : 'text-blue-600';
    const textNormal = isDark ? 'text-white' : 'text-gray-900';
    const borderClass = isDark ? 'border border-blue-100' : 'border border-gray-300';

    useEffect(() => {
        if (user?.email) {
            BookingByPromis(user.email)
                .then(data => setJobs(data))
                .catch(err => console.error('Failed to fetch bookings:', err));
        } else {
            setJobs([]);
        }
    }, [user]);

    if (!user?.email) {
        return (
            <div className={`w-full mx-auto px-6 py-10 ${bgClass} ${textNormal} flex flex-col items-center`}>
                <FaInfoCircle className="text-5xl mb-3 text-blue-500" />
                <p className="text-lg">Please log in to view your bookings.</p>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div
                className={`w-full mx-auto px-6 py-10 ${bgClass} ${textNormal} flex flex-col items-center`}
                style={{ height: '600px' }}
            >
                <Lottie animationData={loginAnimation} loop style={{ width: 300, height: 300 }} />
                <p className={`${textPrimary} mt-4`}>No bookings found for your account.</p>
            </div>
        );
    }

    return (
       <div className={`w-full border ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
            <div className={`w-full mx-auto px-6 py-10 max-w-7xl ${bgClass}`}>
                {/* Title + Toggle */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-3xl font-bold flex items-center gap-2 ${textPrimary}`}>
                        📅 My Booked Services
                    </h2>
                    <button
                        onClick={() => setViewMode(prev => (prev === 'table' ? 'card' : 'table'))}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                        aria-label="Toggle view mode"
                    >
                        {viewMode === 'table' ? (
                            <>
                                <FaThLarge /> Card View
                            </>
                        ) : (
                            <>
                                <FaThList /> Table View
                            </>
                        )}
                    </button>
                </div>

                {/* Table View */}
                {viewMode === 'table' ? (
                    <div className="overflow-x-auto">
                        <table className={`min-w-full ${borderClass}`}>
                            <thead className={isDark ? '' : 'bg-blue-200'}>
                                <tr>
                                    <th className={`p-3 border-b ${borderClass} text-left ${textPrimary}`}>Service</th>
                                    <th className={`p-3 border-b ${borderClass} text-left ${textPrimary}`}>Provider</th>
                                    <th className={`p-3 border-b ${borderClass} text-left ${textPrimary}`}>Price</th>
                                    <th className={`p-3 border-b ${borderClass} text-left ${textPrimary}`}>Date</th>
                                    <th className={`p-3 border-b ${borderClass} text-left ${textPrimary}`}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map(job => (
                                    <tr
                                        key={job._id}
                                        className={`hover:${isDark ? '' : 'bg-blue-100'} transition-colors cursor-pointer`}
                                    >
                                        <td className={`p-3 border-b ${borderClass} flex items-center gap-3 ${textNormal} font-semibold`}>
                                            <img
                                                src={job.serviceImageUrl}
                                                alt={job.serviceName}
                                                className="h-12 w-16 object-cover rounded"
                                            />
                                            <span className={textPrimary}>{job.serviceName}</span>
                                        </td>
                                        <td className={`p-3 border-b ${borderClass} ${textNormal}`}>{job.providerName || 'N/A'}</td>
                                        <td className={`p-3 border-b ${borderClass} ${textNormal}`}>
                                            {job.price != null
                                                ? `${job.price} ${job.currency}`
                                                : Array.isArray(job.priceRange)
                                                ? `${job.priceRange[0]} - ${job.priceRange[job.priceRange.length - 1]} ${job.currency}`
                                                : 'N/A'}
                                        </td>
                                        <td className={`p-3 border-b ${borderClass} ${textNormal}`}>
                                            {job.takingDate ? new Date(job.takingDate).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className={`p-3 border-b ${borderClass}`}>
                                            <span
                                                className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                                                    job.status === 'completed'
                                                        ? 'bg-green-600 text-white'
                                                        : job.status === 'working'
                                                        ? 'bg-yellow-500 text-white'
                                                        : 'bg-blue-500 text-white'
                                                }`}
                                            >
                                                {job.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* Card View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <div
                                key={job._id}
                                className={`max-w-7xl min-h-[450px] flex flex-col ${bgClass} ${borderClass} rounded-lg shadow-lg overflow-hidden`}
                            >
                                <figure>
                                    <img
                                        src={job.serviceImageUrl}
                                        alt={job.serviceName}
                                        className="object-cover w-full h-52"
                                    />
                                </figure>
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h2 className={`text-xl font-semibold flex justify-between items-center ${textPrimary}`}>
                                            {job.serviceName}
                                            {job.status && (
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-semibold ${
                                                        job.status === 'completed'
                                                            ? 'bg-green-600 text-white'
                                                            : job.status === 'working'
                                                            ? 'bg-yellow-500 text-white'
                                                            : 'bg-blue-500 text-white'
                                                    }`}
                                                >
                                                    {job.status}
                                                </span>
                                            )}
                                        </h2>
                                        <p className={`${textNormal} mt-2`}>{job.description}</p>
                                    </div>
                                    <div className={`text-sm mt-4 space-y-2 ${textNormal}`}>
                                        {job.price != null && (
                                            <div className="flex items-center gap-2">
                                                <FaDollarSign className="text-green-500" />
                                                <span>
                                                    <strong className={textPrimary}>Price:</strong> {job.price} {job.currency}
                                                </span>
                                            </div>
                                        )}
                                        {Array.isArray(job.priceRange) && (
                                            <div className="flex items-center gap-2">
                                                <FaTag className="text-yellow-500" />
                                                <span>
                                                    <strong className={textPrimary}>Price Range:</strong> {job.priceRange[0]} - {job.priceRange[job.priceRange.length - 1]} {job.currency}
                                                </span>
                                            </div>
                                        )}
                                        {job.takingDate && (
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-blue-500" />
                                                <span>
                                                    <strong className={textPrimary}>Date:</strong> {new Date(job.takingDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                        {job.providerName && (
                                            <div className="flex items-center gap-2">
                                                <FaUserAlt className="text-pink-500" />
                                                <span>
                                                    <strong className={textPrimary}>Provided By:</strong> {job.providerName}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBooking;
