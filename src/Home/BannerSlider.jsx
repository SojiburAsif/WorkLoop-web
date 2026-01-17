import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Keyboard, Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import { ThemeContext } from '../Them/ThemProvider';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const MotionLink = motion(Link);

const images = [
    { src: 'https://i.ibb.co/Jjfw8x5x/receptionists-5975962.jpg', alt: 'Professional service desk' },
    { src: 'https://i.ibb.co/QFBhhHGY/apple-1867752.jpg', alt: 'Quality tools for reliable services' },
    { src: 'https://i.ibb.co/hRpjgb11/man-6869870.jpg', alt: 'Skilled technicians providing top-notch work' },
];

const Banner = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <section className="relative  w-full h-[80vh] md:h-[90vh] overflow-hidden">
            {/* Background Slider */}
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                effect="fade"
                pagination={{ clickable: true }}
                navigation
                keyboard={{ enabled: true }}
                modules={[Keyboard, Pagination, Navigation, Autoplay, EffectFade]}
                className="absolute inset-0 w-full h-full z-0"
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full h-full">
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Content Overlay */}
            <div
                className={`absolute inset-0 md:max-w-7xl  z-10 flex flex-col items-center md:items-start justify-center px-4 md:px-12 text-center md:text-left ${isDark ? 'text-white' : 'text-white'
                    }`}
            >
                <h1 className="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl leading-tight max-w-4xl">
                    Your One-Stop Platform for{' '}
                    <span className="text-blue-400">
                        <Typewriter
                            words={[
                                'Finding Top Service Providers',
                                'Booking Professional Services',
                                'Managing All Your Service Needs',
                            ]}
                            loop
                            cursor
                            cursorStyle="|"
                            typeSpeed={80}
                            deleteSpeed={40}
                            delaySpeed={1200}
                        />
                    </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-gray-200">
                    Easily connect with trusted professionals, book services in minutes, and manage all your tasks in one place.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <MotionLink
                        to="/Dashboard/addtask"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-blue-500 hover:bg-blue-600 rounded-sm  text-white font-medium px-6 py-3  shadow-lg"
                    >
                        Post a Service
                    </MotionLink>
                    <MotionLink
                        to="/services"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-white text-gray-800 rounded-sm  font-medium px-6 py-3  shadow-lg hover:bg-gray-200"
                    >
                        View All Services
                    </MotionLink>
                </div>
            </div>
        </section>
    );
};

export default Banner;
