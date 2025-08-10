import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../Them/ThemProvider';
import { AuthContext } from '../Contexts/AuthContext';
import { HiLocationMarker, HiPencil, HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router';
import { myApplitionPromise } from '../API/Application';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Animation - 1749975033533.json';

const Manage = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (user?.email) {
            myApplitionPromise(user.email, user.accessToken)
                .then(data => {
                    setJobs(data);
                })
                .catch(err => console.error('Failed to fetch bookings:', err));
        } else {
            setJobs([]);
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2563eb', // blue-600
            cancelButtonColor: '#dc2626', // red-600
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://services-server.vercel.app/working/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0 || res.data.success) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your task has been deleted.',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            setJobs(prev => prev.filter(job => job._id !== id));
                        } else {
                            Swal.fire('Error!', 'Could not delete the task.', 'error');
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error!', 'An error occurred while deleting.', 'error');
                    });
            }
        });
    };

    // পরিবর্তিত ব্যাকগ্রাউন্ড ক্লাস
    const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const cardBg = theme === 'dark' ? 'bg-black' : 'bg-white';
    const cardText = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const tagBg = theme === 'dark' ? 'bg-blue-700' : 'bg-blue-200';
    const tagText = theme === 'dark' ? 'text-blue-200' : 'text-blue-900';

    return (
        <div className={`${bgClass} min-h-screen py-10 transition-colors duration-300`}>
            <div className="w-[85%] md:w-[80%] mx-auto">
                <h1 className={`text-4xl font-extrabold text-center mb-4 ${textClass}`}>
                    Manage Your Services <span className="inline-block ml-2">🛠️</span>
                </h1>
                <p className={`text-center text-lg mb-10 ${textClass}`}>
                    Only your added services are shown here.
                </p>

                {jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-6 w-full h-[400px] md:h-[600px]">
                        <Lottie
                            animationData={loginAnimation}
                            loop={true}
                            style={{ width: '300px', height: '300px' }}
                        />
                        <p className="text-lg text-blue-500 font-semibold">No bookings found for your account.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {jobs.map((job) => {
                            const {
                                _id,
                                title,
                                description,
                                serviceImageUrl,
                                serviceArea,
                                priceRange,
                                currency,
                                providerName
                            } = job;
                            const image = serviceImageUrl || 'https://i.ibb.co/WNdTbN06/lake-9585821.jpg';

                            return (
                                <div
                                    key={_id}
                                    className={` shadow-lg overflow-hidden rounded-t-xl  ${cardBg} ${cardText} flex flex-col`}
                                >
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-52 object-cover"
                                    />

                                    <div className="p-6 flex flex-col flex-1 justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-3">{title}</h2>
                                            <p className="line-clamp-3 mb-4">{description}</p>

                                            <p className="text-sm mb-4">
                                                Posted by <span className="font-semibold">{providerName || 'Unknown'}</span>
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {serviceArea?.length ? (
                                                    serviceArea.map((area, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${tagBg} ${tagText}`}
                                                        >
                                                            <HiLocationMarker className="w-5 h-5" />
                                                            {area}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500 text-sm">No area listed</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="font-extrabold text-lg text-blue-500">
                                                {currency} {priceRange?.[0]} - {priceRange?.[1]}
                                            </span>

                                            <div className="flex gap-4">
                                                <Link
                                                    to={`/Dashboard/EditServices/${_id}`}
                                                    className="flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                                                >
                                                    <HiPencil className="w-5 h-5" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(_id)}
                                                    className="flex items-center gap-2 px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                                                >
                                                    <HiTrash className="w-5 h-5" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Manage;
