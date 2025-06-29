import React, { useContext, useEffect, useState } from 'react';
import Jobcard from './Jobcard';
import { ThemeContext } from '../Them/ThemProvider';

const HotJobs = ({ jobsPromis }) => {
  const { theme } = useContext(ThemeContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobsPromis.then((data) => {
      setJobs(data);
    });
  }, [jobsPromis]);

  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <div className={`${bgClass} py-12`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className={`text-4xl font-bold text-center ${textClass}`}>
          Most Popular Services
        </h1>
        <p className={`text-center text-lg mt-2 ${textClass}`}>
          Discover the top-rated services trusted by hundreds of happy clients.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {jobs.slice(0, 6).map((job) => (
            <Jobcard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotJobs;
