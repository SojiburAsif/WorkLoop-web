import React, { useEffect, useState, useContext } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
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
    const borderClass = theme === 'dark' ? 'border-gray-600' : 'border-gray-200';
    const badgeClass = theme === 'dark'
        ? 'badge badge-outline border-white text-white'
        : 'badge badge-outline badge-info';

    useEffect(() => {
        if (user?.email) {
            BookingByPromis(user.email)
                .then(data => {
                    setJobs(data); 
                })
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
                <div className="text-center w-full h-full text-lg flex flex-col items-center">
                    <FaInfoCircle className="text-4xl mb-2 text-blue-400" />
                    <p>No bookings found for your account.</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-8">
                    {jobs.map(job => (
                        <div
                            key={job._id}
                            className={`flex flex-row rounded-lg shadow-lg overflow-hidden ${bgClass} ${textClass} border ${borderClass}`}
                            style={{ minHeight: '160px' }}
                        >
                            <img
                                src={job.serviceImageUrl || 'https://via.placeholder.com/140'}
                                alt={job.serviceName}
                                className="w-36 h-36 object-cover m-4 rounded"
                            />
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">{job.serviceName}</h3>
                                    <p className={`text-lg mb-3 ${subTextClass}`}>{job.description}</p>
                                    <ul className={`text-md space-y-2 mb-6 ${subTextClass}`}>
                                        {job.price != null && (
                                            <li><strong className="text-lg">Price:</strong> {job.price} {job.currency}</li>
                                        )}
                                        {Array.isArray(job.priceRange) && (
                                            <li><strong className="text-lg">Price Range:</strong> {job.priceRange[0]} - {job.priceRange[job.priceRange.length - 1]} {job.currency}</li>
                                        )}
                                        {job.takingDate && (
                                            <li><strong className="text-lg">Date:</strong> {new Date(job.takingDate).toLocaleDateString()}</li>
                                        )}
                                        {job.status && (
                                            <li><strong className="text-lg">Status:</strong> <span className={`${badgeClass}`}>{job.status}</span></li>
                                        )}
                                        {job.userEmail && (
                                            <li><strong className="text-lg">Booked By:</strong> {job.userName}</li>
                                        )}
                                        {job.providerName && (
                                            <li className="flex items-center space-x-3">
                                                <img
                                                    src={job.providerImageUrl || 'https://via.placeholder.com/40'}
                                                    alt={job.providerName}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <span>{job.providerName}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBooking;
