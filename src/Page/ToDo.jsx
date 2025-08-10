import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiClipboard, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { FaClipboardList } from 'react-icons/fa';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Animation - 1749975033533.json';

const ToDo = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [bookings, setBookings] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState({});

    const isDark = theme === 'dark';

    // সেকশনের ব্যাকগ্রাউন্ড এখন fixed bg-gray-900
    const bgClass = 'bg-gray-900';

    // কার্ডের ব্যাকগ্রাউন্ড (কালো সবসময়)
    const cardBg = 'bg-black';

    // টেক্সট কালার প্রাইমারি ব্লু ফোকাসে, নরম হালকা গ্রে টেক্সট
    const textClass = 'text-blue-400';
    const subTextClass = isDark ? 'text-gray-300' : 'text-gray-700';

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://services-server.vercel.app/bookings`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(b => b.providerEmail === user.email);
                setBookings(filtered);

                const initialStatuses = {};
                filtered.forEach(b => {
                    initialStatuses[b._id] = b.status || 'pending';
                });
                setSelectedStatuses(initialStatuses);
            })
            .catch(console.error);
    }, [user]);

    const handleStatusSelect = (id, newStatus) => {
        setSelectedStatuses(prev => ({ ...prev, [id]: newStatus }));
    };

    const handleConfirm = id => {
        const newStatus = selectedStatuses[id] || 'pending';

        axios
            .put(`https://services-server.vercel.app/bookings/${id}`, { status: newStatus })
            .then(res => {
                setBookings(prev =>
                    prev.map(b => (b._id === id ? { ...b, status: newStatus } : b))
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Booking status updated successfully.',
                    timer: 1500,
                    showConfirmButton: false,
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update booking status!',
                });
            });
    };

    return (
        <div className={`${bgClass} min-h-screen py-10 px-4 sm:px-6 lg:px-8`}>
            <h1 className={`text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3 `}>
                <FaClipboardList size={36} /> Services Booked for You
            </h1>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
                    <Lottie animationData={loginAnimation} loop style={{ width: 300, height: 300 }} />
                    <p className={`text-lg mt-4 text-center ${subTextClass}`}>
                        You haven’t received any bookings yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {bookings.map(b => (
                        <div
                            key={b._id}
                            className={`${cardBg} overflow-hidden rounded-t-xl  flex flex-col transition-transform hover:scale-[1.02] duration-300`}
                        >
                            <img
                                alt={b.serviceName}
                                src={b.serviceImageUrl}
                                className="h-56 w-full object-cover"
                            />

                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className={`text-2xl font-semibold mb-1 text-blue-400`}>{b.serviceName}</h2>
                                <p className={`text-sm mb-4 text-blue-300`}>
                                    Service request by: <span className={`text-blue-400 font-medium`}>{b.userName}</span>
                                </p>

                                <div className="flex items-start gap-3 mb-4">
                                    <FiClipboard className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <p className={`font-semibold text-sm text-blue-400`}>Instructions</p>
                                        <p className={`text-sm ${subTextClass}`}>{b.instructions || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between mb-6 text-sm text-blue-300">
                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="text-blue-400" size={18} />
                                        <span>
                                            {new Date(b.takingDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiDollarSign className="text-blue-400" size={18} />
                                        <span>
                                            {b.priceRange?.join(' - ')} {b.currency}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-end gap-4">
                                    <div className="flex-1">
                                        <label
                                            htmlFor={`status-${b._id}`}
                                            className={`block mb-1 font-medium text-blue-400`}
                                        >
                                            Status
                                        </label>
                                        <select
                                            id={`status-${b._id}`}
                                            value={selectedStatuses[b._id] ?? 'pending'}
                                            onChange={e => handleStatusSelect(b._id, e.target.value)}
                                            className={`w-full rounded px-3 py-2 ${isDark
                                                    ? 'bg-black text-white border  border-gray-700 focus:ring-blue-500'
                                                    : 'bg-white text-black border border-gray-300 focus:ring-blue-400'
                                                }`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="working">Working</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>


                                    <button
                                        onClick={() => handleConfirm(b._id)}
                                        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ToDo;
