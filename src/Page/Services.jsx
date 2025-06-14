import React, { useContext, useEffect, useState } from 'react';
import Jobcard from '../Home/Jobcard';
import { FaSearch } from 'react-icons/fa';
import { ThemeContext } from '../Them/ThemProvider';

const Services = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { theme } = useContext(ThemeContext);

    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';

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

    const filteredJobs = jobs.filter(job =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`${bgClass} min-h-screen transition-colors duration-300`}>
            <section className={`${textClass} py-12 px-4 md:px-8 w-[94%] mx-auto transition-colors duration-300`}>

                {/* Search Form */}
                <div className="flex justify-end mb-8">
                    <form
                        className="relative w-full md:w-auto"
                        onSubmit={e => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className={`
                                rounded-full 
                                w-full md:w-96 lg:w-[400px] 
                                pl-12 pr-4 py-3
                                bg-gray-100 dark:bg-gray-800 
                                text-black dark:text-white 
                                border border-gray-300 dark:border-gray-600 
                                placeholder-gray-500 dark:placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                transition-colors duration-300
                            `}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    </form>
                </div>

                {/* Title */}
                <h2 className="text-5xl font-semibold mb-6 text-center">All Services</h2>

                {/* Job Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredJobs.map(job => (
                        <Jobcard key={job.id} job={job} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Services;
