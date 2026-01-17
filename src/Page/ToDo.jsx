import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiClipboard, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { FaClipboardList } from 'react-icons/fa';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Animation - 1749975033533.json';

const ToDo = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [bookings, setBookings] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const isDark = theme === 'dark';

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://services-server.vercel.app/bookings`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(b => b.providerEmail === user.email);
        setBookings(filtered);

        const initialStatuses = {};
        filtered.forEach(b => {
          initialStatuses[b._id] = b.status || 'pending';
        });
        setSelectedStatuses(initialStatuses);
      })
      .catch(console.error);
  }, [user]);

  const handleStatusSelect = (id, newStatus) => {
    setSelectedStatuses(prev => ({ ...prev, [id]: newStatus }));
  };

  const handleConfirm = id => {
    const newStatus = selectedStatuses[id] || 'pending';

    axios
      .put(`https://services-server.vercel.app/bookings/${id}`, { status: newStatus })
      .then(() => {
        setBookings(prev =>
          prev.map(b => (b._id === id ? { ...b, status: newStatus } : b))
        );
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Booking status updated successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to update booking status!',
        });
      });
  };

  return (
    <div
      className={`${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} 
                  min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
    >
      <h1 className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3">
        <FaClipboardList size={36} className={`${isDark ? 'text-blue-500' : 'text-blue-600'}`} />
        Services Booked for You
      </h1>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
          <Lottie animationData={loginAnimation} loop style={{ width: 300, height: 300 }} />
          <p className="text-lg mt-4 text-center text-gray-400">
            You haven’t received any bookings yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {bookings.map(b => (
            <div
              key={b._id}
              className={`overflow-hidden rounded-t-xl shadow-xs shadow-blue-100  flex flex-col transition-transform hover:scale-[1.02] duration-300
                          ${isDark ? 'bg-black shadow-lg' : 'bg-white shadow-md'}`}
            >
              <img
                alt={b.serviceName}
                src={b.serviceImageUrl}
                className="h-56 w-full object-cover"
              />

              <div className="p-6 flex flex-col flex-grow">
                <h2 className={`text-2xl font-semibold mb-1 ${isDark ? 'text-blue-500' : 'text-blue-600'}`}>
                  {b.serviceName}
                </h2>
                <p className={`text-sm mb-4 ${isDark ? 'text-white' : 'text-blue-500'}`}>
                  Service request by:{' '}
                  <span className="font-medium text-blue-400">{b.userName}</span>
                </p>

                <div className="flex items-start gap-3 mb-4">
                  <FiClipboard className={`mt-1 flex-shrink-0 ${isDark ? 'text-blue-500' : 'text-blue-600'}`} size={20} />
                  <div>
                    <p className={`font-semibold text-sm ${isDark ? 'text-blue-500' : 'text-blue-600'}`}>Instructions</p>
                    <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-700'}`}>
                      {b.instructions || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className={`flex justify-between mb-6 text-sm ${isDark ? 'text-white' : 'text-blue-600'}`}>
                  <div className="flex items-center gap-2">
                    <FiCalendar className={isDark ? 'text-blue-500' : 'text-blue-600'} size={18} />
                    <span>{new Date(b.takingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className={isDark ? 'text-blue-500' : 'text-blue-600'} size={18} />
                    <span>{b.priceRange?.join(' - ')} {b.currency}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-end gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor={`status-${b._id}`}
                      className={`block mb-1 font-medium ${isDark ? 'text-blue-500' : 'text-blue-600'}`}
                    >
                      Status
                    </label>
                    <select
                      id={`status-${b._id}`}
                      value={selectedStatuses[b._id] ?? 'pending'}
                      onChange={e => handleStatusSelect(b._id, e.target.value)}
                      className={`w-full rounded px-3 py-2 
                        ${isDark
                          ? 'bg-black text-white border border-blue-500 focus:ring-blue-500'
                          : 'bg-white text-gray-900 border border-gray-300 focus:ring-blue-400'}
                        focus:outline-none focus:ring-2 transition`}
                      aria-label={`Change status for booking ${b.serviceName}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleConfirm(b._id)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    aria-label={`Confirm status update for booking ${b.serviceName}`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToDo;
