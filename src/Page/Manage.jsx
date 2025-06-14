import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../Them/ThemProvider';
import { AuthContext } from '../Contexts/AuthContext';
import { HiLocationMarker, HiPencil, HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router';
import { myApplitionPromise } from '../API/Application';

const Manage = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (user?.email) {
            myApplitionPromise(user.email)
                .then(data => setJobs(data))
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/working/${id}`)
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

    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-black';
    const cardBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const cardText = theme === 'dark' ? 'text-white' : 'text-black';

    return (
        <div className={`${bgClass} min-h-screen py-8 transition-colors duration-300`}>
            <div className="w-[85%] md:w-[80%] mx-auto">
                <h1 className={`text-4xl font-bold text-center mb-2 ${textClass}`}>Manage Your Services</h1>
                <p className={`text-center text-lg mb-8 ${textClass}`}>
                    Only your added services are shown here.
                </p>

                {jobs.length === 0 ? (
                    <p className={`text-center mt-10 text-xl ${textClass}`}>
                        You have not added any services yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {jobs.map((job) => {
                            const {
                                _id, title, description, serviceImageUrl,
                                serviceArea, priceRange, currency, providerName
                            } = job;
                            const image = serviceImageUrl || 'https://i.ibb.co/WNdTbN06/lake-9585821.jpg';

                            return (
                                <div key={_id} className={`rounded-lg overflow-hidden shadow-lg ${cardBg} ${cardText}`}>
                                    <img src={image} alt={title} className="w-full h-52 object-cover" />
                                    <div className="p-5">
                                        <h2 className="text-2xl font-bold mb-2">{title}</h2>
                                        <p className="line-clamp-3 mb-3">{description}</p>
                                        <p className="text-sm mb-4">
                                            Posted by <span className="font-semibold">{providerName || 'Unknown'}</span>
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {serviceArea?.length ? (
                                                serviceArea.map((area, idx) => (
                                                    <span key={idx} className="flex items-center gap-1 bg-gray-700 text-white text-sm px-2 py-1 rounded">
                                                        <HiLocationMarker className="w-4 h-4" />
                                                        {area}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-500 text-sm">No area listed</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-lg">
                                                {currency} {priceRange?.[0]} - {priceRange?.[1]}
                                            </span>

                                            <div className="flex gap-3">
                                                <Link
                                                    to={`/EditServices/${_id}`}
                                                    className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                                >
                                                    <HiPencil className="w-4 h-4" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(_id)}
                                                    className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    <HiTrash className="w-4 h-4" />
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
