import React, { useEffect, useState } from 'react';
import Jobcard from './Jobcard';

const HotJobs = ({ jobsPromis }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobsPromis.then((data) => {
      setJobs(data);
    });
  }, [jobsPromis]);

  return (
    <div className="grid grid-cols-1  space-grotesk sm:grid-cols-2 gap-6 px-4 md:px-8 my-12 max-w-5xl mx-auto">
      {jobs.map(job => (
        <Jobcard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default HotJobs;
