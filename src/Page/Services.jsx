import React, { useContext, useEffect, useState } from 'react';
import Jobcard from '../Home/Jobcard';
import { FaSearch } from 'react-icons/fa';
import { ThemeContext } from '../Them/ThemProvider';
import CardLoader from '../Loding/CardLoade';

const Services = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    const bgClass = theme === 'dark' ? 'bg-black' : 'bg-gray-50';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const inputBgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';
    const borderClass = theme === 'dark' ? 'border-gray-900' : 'border-gray-300';
    const placeholderClass = theme === 'dark' ? 'placeholder-gray-100' : 'placeholder-gray-500';
    const focusRingClass = theme === 'dark' ? 'focus:ring-blue-400' : 'focus:ring-blue-500';

    useEffect(() => {
        setIsLoading(true);
        fetch('https://services-server.vercel.app/working')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch jobs:', err);
                setIsLoading(false);
            });
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`${bgClass} transition-colors duration-300`}>
            <section className={`${textClass} py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-14 transition-colors duration-300`}>
                {/* Search Form */}
                <div className="flex justify-end mb-8">
                    <form className="relative w-full md:w-auto" onSubmit={e => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className={`
                                rounded-full
                                w-full md:w-96 lg:w-[400px]
                                pl-12 pr-4 py-3
                                ${inputBgClass}
                                border ${borderClass}
                                ${placeholderClass}
                                focus:outline-none focus:ring-2 ${focusRingClass}
                                transition-colors duration-300
                            `}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </form>
                </div>

                {/* Title */}
                <h2 className="text-4xl sm:text-5xl font-semibold mb-6 text-center">{`All Services`}</h2>

                {/* Loading or Job Cards */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <CardLoader />
                        <CardLoader />
                        <CardLoader />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredJobs.map(job => (
                            <div key={job._id} className="w-full max-w-sm mx-auto">
                                <Jobcard job={job} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Services;
