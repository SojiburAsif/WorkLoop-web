import React from 'react';
import BannerSlider from './BannerSlider';
import AddTask from '../Form/DataAdd';
import HomePage from './Servis';
import Latest from './Latest';
import HotJobs from './HotJobs';

const Home = () => {
    const jobsPromis = fetch('http://localhost:3000/working').then(res=> res.json())
    return (
        <div>
            <div className="">
                <div className="w-full h-[750px] m-0 py-2 px-7">
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
