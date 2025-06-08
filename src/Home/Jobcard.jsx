import React, { useContext } from 'react';
import { HiArrowNarrowRight, HiLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ThemeContext } from '../Them/ThemProvider';

const Jobcard = ({ job }) => {
  const { theme } = useContext(ThemeContext);
  const {
    _id, title, description,
    serviceImageUrl, serviceArea,
    priceRange, currency, providerName,
  } = job;

  const displayImage = serviceImageUrl || 'https://i.ibb.co/WNdTbN06/lake-9585821.jpg';
  const bgClass        = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass      = theme === 'dark' ? 'text-white' : 'text-black';
  const badgeBgClass   = theme === 'dark' ? 'bg-white' : 'bg-black';
  const badgeTextClass = theme === 'dark' ? 'text-black' : 'text-white';
  const btnBgClass     = theme === 'dark' ? 'bg-white' : 'bg-black';
  const btnTextClass   = theme === 'dark' ? 'text-black' : 'text-white';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      role="region"
      aria-labelledby={`job-title-${_id}`}
      className={`
        card w-full max-w-3xl rounded-lg overflow-hidden transition-shadow duration-300
        hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]
        ${bgClass}
        ${theme === 'dark'
          ? 'shadow-[0_4px_6px_rgba(255,255,255,0.3)]'
          : 'shadow-xl'}
      `}
    >
      <figure>
        <img
          src={displayImage}
          alt={title}
          className="w-full h-56 object-cover"
        />
      </figure>

      <div className="card-body p-6">
        <h2 id={`job-title-${_id}`} className={`text-3xl font-bold mb-2 ${textClass}`}>
          {title}
        </h2>

        <p className={`text-lg line-clamp-4 mb-4 ${textClass}`}>
          {description}
        </p>

        <p className={`text-sm mb-4 ${textClass}`}>
          Posted by <span className="font-semibold">{providerName || 'Unknown'}</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {serviceArea?.length ? (
            serviceArea.map((area, idx) => (
              <span
                key={idx}
                className={`flex items-center gap-1 ${badgeBgClass} ${badgeTextClass} text-sm px-2 py-1 rounded`}
                aria-label={`Service area: ${area}`}
              >
                <HiLocationMarker className="w-4 h-4" aria-hidden="true" />
                {area}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No service area listed</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className={`font-bold text-xl ${textClass}`}>
            {currency} {priceRange?.[0]} - {priceRange?.[1]}
          </span>

          {/* Looping pulse animation on the button */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Link
              to={`/working/${_id}`}
              aria-label={`View details for ${title}`}
              className={`
                flex items-center gap-2 font-semibold text-lg 
                rounded-lg px-6 py-3 transition
                ${btnBgClass} ${btnTextClass}
                hover:opacity-90 active:opacity-80
              `}
            >
              View Details <HiArrowNarrowRight className="w-6 h-6" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Jobcard;
