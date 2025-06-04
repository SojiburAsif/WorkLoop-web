import React from "react";
import Lottie from "lottie-react";
import animation404 from "../assets/Animation - 1748975144594.json"; // Your Lottie JSON

const Error = () => {
  return (
    <section className="relative z-10 bg-primary w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Floating decorative circles */}
      <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-white opacity-10 animate-ping"></div>
      <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-white opacity-20"></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Left: Lottie Animation */}
        <div className="md:w-1/2 flex items-center justify-center animate-fade-in">
          <Lottie
            animationData={animation404}
            loop={true}
            className="w-80 h-80 md:w-96 md:h-96"
          />
        </div>

        {/* Right: Text Content */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 animate-fade-in">
          {/* Semi-transparent diagonal overlay */}
          <div className="absolute inset-0 transform -rotate-6 bg-gradient-to-r from-[#ffffff20] to-[#ffffff00] pointer-events-none"></div>

          <h2 className="relative z-10 text-[80px] font-extrabold leading-none text-white sm:text-[120px] md:text-[160px]">
            404
          </h2>
          <h4 className="relative z-10 text-[24px] font-semibold leading-tight text-white">
            Oops! That page can’t be found
          </h4>
          <p className="relative z-10 max-w-[400px] text-lg text-white">
            The page you’re looking for may have been moved or deleted.
          </p>
          <a
            href="/"
            className="relative z-10 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-primary shadow-lg transition hover:bg-opacity-90 hover:shadow-2xl"
          >
            Go To Home
          </a>
        </div>
      </div>

      {/* More decorative shapes */}
      <div className="absolute top-1/3 left-1/2 h-20 w-20 bg-white rounded-full opacity-5 mix-blend-overlay"></div>
      <div className="absolute bottom-1/4 left-1/4 h-16 w-16 bg-white rounded-full opacity-5 mix-blend-overlay"></div>
    </section>
  );
};

export default Error;
