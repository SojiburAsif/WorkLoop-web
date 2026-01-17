import React, { useContext, useState } from 'react';
import { ThemeContext } from '../Them/ThemProvider';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Animation - 1749826571188.json';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const Booking = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [takingDate, setTakingDate] = useState('');
    const [instructions, setInstructions] = useState('');
    const navigate = useNavigate();

    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';
    const inputBgClass = theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-gray-100 text-black placeholder-gray-600';
    const borderClass = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    const buttonBgClass = theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400';

    const handlePurchase = () => {
        if (!takingDate) {
            Swal.fire('Please select a date', '', 'warning');
            return;
        }
        const bookingData = {
            serviceId: service._id,
            serviceName: service.serviceName,
            serviceImageUrl: service.serviceImageUrl,
            providerEmail: service.providerEmail,
            providerName: service.providerName,
            userEmail: user.email,
            userName: user.displayName,
            takingDate,
            instructions,
            priceRange: service.priceRange,
            currency: service.currency,
            status: 'pending',
            bookedAt: new Date().toISOString()
        };
        axios.post('https://services-server.vercel.app/bookings', bookingData, {
            withCredentials: true
        })
            .then(res => {
                console.log(res);
                Swal.fire('Booked!', 'Your service has been booked.', 'success');
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                Swal.fire('Error', 'Booking failed. Please try again.', 'error');
            });
    };

    return (
        <div className={`py-6 ${bgClass}`}>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4">
                <div className="w-full md:w-1/2 lg:w-2/5">
                    <Lottie animationData={loginAnimation} loop />
                </div>

                <div className={`w-full md:w-2/3 lg:w-1/2 p-6 rounded-2xl shadow-2xl ${bgClass}`}>
                    <h2 className={`text-2xl font-semibold mb-5 ${textClass}`}>Book Service</h2>
                    <h1 className={`text-3xl font-bold text-center py-8 ${textClass}`}>
                        Confirm Booking
                    </h1>
                    <form className="space-y-4 text-base" onSubmit={e => { e.preventDefault(); handlePurchase(); }}>

                        <div>
                            <label className={`block text-sm font-medium mb-1 ${textClass}`}>Service ID</label>
                            <input value={service._id} readOnly className={`w-full p-3 rounded-lg text-sm ${inputBgClass}`} />
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-1 ${textClass}`}>Service Name</label>
                            <input value={service.serviceName} readOnly className={`w-full p-3 rounded-lg text-sm ${inputBgClass}`} />
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-1 ${textClass}`}>Service Image URL</label>
                            <input value={service.serviceImageUrl} readOnly className={`w-full p-3 rounded-lg text-sm ${inputBgClass}`} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textClass}`}>Provider Email</label>
                                <input value={service.providerEmail} readOnly className={`w-full p-3 rounded-lg text-sm ${inputBgClass}`} />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textClass}`}>Provider Name</label>
                                <input value={service.providerName} readOnly className={`w-full p-3 rounded-lg text-sm ${inputBgClass}`} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textClass}`}>Your Email</label>
                                <input value={user.email} readOnly className={`w-full p-3 rounded-lg text-sm ${inputBgClass}`} />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textClass}`}>Your Name</label>
                                <input value={user.displayName} readOnly className={`w-full p-3 rounded-lg text-sm ${inputBgClass}`} />
                            </div>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-1 ${textClass}`}>Service Taking Date</label>
                            <input
                                type="date"
                                value={takingDate}
                                onChange={e => setTakingDate(e.target.value)}
                                required
                                className={`w-full p-3 rounded-lg text-sm ${inputBgClass} border ${borderClass}`}
                            />
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-1 ${textClass}`}>Special Instructions</label>
                            <textarea
                                value={instructions}
                                onChange={e => setInstructions(e.target.value)}
                                placeholder="Address, plan..."
                                className={`w-full p-3 rounded-lg h-24 resize-none text-sm ${inputBgClass} border ${borderClass}`}
                            />
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-1 ${textClass}`}>Price</label>
                            <input value={service.priceRange?.join(' - ')} readOnly className={`w-full p-3 rounded-lg text-sm ${inputBgClass}`} />
                        </div>

                        <button
                            type="submit"
                            className={`w-full px-5 py-3 rounded-2xl ${buttonBgClass} text-white text-base`}
                        >
                            Purchase
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
