import React, { useContext, useEffect, useState } from 'react';
import Jobcard from './Jobcard';
import { ThemeContext } from '../Them/ThemProvider';
import CardLoader from '../Loding/CardLoade';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const loaderVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

const HotJobs = ({ jobsPromis }) => {
  const { theme } = useContext(ThemeContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // jobsPromis might be a Promise; handle safely
    if (!jobsPromis || typeof jobsPromis.then !== 'function') {
      // if it's not a promise, assume it's an array
      setJobs(Array.isArray(jobsPromis) ? jobsPromis : []);
      setLoading(false);
      return;
    }

    jobsPromis
      .then((data) => {
        if (!mounted) return;
        setJobs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Failed to load hot jobs:', err);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [jobsPromis]);

  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <section className={`${bgClass} py-12`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className={`text-4xl font-bold text-center ${textClass}`}>Most Popular Services</h1>
        <p className={`text-center text-lg mt-2 ${textClass}`}>Discover the top-rated services trusted by hundreds of happy clients.</p>

        {/* Grid / Loader */}
        <div className="mt-10">
          {loading ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial="hidden"
              animate="show"
              variants={containerVariants}
            >
              {[0, 1, 2].map((i) => (
                <motion.div key={i} variants={loaderVariants} initial="hidden" animate="show">
                  <CardLoader />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 mt-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              role="list"
            >
              <AnimatePresence>
                {jobs.slice(0, 6).map((job) => (
                  <motion.div
                    key={job._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                    className="w-full"
                    role="listitem"
                  >
                    {/* wrap Jobcard so hover applies to whole tile */}
                    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-sm hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden`}>
                      <Jobcard job={job} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotJobs;
