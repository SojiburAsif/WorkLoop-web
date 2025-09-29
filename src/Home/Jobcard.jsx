import React, { useContext } from 'react';
import { HiArrowNarrowRight, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router'; // fixed import
import { ThemeContext } from '../Them/ThemProvider';
import { motion } from 'framer-motion';

const Jobcard = ({ job }) => {
  const { theme } = useContext(ThemeContext);
  const {
    _id, title, description,
    serviceImageUrl, serviceArea,
    priceRange = ['N/A', 'N/A'],
    currency = '৳',
    providerName,
  } = job;

  const displayImage =
    serviceImageUrl || 'https://i.ibb.co/WNdTbN06/lake-9585821.jpg';

  const isDark = theme === 'dark';
  const textClass = isDark ? 'text-white' : 'text-black';
  const badgeBgClass = isDark ? 'text-white border-white' : 'badge-outline';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`card w-96 transition-all    duration-300 ${isDark ? 'bg-black' : 'bg-white'} flex flex-col`}
      style={{ height: '500px' }}
    >
      <figure className="h-56 overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </figure>

      <div className="card-body flex flex-col flex-grow">
        {/* Title */}
        <h2 className="card-title text-xl md:text-2xl text-blue-500 font-bold mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className={`line-clamp-3 text-sm ${textClass} flex-grow overflow-hidden`}>
          {description}
        </p>

        {/* Posted by */}
        <p className={`text-sm mt-2 ${textClass}`}>
          Posted by <span className="font-semibold">{providerName || 'Unknown'}</span>
        </p>

        {/* Areas */}
        {serviceArea?.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-semibold text-blue-500 mb-1">Areas:</p>
            <div className="card-actions justify-start flex-wrap gap-2">
              {serviceArea.map((area, idx) => (
                <div
                  key={idx}
                  className={`badge ${badgeBgClass} flex items-center gap-1 text-xs px-2 py-1`}
                >
                  <HiLocationMarker className="w-4 h-4 text-blue-500" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price & View Button */}
        <div className="card-actions justify-between items-center mt-4 pt-2">
          <span className="text-lg font-bold px-3 py-1 rounded-lg">
            {currency} {priceRange[0]} - {priceRange[1]}
          </span>

          <Link
            to={`/Dashboard/working/${_id}`}
            className="btn bg-blue-500 hover:bg-blue-600 text-white text-base px-6 py-2"
          >
            View <HiArrowNarrowRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>



  );
};

export default Jobcard;
