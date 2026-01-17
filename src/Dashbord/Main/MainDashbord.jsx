import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import Footer from '../../Fooder/Fooder';
import { AuthContext } from '../../Contexts/AuthContext';
import { ThemeContext } from '../../Them/ThemProvider';
import { FaBook, FaCheckCircle, FaClock, FaTools } from 'react-icons/fa';
import ChartLoading from '../../Loding/ChartLoading';

const SERVICES_URL = 'https://services-server.vercel.app/workings/all';
const BOOKINGS_URL = 'https://services-server.vercel.app/bookingss/all';

const MONO_LIGHT = ['#111827', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB'];
const MONO_DARK = ['#FFFFFF', '#E5E7EB', '#9CA3AF', '#6B7280', '#4B5563'];

const BLUE_500 = '#3B82F6';
const BLUE_500_DARK = '#60A5FA';

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalServices, setTotalServices] = useState(0);
  const [bookedServices, setBookedServices] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  const [bookingsList, setBookingsList] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);

  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    setBookingsLoading(true);
    setBookingsError(null);

    async function fetchData() {
      try {
        const [sRes, bRes] = await Promise.all([fetch(SERVICES_URL), fetch(BOOKINGS_URL)]);
        if (!sRes.ok) throw new Error(`Services fetch failed: ${sRes.status}`);
        if (!bRes.ok) throw new Error(`Bookings fetch failed: ${bRes.status}`);

        const servicesData = await sRes.json();
        const bookingsData = await bRes.json();

        if (!mounted) return;

        setBookingsList(Array.isArray(bookingsData) ? bookingsData : []);

        const servicesCount = Array.isArray(servicesData) ? servicesData.length : 0;
        const bookingsCount = Array.isArray(bookingsData) ? bookingsData.length : 0;

        let pendingCount = 0;
        if (Array.isArray(bookingsData)) {
          pendingCount = bookingsData.reduce((acc, b) => {
            const s = (b?.status || b?.serviceStatus || '').toLowerCase();
            return acc + (s === 'pending' ? 1 : 0);
          }, 0);
        }

        setTotalServices(servicesCount);
        setBookedServices(bookingsCount);
        setPendingTasks(pendingCount);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Failed to load data');
        setBookingsError(err.message || null);
      } finally {
        if (mounted) {
          setLoading(false);
          setBookingsLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const monoPalette = isDark ? MONO_DARK : MONO_LIGHT;
  const strokeColor = isDark ? '#FFFFFF' : '#111827';

  const bookingsTimeSeries = useMemo(() => {
    if (!Array.isArray(bookingsList) || bookingsList.length === 0) return [];

    const counts = {};
    bookingsList.forEach((b) => {
      const rawDate = b?.takingDate || b?.bookedAt || b?.date || b?.bookingDate || null;
      if (!rawDate) return;
      let dt;
      if (typeof rawDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
        dt = new Date(rawDate + 'T00:00:00Z');
      } else {
        dt = new Date(rawDate);
      }
      if (!dt || isNaN(dt)) return;
      const key = dt.toISOString().slice(0, 10);
      counts[key] = (counts[key] || 0) + 1;
    });

    const keys = Object.keys(counts).sort((a, b) => new Date(a) - new Date(b));
    const lastN = 30;
    const keysLimited = keys.length > lastN ? keys.slice(-lastN) : keys;

    return keysLimited.map((k) => {
      const dt = new Date(k);
      const label = dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      return { dateKey: k, date: label, count: counts[k] };
    });
  }, [bookingsList]);

  const topServices = useMemo(() => {
    if (!Array.isArray(bookingsList) || bookingsList.length === 0) return [];
    const map = {};
    bookingsList.forEach((b) => {
      const name = b?.serviceName || 'Unknown';
      map[name] = (map[name] || 0) + 1;
    });
    const arr = Object.entries(map).map(([name, count]) => ({ name, count }));
    arr.sort((a, b) => b.count - a.count);
    return arr.slice(0, 8);
  }, [bookingsList]);

  const statusDistribution = useMemo(() => {
    if (!Array.isArray(bookingsList) || bookingsList.length === 0) return [];
    const map = {};
    bookingsList.forEach((b) => {
      const st = (b?.status || b?.serviceStatus || 'unknown').toString();
      map[st] = (map[st] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [bookingsList]);

  const chartData = [
    { name: 'Total Services', value: totalServices },
    { name: 'Booked', value: bookedServices },
    { name: 'Pending', value: pendingTasks },
  ];

  const primaryColor = isDark ? BLUE_500_DARK : BLUE_500;

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto">
          {user && (
            <section
              className={`flex items-center gap-4 mb-6 p-4 w-full sm:max-w-sm ${isDark ? 'text-white' : 'bg-white text-gray-800'} rounded-md shadow`}
              aria-label="User Profile"
            >
              <img
                src={user.photoURL || user.photo || '/default-profile.png'}
                alt={user.displayName || user.name || user.email || 'User'}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-300"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="text-lg sm:text-xl font-semibold flex items-center gap-2 truncate">
                  {user.displayName || user.name || user.email || 'User'}
                  {user.emailVerified && <FaCheckCircle className="text-blue-500" title="Verified" />}
                </p>
                <p className={isDark ? 'text-gray-300 text-sm' : 'text-gray-500 text-sm truncate'}>{user.email}</p>
              </div>
            </section>
          )}

          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-blue-500'}`}>
              Welcome to Your Dashboard
            </h2>
            <div>{loading ? <ChartLoading /> : error ? <div className="text-sm text-red-500">Error: {error}</div> : null}</div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8" aria-label="Service statistics">
            {[
              { title: 'Total Services', count: totalServices, icon: <FaTools size={18} />, desc: 'Total services available' },
              { title: 'Booked Services', count: bookedServices, icon: <FaBook size={18} />, desc: 'Total bookings' },
              { title: 'Pending Tasks', count: pendingTasks, icon: <FaClock size={18} />, desc: 'Pending bookings/tasks' },
            ].map(({ title, count, icon, desc }) => (
              <article
                key={title}
                className={`p-4 sm:p-6 ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-md shadow transition-shadow`}
                role="region"
                aria-labelledby={`${title.replace(/\s+/g, '-').toLowerCase()}-title`}
              >
                <div className="flex items-center justify-between">
                  <h3 id={`${title.replace(/\s+/g, '-').toLowerCase()}-title`} className={`${isDark ? 'text-gray-200' : 'text-gray-600'} text-sm sm:text-base font-semibold`}>
                    {title}
                  </h3>
                  <div className="h-7 w-7 flex items-center justify-center">{icon}</div>
                </div>

                <p className={`text-2xl sm:text-3xl font-bold mt-3 ${isDark ? 'text-white' : 'text-blue-500'}`}>{count}</p>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-400'} text-xs sm:text-sm mt-1`}>{desc}</p>
              </article>
            ))}
          </section>

          {/* Services overview bar chart */}
          <section className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow rounded-md p-4 sm:p-6 mb-8`} aria-label="Services overview chart">
            <div className="w-full h-56 md:h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 12, right: 16, left: 0, bottom: 12 }}>
                  <CartesianGrid stroke={isDark ? '#2b2b2b' : '#E6EEF9'} vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: isDark ? '#fff' : '#0B5FFF', fontSize: 12 }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={{ fill: isDark ? '#fff' : '#0B5FFF', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', borderRadius: 8 }} cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.06)' }} />
                  <Bar dataKey="value" fill={isDark ? '#FFFFFF' : '#111827'} radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Bookings analytics */}
          <section className="mb-10" aria-label="Bookings analytics">
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Bookings Analytics</h3>

            {bookingsLoading ? (
              <ChartLoading />
            ) : bookingsError ? (
              <div className="text-red-500" role="alert">{bookingsError}</div>
            ) : bookingsList.length === 0 ? (
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>No booking data found.</p>
            ) : (
              <div className="flex flex-col md:flex-row gap-6">
                {/* Area chart (left) */}
                <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow rounded-md p-4 flex-1`} style={{ minWidth: 280 }}>
                  <h4 className={`text-md sm:text-lg font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Bookings Over Time</h4>
                  <div className="w-full h-56 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={bookingsTimeSeries} margin={{ top: 6, right: 10, left: -10, bottom: 6 }}>
                        <defs>
                          <linearGradient id="monoGradBookings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.12} />
                            <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke={isDark ? '#2b2b2b' : '#f1f5f9'} vertical={false} />
                        <XAxis dataKey="date" tick={{ fill: isDark ? '#fff' : '#111827', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: isDark ? '#fff' : '#111827', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', borderRadius: 6 }} />
                        <Area type="monotone" dataKey="count" stroke={primaryColor} fill="url(#monoGradBookings)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-6 w-full md:w-[360px] lg:w-[420px]">
                  {/* Top services */}
                  <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow rounded-md p-4`} style={{ minHeight: 220 }}>
                    <h5 className={`text-md font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-blue-500'}`}>Top Services</h5>
                    {topServices.length === 0 ? (
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>No service data</p>
                    ) : (
                      <div className="w-full h-40 md:h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={topServices} layout="vertical" margin={{ top: 6, right: 8, left: -20, bottom: 6 }}>
                            <CartesianGrid stroke={isDark ? '#1f2937' : '#f8fafc'} vertical={false} horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" tick={{ fill: isDark ? '#fff' : '#111827', fontSize: 12 }} axisLine={false} tickLine={false} width={140} />
                            <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', borderRadius: 6 }} />
                            <Bar dataKey="count" fill={primaryColor} barSize={12} radius={[6, 6, 6, 6]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  {/* Status distribution pie */}
                  <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow rounded-md p-4`}>
                    <h5 className={`text-md font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Status Distribution</h5>
                    {statusDistribution.length === 0 ? (
                      <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>No status data</p>
                    ) : (
                      <div className="w-full h-36 md:h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusDistribution}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={56}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {statusDistribution.map((entry, i) => {
                                const color = monoPalette[i % monoPalette.length];
                                return <Cell key={`cell-${i}`} fill={color} stroke={isDark ? '#0b1220' : '#ffffff'} strokeWidth={1} />;
                              })}
                            </Pie>
                            <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', borderRadius: 6 }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
