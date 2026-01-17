import React, { useContext } from 'react';
import { ThemeContext } from '../Them/ThemProvider';


const ChartLoading = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex items-center justify-center p-6 rounded shadow-md w-full h-40 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}
      aria-label="Loading chart data"
    >
      <svg
        className={`animate-spin h-10 w-10 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="img"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
  );
};

export default ChartLoading;
