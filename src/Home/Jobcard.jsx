import React, { useContext } from 'react';
import { HiArrowNarrowRight, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router'; // fixed from 'react-router'
import { ThemeContext } from '../Them/ThemProvider';

const Jobcard = ({ job }) => {
  const { theme } = useContext(ThemeContext);
  const {
    _id, title, description,
    serviceImageUrl, serviceArea,
    priceRange = ['N/A', 'N/A'],
    currency = '৳',
    providerName,
  } = job;

  const displayImage = serviceImageUrl || 'https://i.ibb.co/WNdTbN06/lake-9585821.jpg';

  const textClass = theme === 'dark' ? 'text-white' : 'text-black';
  const badgeBgClass = theme === 'dark' ? 'badge-outline text-white border-white' : 'badge-outline';

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={displayImage}
          alt={title}
          className="object-cover w-full h-56"
          loading="lazy"
        />
      </figure>

      <div className="card-body">
        {/* Title */}
        <h2 className="card-title text-xl md:text-2xl font-bold">{title}</h2>

        {/* Description */}
        <p className={`line-clamp-3 text-sm ${textClass}`}>
          {description}
        </p>

        {/* Posted by */}
        <p className={`text-sm ${textClass}`}>
          Posted by <span className="font-semibold text-blue-500">{providerName || 'Unknown'}</span>
        </p>

        {/* Area badges with "providerName:" label shown once */}
        {serviceArea?.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-semibold text-blue-500 mb-1">
              {'Arya'}:
            </p>
            <div className="card-actions justify-start flex-wrap gap-2">
              {serviceArea.map((area, idx) => (
                <div
                  key={idx}
                  className={`badge ${badgeBgClass} flex items-center gap-1 text-xs px-2 py-1`}
                >
                  <HiLocationMarker className="w-4 h-4" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price & View Button */}
        <div className="card-actions justify-between text-2xl items-center mt-4">
          <span className="text-lg font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-lg">
            {currency} {priceRange[0]} - {priceRange[1]}
          </span>


          <Link
            to={`/working/${_id}`}
            className="btn bg-blue-500 hover:bg-blue-600 text-white text-base px-6 py-2"
          >
            View <HiArrowNarrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Jobcard;
