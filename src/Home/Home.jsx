import React from 'react';
import BannerSlider from './BannerSlider';
import AddTask from '../Form/DataAdd';
import HomePage from './Servis';
import Latest from './Latest';
import HotJobs from './HotJobs';

const Home = () => {
    const jobsPromis = fetch('https://backend-zeta-ochre-92.vercel.app/working').then(res=> res.json())
    return (
        <div>
            <div className="">
                <div className="w-full h-[750px] m-0 ">
                    <BannerSlider />
                </div>
            </div>

            <div className="c">
                <HotJobs jobsPromis={jobsPromis}></HotJobs>
                <Latest></Latest>
                <HomePage></HomePage>
                {/* <AddTask /> */}

            </div>
        </div>
    );
};

export default Home;
