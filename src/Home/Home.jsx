import React from 'react';
import BannerSlider from './BannerSlider';
import AddTask from '../Form/DataAdd';
import HomePage from './Servis';
import Latest from './Latest';
import HotJobs from './HotJobs';
import Review from './Review';
import Promotion from './Promotion';
import DiscountPage from './Discounts';

const Home = () => {
    const jobsPromis = fetch('https://services-server.vercel.app/working').then(res=> res.json())
    return (
        <div>
            <div className="">
                <div className="w-full h-[750px] m-0 ">
                    <BannerSlider />
                </div>
            </div>

            <div className="c">
                <HotJobs jobsPromis={jobsPromis}></HotJobs>
              
                  <DiscountPage></DiscountPage>
                <Review></Review>
                <Latest></Latest>
                 <Promotion></Promotion>
                <HomePage></HomePage>
               
                {/* <AddTask /> */}

            </div>
        </div>
    );
};

export default Home;
