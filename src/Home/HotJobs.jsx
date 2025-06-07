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

  // Background and text classes based on theme
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <div className={`${bgClass} py-4 mt-2`}>
      <div className={`grid grid-cols-1 space-grotesk sm:grid-cols-2 gap-6 px-4 md:px-8 my-12 max-w-5xl mx-auto ${textClass}`}>
        {jobs.map(job => (
          <Jobcard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
