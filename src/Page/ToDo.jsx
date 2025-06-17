import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiClipboard, FiCalendar, FiDollarSign } from 'react-icons/fi';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Animation - 1749975033533.json';

const ToDo = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [bookings, setBookings] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [selectedServiceStatuses, setSelectedServiceStatuses] = useState({});

    const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
    const cardBg = theme === 'dark' ? 'bg-black' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://backend-zeta-ochre-92.vercel.app/bookings`,
            { credentials: 'include' }

        )
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(
                    b => b.providerEmail === user.email 
                );
                setBookings(filtered);

                const initialStatuses = {};
                const initialServiceStatuses = {};
                filtered.forEach(b => {
                    initialStatuses[b._id] = b.status || 'pending';
                    initialServiceStatuses[b._id] = b.serviceStatus || 'active';
                });

                setSelectedStatuses(initialStatuses);
                setSelectedServiceStatuses(initialServiceStatuses);
            })
            .catch(console.error);
    }, [user]);


    const handleStatusSelect = (id, newStatus) => {
        setSelectedStatuses(prev => ({ ...prev, [id]: newStatus }));
    };

    const handleConfirm = id => {
        const newStatus = selectedStatuses[id] || 'pending';
        const newServiceStatus = selectedServiceStatuses[id] || 'active';

        axios.put(`https://backend-zeta-ochre-92.vercel.app/bookings/${id}`, {
            status: newStatus,
            serviceStatus: newServiceStatus
        })
            .then(res => {
                console.log(res);
                setBookings(prev =>
                    prev.map(b => b._id === id ? { ...b, status: newStatus, serviceStatus: newServiceStatus } : b)
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
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update booking status!',
                });
            });
    };

    return (
        <div className={`${bgClass} min-h-screen py-10 px-4`}>
            <h1 className={`text-4xl font-bold mb-10 text-center ${textClass}`}>
                Services Booked for You
            </h1>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
                    <Lottie
                        animationData={loginAnimation}
                        loop
                        style={{ width: 300, height: 300 }}
                    />
                    <p className={`text-lg mt-4 text-center ${textClass}`}>
                        You haven’t received any bookings yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {bookings.map(b => (
                        <div
                            key={b._id}
                            className={`shadow-md rounded-xl overflow-hidden ${cardBg} ${textClass}`}
                        >
                            <div className="p-4">
                                <img
                                    alt={b.serviceName}
                                    src={b.serviceImageUrl}
                                    className="h-52 w-full rounded-md object-cover"
                                />

                                <div className="mt-4">
                                    <h2 className="text-2xl font-semibold">{b.serviceName}</h2>
                                    <p className="text-sm text-red-500"><span className='text-blue-500'> Service request by :</span> {b.userName}</p>

                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-start gap-2">
                                            <FiClipboard className="text-red-600 mt-1" />
                                            <div>
                                                <p className="font-semibold text-sm">Instructions</p>
                                                <p className="text-sm">{b.instructions || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-start gap-2">
                                                <FiCalendar className="text-red-600 mt-1" />
                                                <div>
                                                    <p className="font-semibold text-sm">Date</p>
                                                    <p className="text-sm">
                                                        {new Date(b.takingDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2">
                                                <FiDollarSign className="text-red-600 mt-1" />
                                                <div>
                                                    <p className="font-semibold text-sm">Price</p>
                                                    <p className="text-sm">
                                                        {b.priceRange?.join(' - ')} {b.currency}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex text-blue-700 items-end gap-3">
                                            <div className="flex-1">
                                                <label htmlFor={`status-${b._id}`} className="block mb-1 font-medium">
                                                    Status
                                                </label>
                                                <select
                                                    id={`status-${b._id}`}
                                                    value={selectedStatuses[b._id] ?? 'pending'}
                                                    onChange={e => handleStatusSelect(b._id, e.target.value)}
                                                    className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-800"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="working">Working</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </div>
                                            <button
                                                onClick={() => handleConfirm(b._id)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
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
