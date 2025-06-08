import React, { useEffect, useState } from 'react';
import Jobcard from '../Home/Jobcard';

const Services = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/working')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
            })
            .catch(err => {
                console.error('Failed to fetch jobs:', err);
            });
    }, []);

    const textClass = 'text-gray-900';

    return (
        <div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-8 my-12 max-w-8xl mx-15 ${textClass}`}>
                {jobs.map(job => (
                    <Jobcard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default Services;
