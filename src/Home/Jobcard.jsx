import React, { useContext } from 'react';
import { HiArrowNarrowRight, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router'; // corrected import path
import { ThemeContext } from '../Them/ThemProvider'; // তোমার থিম প্রোভাইডারের পাথ চেক করে নিবে

const Jobcard = ({ job }) => {
  const { theme } = useContext(ThemeContext);

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

  const displayImage = serviceImageUrl || "https://i.ibb.co/WNdTbN06/lake-9585821.jpg";

  // Dynamic classes based on theme
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-base-100';
  const titleClass = theme === 'dark' ? 'text-white' : 'text-black';
  const descClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const providerClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-800';
  const areaBadgeBg = theme === 'dark' ? 'bg-blue-800' : 'bg-blue-100';
  const areaBadgeText = theme === 'dark' ? 'text-blue-300' : 'text-blue-800';
  const priceClass = theme === 'dark' ? 'text-green-400' : 'text-green-700';

  return (
    <div className={`card w-[420px] shadow-md relative  rounded-lg ${bgClass}`}>
      <figure>
        <img
          src={displayImage}
          alt={title}
          className="w-full h-56 object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className={`card-title text-2xl font-bold ${titleClass}`}>{title}</h2>
        <p className={`text-lg line-clamp-4 ${descClass}`}>{description}</p>
        <p className={`text-base mt-3 ${providerClass}`}>
          Posted by{' '}
          <span className={`font-semibold ${providerClass}`}>
            {providerName || "Unknown"}
          </span>
        </p>

        <div className="mt-3 flex flex-wrap gap-3">
          {serviceArea && serviceArea.length > 0 ? (
            serviceArea.map((area, index) => (
              <span
                key={index}
                className={`flex items-center gap-1 ${areaBadgeBg} ${areaBadgeText} text-sm px-2 py-1 rounded`}
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
          <span className={`font-bold text-xl ${priceClass}`}>
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
