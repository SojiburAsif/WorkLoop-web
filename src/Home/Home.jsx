import React from 'react';
import BannerSlider from './BannerSlider';

const Home = () => {
    return (
        <div className=" bg-gray-100 min-h-screen">  {/* পুরো স্ক্রীনের উচ্চতা নেবে */}
            <div className="w-full  h-[750px] m-0 px-7 ">
                <BannerSlider />
            </div>
        </div>
    );
};

export default Home;
