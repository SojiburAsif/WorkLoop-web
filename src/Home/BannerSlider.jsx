import React, { useContext } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Keyboard, Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import { ThemeContext } from '../Them/ThemProvider';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const images = [
    "https://i.ibb.co/Jjfw8x5x/receptionists-5975962.jpg",
    "https://i.ibb.co/QFBhhHGY/apple-1867752.jpg",
    "https://i.ibb.co/hRpjgb11/man-6869870.jpg",
];

const Banner = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <section className={`min-h-screen flex flex-col md:flex-row items-start justify-start poppins-font transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
            <div className="w-full md:w-1/2 px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-24 lg:py-32 mx-auto">
                <div className="max-w-prose text-left">
                    <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                        Empower Your{' '}
                        <span className="text-blue-500">
                            <Typewriter
                                words={[
                                    'Explore Services from Others',
                                    'Book & Track Service Status',
                                    'Share Your Services Effortlessly'
                                ]}
                                loop={true}
                                cursor
                                cursorStyle="|"
                                typeSpeed={100}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>{' '}
                        with Top Service Providers
                    </h1>

                    <p className="mt-4 text-base sm:text-lg">
                        Add, update, and manage your own services with ease. Unlock the full potential of your skills and connect with those who need them.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <MotionLink
                            to="/add-task"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                            className="inline-block rounded border border-blue-500 bg-blue-500 px-6 py-3 font-medium text-white shadow-sm"
                        >
                            Post a Service
                        </MotionLink>

                        <MotionLink
                            to="/services"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: 1,
                            }}
                            className={`inline-block rounded border px-6 py-3 font-medium shadow-sm ${theme === 'dark'
                                ? 'border-gray-700 text-gray-200 hover:bg-gray-800 hover:text-white'
                                : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            All Services
                        </MotionLink>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[50%] px-4 pt-6 md:pt-12 md:pr-12">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    keyboard={{ enabled: true }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    effect="fade"
                    modules={[Keyboard, Pagination, Navigation, Autoplay, EffectFade]}
                    className="rounded-2xl"
                >
                    {images.map((src, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                className="w-full h-[200px] sm:h-[250px] md:h-full object-cover rounded-2xl"
                                src={src}
                                alt={`Slide ${idx + 1}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Banner;
