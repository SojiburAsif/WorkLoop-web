import React from 'react';

const Loading = () => {
  return (
    // 1) fixed inset-0: পুরো viewport ঢেকে দেয়
    // 2) backdrop-blur-sm: পেছনের কন্টেন্ট ব্লার করে দেবে
    // 3) bg-white bg-opacity-20: হালকা সাদা আচ্ছাদন (টিন্ট)
    // 4) z-50: অন্য যেকোনো ইলিমেন্টের উপরে প্রদর্শন হবে
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-20 z-50">
      
      {/* ভেতরের কার্ডের মতো কনটেইনার */}
      <div className="flex flex-col items-center space-y-4 p-6 bg-opacity-10 rounded-xl ">
        
        {/* DaisyUI-এর loading-bars (একই লাইনে) */}
        <div className="flex space-x-2">
          <span className="loading loading-bars loading-xs"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-md"></span>
          <span className="loading loading-bars loading-lg"></span>
          <span className="loading loading-bars loading-xl"></span>
        </div>
        
        {/* Loading টেক্সট */}
        <p className="text-black text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
