import React from 'react';
import { HiArrowNarrowRight, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router'; // fixed import (was 'react-router')

const Jobcard = ({ job }) => {
    const {
        _id,
        title,
        description,
        serviceImageUrl,
        serviceArea,
        priceRange,
        currency,
        providerName,
       
    } = job;

    // Fallback image if serviceImageUrl is missing
    const displayImage = serviceImageUrl || "https://i.ibb.co/WNdTbN06/lake-9585821.jpg";

    return (
        <div className="card w-[420px] bg-base-100 shadow-md relative">
            {/* User info overlay (optional) */}
            {/* <div className="absolute top-4 left-4 flex items-center gap-3  px-3 py-1 rounded shadow-md z-10">
                {providerImage ? (
                    <img
                        src={providerImage}
                        alt={providerName || "User"}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 border border-gray-300">
                        U
                    </div>
                )}
                <span className="font-medium text-gray-800">{providerName || "User Name"}</span>
            </div> */}

            <figure>
                <img
                    src={displayImage}
                    alt={title}
                    className="w-full h-56 object-cover"
                />
            </figure>

            <div className="card-body">
                <h2 className="card-title text-2xl font-bold">{title}</h2>
                <p className="text-lg text-gray-700 line-clamp-4">{description}</p>
                <p className="text-base text-gray-500 mt-3">
                    Posted by{' '}
                    <span className="font-semibold text-gray-800">
                        {providerName || "Unknown"}
                    </span>
                </p>

                {/* serviceArea with location icon */}
                <div className="mt-3 flex flex-wrap gap-3">
                    {serviceArea && serviceArea.length > 0 ? (
                        serviceArea.map((area, index) => (
                            <span
                                key={index}
                                className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                            >
                                <HiLocationMarker className="w-4 h-4" />
                                {area}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">No service area listed</span>
                    )}
                </div>

                <div className="card-actions justify-between items-center mt-5">
                    <span className="text-green-700 font-bold text-xl">
                        {currency} {priceRange?.[0]} - {priceRange?.[1]}
                    </span>
                    <Link
                        to={`/working/${_id}`}
                        className="btn btn-primary btn-md flex items-center gap-2 text-base"
                    >
                        View Details <HiArrowNarrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Jobcard;
