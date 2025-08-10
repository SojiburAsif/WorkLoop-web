import React, { useContext } from 'react';
import { ThemeContext } from '../Them/ThemProvider';
import BannerSlider from './BannerSlider';
import HotJobs from './HotJobs';
import DiscountPage from './Discounts';
import Review from './Review';
import Latest from './Latest';
import Promotion from './Promotion';
import HomePage from './Servis';

const Home = () => {
  const { theme } = useContext(ThemeContext);
 const jobsPromis = fetch('https://services-server.vercel.app/working').then(res=> res.json())
  return (
    <div className={`${theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-black'} min-h-screen transition-colors duration-300`}>
      <div className="">
        <BannerSlider />
      </div>

      <div className="c">
        <HotJobs jobsPromis={jobsPromis} />
        <DiscountPage />
        <Review />
        <Latest />
        <Promotion />
        <HomePage />
      </div>
    </div>
  );
};

export default Home;
