import React, { useEffect, useState, useContext } from 'react';
import { FaInfoCircle, FaDollarSign, FaCalendarAlt, FaUserAlt, FaTag } from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';
import { BookingByPromis } from '../API/BookingApplication';

const MyBooking = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const subTextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

    useEffect(() => {
        if (user?.email) {
            BookingByPromis(user.email)
                .then(data => setJobs(data))
                .catch(err => console.error('Failed to fetch bookings:', err));
        } else {
            setJobs([]);
        }
    }, [user]);

    return (
        <div className={`w-full mx-auto px-6 py-10 ${bgClass} ${textClass}`}>
            <h2 className="text-3xl font-bold text-center mb-10">My Booked Services</h2>

            {!user?.email ? (
                <div className="text-center text-lg flex flex-col items-center">
                    <FaInfoCircle className="text-4xl mb-2 text-red-400" />
                    <p>Please log in to view your bookings.</p>
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center text-lg flex flex-col items-center">
                    <FaInfoCircle className="text-4xl mb-2 text-blue-400" />
                    <p>No bookings found for your account.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto items-center gap-6">
                    {jobs.map(job => (
                        <div
                            key={job._id}
                            className="card w-full   bg-base-100 shadow-sm border border-base-300 mx-auto"
                        >
                            <figure>
                                <img
                                    src={job.serviceImageUrl}
                                    alt={job.serviceName}
                                    className="object-cover w-full h-52"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl">
                                    {job.serviceName}
                                    {job.status && (
                                        <div
                                            className={`badge ${theme === 'dark'
                                                ? 'badge-outline border-red-500 text-red-500'
                                                : 'badge-secondary'}`}
                                        >
                                            {job.status}
                                        </div>
                                    )}
                                </h2>

                                <p className={`${subTextClass}`}>{job.description}</p>

                                <div className="text-sm mt-3 space-y-2">
                                    {job.price != null && (
                                        <div className="flex items-center gap-2">
                                            <FaDollarSign className="text-green-500" />
                                            <span>
                                                <strong>Price:</strong> {job.price} {job.currency}
                                            </span>
                                        </div>
                                    )}
                                    {Array.isArray(job.priceRange) && (
                                        <div className="flex items-center gap-2">
                                            <FaTag className="text-yellow-500" />
                                            <span>
                                                <strong>Price Range:</strong> {job.priceRange[0]} - {job.priceRange[job.priceRange.length - 1]} {job.currency}
                                            </span>
                                        </div>
                                    )}
                                    {job.takingDate && (
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-blue-500" />
                                            <span>
                                                <strong>Date:</strong> {new Date(job.takingDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                    {job.providerName && (
                                        <div className="flex items-center gap-2">
                                            <FaUserAlt className="text-pink-500" />
                                            <span>
                                                <strong>Provided By:</strong> {job.providerName}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Provider Image and Name at Bottom
                                {job.providerImage && (
                                    <div className="mt-4 flex items-center space-x-3">
                                        <img
                                            src={job.providerImage}
                                            alt={job.providerName}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                        <span className={`${subTextClass} text-sm`}>
                                            {job.providerName}
                                        </span>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBooking;
