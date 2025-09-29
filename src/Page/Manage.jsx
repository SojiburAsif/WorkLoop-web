import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../Them/ThemProvider';
import { AuthContext } from '../Contexts/AuthContext';
import { HiLocationMarker, HiPencil, HiTrash } from 'react-icons/hi';
import { FiGrid, FiList } from 'react-icons/fi';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router'; // use react-router-dom
import { myApplitionPromise } from '../API/Application';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Animation - 1749975033533.json';

const Manage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

  const isDark = theme === 'dark';

  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      myApplitionPromise(user.email, user.accessToken)
        .then((data) => setJobs(Array.isArray(data) ? data : []))
        .catch((err) => {
          console.error('Failed to fetch jobs:', err);
          setJobs([]);
        })
        .finally(() => setLoading(false));
    } else {
      setJobs([]);
      setLoading(false);
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://services-server.vercel.app/working/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0 || res.data.success) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your task has been deleted.',
                icon: 'success',
                timer: 1400,
                showConfirmButton: false,
              });
              setJobs((prev) => prev.filter((job) => job._id !== id));
            } else {
              Swal.fire('Error!', 'Could not delete the task.', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error!', 'An error occurred while deleting.', 'error');
          });
      }
    });
  };

  // theme classes
  const pageBg = isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-white';
  const cardText = isDark ? 'text-white' : 'text-gray-900';
  const descText = isDark ? 'text-gray-300' : 'text-gray-600';
  const tagBg = isDark ? 'bg-blue-800' : 'bg-blue-100';
  const tagText = isDark ? 'text-blue-200' : 'text-blue-800';
  const tableDivide = isDark ? 'divide-gray-700' : 'divide-gray-200';
  const tableHeadBg = isDark ? 'bg-gray-800' : 'bg-white';
  const rowHover = isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100';

  return (
    <div className={`${pageBg} min-h-screen py-10 transition-colors duration-300`}>
      <div className="w-[92%] md:w-[85%] mx-auto">
        {/* header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Manage Your Services <span className="inline-block ml-2">🛠️</span>
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Only your added services are shown here.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setViewMode('card')}
                aria-pressed={viewMode === 'card'}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition focus:outline-none focus:ring-2 ${
                  viewMode === 'card'
                    ? 'bg-blue-600 text-white focus:ring-blue-500'
                    : isDark
                    ? 'bg-gray-800 text-gray-300 border border-gray-700 focus:ring-gray-700'
                    : 'bg-white text-gray-700 border border-gray-200 focus:ring-blue-300'
                }`}
                title="Card view"
              >
                <FiGrid />
                Card
              </button>

              <button
                onClick={() => setViewMode('table')}
                aria-pressed={viewMode === 'table'}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition focus:outline-none focus:ring-2 ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white focus:ring-blue-500'
                    : isDark
                    ? 'bg-gray-800 text-gray-300 border border-gray-700 focus:ring-gray-700'
                    : 'bg-white text-gray-700 border border-gray-200 focus:ring-blue-300'
                }`}
                title="Table view"
              >
                <FiList />
                Table
              </button>
            </div>
          </div>
        </div>

        {/* loading / empty */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Lottie animationData={loginAnimation} loop style={{ width: 180, height: 180 }} />
          </div>
        ) : !jobs.length ? (
          <div className="flex flex-col items-center justify-center space-y-6 w-full h-[420px] md:h-[520px]">
            <Lottie animationData={loginAnimation} loop={true} style={{ width: 280, height: 280 }} />
            <p className="text-lg text-blue-500 font-semibold">No services found for your account.</p>
          </div>
        ) : viewMode === 'card' ? (
          /* CARD GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {jobs.map((job) => {
              const {
                _id,
                title,
                description,
                serviceImageUrl,
                serviceArea,
                priceRange = ['N/A', 'N/A'],
                currency = '৳',
                providerName,
              } = job;
              const image = serviceImageUrl || 'https://i.ibb.co/WNdTbN06/lake-9585821.jpg';

              return (
                <article
                  key={_id}
                  className={`${cardBg} ${cardText} rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200`}
                  style={{ minHeight: 440 }}
                >
                  <div className="h-44 md:h-48 w-full overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-blue-500 mb-2 line-clamp-2">{title}</h3>

                    <p className={`${descText} text-sm mb-3 line-clamp-3`}>{description}</p>

                    <p className="text-sm mb-3">
                      <span className="font-medium">Posted by: </span>
                      <span className="font-semibold">{providerName || 'Unknown'}</span>
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {serviceArea?.length ? (
                        serviceArea.map((area, idx) => (
                          <span
                            key={idx}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${tagBg} ${tagText}`}
                          >
                            <HiLocationMarker className="w-4 h-4" />
                            {area}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">No area listed</span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4">
                      <div className="text-lg font-extrabold text-blue-500">
                        {currency} {priceRange?.[0]} - {priceRange?.[1]}
                      </div>

                      <div className="flex gap-3">
                        <Link
                          to={`/Dashboard/EditServices/${_id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <HiPencil className="w-4 h-4" />
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(_id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          <HiTrash className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className={`min-w-full divide-y ${tableDivide} rounded-lg`}>
              <thead className={`${tableHeadBg}`}>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Area</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Provider</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className={`${isDark ? 'bg-black' : 'bg-white'}`}>
                {jobs.map((job) => {
                  const {
                    _id,
                    title,
                    serviceImageUrl,
                    serviceArea,
                    priceRange = ['N/A', 'N/A'],
                    currency = '৳',
                    providerName,
                  } = job;

                  return (
                    <tr key={_id} className={`${rowHover} ${isDark ? 'border-t border-gray-800' : 'border-t border-gray-100'}`}>
                      <td className="px-4 py-3 whitespace-nowrap max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 overflow-hidden rounded-md flex-shrink-0">
                            <img
                              src={serviceImageUrl || 'https://i.ibb.co/WNdTbN06/lake-9585821.jpg'}
                              alt={title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-blue-500 line-clamp-1">{title}</div>
                            <div className="text-xs text-gray-400 line-clamp-1">ID: {_id}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-sm">
                          {serviceArea?.slice(0, 3).join(', ') || '—'}
                          {serviceArea && serviceArea.length > 3 ? '...' : ''}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold text-blue-500">{currency} {priceRange?.[0]} - {priceRange?.[1]}</div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-sm">{providerName || 'Unknown'}</div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link
                            to={`/Dashboard/EditServices/${_id}`}
                            className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(_id)}
                            className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manage;
