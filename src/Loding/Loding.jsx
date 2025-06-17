import React, { useContext, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import { ThemeContext } from '../Them/ThemProvider';
import loaderAnimation from '../assets/Animation - 1750161889588 (1).json';

const ServicesLoader = () => {
  const { theme } = useContext(ThemeContext);
  const lottieRef = useRef();

  useEffect(() => {
    // Lottie speed manually set
    if (lottieRef.current) {
      lottieRef.current.setSpeed(18); // 2x speed
    }
  }, []);

  const backgroundClass =
    theme === 'dark' ? 'bg-black bg-opacity-60' : 'bg-gray-200 bg-opacity-60';
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center ${backgroundClass} backdrop-blur-sm z-50`}
      aria-label="Loading services"
    >
      {/* Lottie animation */}
      <div className="w-40 h-40 mb-6">
        <Lottie
          lottieRef={lottieRef}
          animationData={loaderAnimation}
          loop={true}
        />
      </div>

      <p className={`mt-6 text-xl font-semibold ${textColorClass}`}>
        Loading...
      </p>
    </div>
  );
};

export default ServicesLoader;
