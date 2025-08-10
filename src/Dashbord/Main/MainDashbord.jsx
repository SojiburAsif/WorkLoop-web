import React, { useContext, useEffect, useState } from 'react';
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
  Legend,
} from 'recharts';
import Footer from '../../Fooder/Fooder';
import { AuthContext } from '../../Contexts/AuthContext';
import { ThemeContext } from '../../Them/ThemProvider';
import { FaBook, FaCheckCircle, FaClock, FaTools } from 'react-icons/fa';

const SERVICES_URL = 'https://services-server.vercel.app/working';
const BOOKINGS_URL = 'https://services-server.vercel.app/bookings';

const getToken = () =>
  localStorage.getItem('token') ||
  localStorage.getItem('access_token') ||
  localStorage.getItem('app_token') ||
  sessionStorage.getItem('token') ||
  '';

/** Example service object (replace with real selected service if you have one) */
const exampleServiceData = {
  _id: '684e921606e0dde260add4d3',
  title: 'Quick Plumbing Fix',
  priceRange: ['23', '50'],
  currency: 'BDT',
  providerName: 'MD Asif',
  providerEmail: 'asif81534@gmail.com',
  providerImage:
    'https://lh3.googleusercontent.com/a/ACg8ocJoxMnAOtQ13l8_-5CeOtCpysEfrH9qVaHw078sYHbN_9VmJQdn=s96-c',
};

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [totalServices, setTotalServices] = useState(0);
  const [bookedServices, setBookedServices] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // fallback sample (used only if fetch fails)
  const fallback = { totalServices: 15, bookedServices: 8, pendingTasks: 4 };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    async function fetchData() {
      try {
        const [sRes, bRes] = await Promise.all([
          fetch(SERVICES_URL, { headers }),
          fetch(BOOKINGS_URL, { headers }),
        ]);

        if (!sRes.ok) throw new Error(`Services fetch failed: ${sRes.status}`);
        if (!bRes.ok) throw new Error(`Bookings fetch failed: ${bRes.status}`);

        const servicesData = await sRes.json();
        const bookingsData = await bRes.json();

        if (!mounted) return;

        const servicesCount = Array.isArray(servicesData) ? servicesData.length : 0;
        const bookingsCount = Array.isArray(bookingsData) ? bookingsData.length : 0;

        // pending heuristic
        let pendingCount = 0;
        if (Array.isArray(bookingsData)) {
          pendingCount = bookingsData.reduce((acc, b) => {
            const s = (b?.status || '').toLowerCase();
            return acc + (s === 'pending' ? 1 : 0);
          }, 0);
        }
        if (pendingCount === 0 && Array.isArray(servicesData)) {
          pendingCount = servicesData.reduce((acc, s) => {
            const st = (s?.status || '').toLowerCase();
            return acc + (st === 'pending' ? 1 : 0);
          }, 0);
        }

        setTotalServices(servicesCount || fallback.totalServices);
        setBookedServices(bookingsCount || fallback.bookedServices);
        setPendingTasks(pendingCount || fallback.pendingTasks);
      } catch (err) {
        if (!mounted) return;
        console.error('Dashboard data fetch error:', err);
        setError(err.message || 'Failed to load data');
        setTotalServices(fallback.totalServices);
        setBookedServices(fallback.bookedServices);
        setPendingTasks(fallback.pendingTasks);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const chartData = [
    { name: 'Total Services', value: totalServices },
    { name: 'Booked', value: bookedServices },
    { name: 'Pending', value: pendingTasks },
  ];

  // Price range data
  const priceRangeValues = (exampleServiceData.priceRange || []).map((p) => Number(p) || 0);
  const minPrice = priceRangeValues[0] ?? 0;
  const maxPrice = priceRangeValues[1] ?? 0;
  const avgPrice =
    priceRangeValues.length ? Math.round(priceRangeValues.reduce((a, b) => a + b, 0) / priceRangeValues.length) : 0;

  const priceChartData = [
    { name: 'Min', value: minPrice },
    { name: 'Max', value: maxPrice },
  ];

  const COLORS = ['#2563EB', '#06B6D4']; // blue + cyan

  // bookings pie
  const pieData = [
    { name: 'Booked', value: bookedServices || 0 },
    { name: 'Pending', value: pendingTasks || 0 },
  ];

  const userName = user?.displayName || user?.name || user?.email || 'User';
  const userPhoto = user?.photoURL || user?.photo || '/default-profile.png';

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-gray-50'} min-h-screen`}>
      {/* Navbar */}
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className={`text-xl font-bold text-center ${isDark ? 'text-white' : 'text-blue-700'}`}>My Application</h1>
        </div>
      </header>

      <div className="flex justify-center px-4">
        <main className="flex-1 p-6 sm:p-8 max-w-8xl md:px-15 mx-auto">
          {/* User Info */}
          {user && (
            <div
              className={`flex items-center gap-4 mb-8 p-4 max-w-sm ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
            >
              <img src={userPhoto} alt={userName} className="w-16 h-16 rounded-full object-cover border border-gray-300" />
              <div>
                <p className="text-xl font-semibold flex items-center gap-2">
                  {userName}
                  {user?.emailVerified && <FaCheckCircle className="text-blue-500" title="Verified" />}
                </p>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>{user?.email}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-blue-700'}`}>Welcome to Your Dashboard</h2>
            {loading ? (
              <div className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Loading...</div>
            ) : error ? (
              <div className="text-sm text-red-500">Error: {error}</div>
            ) : null}
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 shadow flex flex-col transition-shadow duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`${isDark ? 'text-gray-200' : 'text-gray-600'} text-base font-semibold`}>Total Services</h3>
                <div className={`h-8 w-8 flex items-center justify-center ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                  <FaTools size={20} />
                </div>
              </div>
              <p className={`text-4xl font-bold mt-4 ${isDark ? 'text-white' : 'text-blue-700'}`}>{totalServices}</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-400'} text-sm mt-2`}>Total services available</p>
            </div>

            <div className={`p-6 shadow flex flex-col transition-shadow duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`${isDark ? 'text-gray-200' : 'text-gray-600'} text-base font-semibold`}>Booked Services</h3>
                <div className={`h-8 w-8 flex items-center justify-center ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                  <FaBook size={20} />
                </div>
              </div>
              <p className={`text-4xl font-bold mt-4 ${isDark ? 'text-white' : 'text-blue-700'}`}>{bookedServices}</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-400'} text-sm mt-2`}>Total bookings</p>
            </div>

            <div className={`p-6 shadow flex flex-col transition-shadow duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`${isDark ? 'text-gray-200' : 'text-gray-600'} text-base font-semibold`}>Pending Tasks</h3>
                <div className={`h-8 w-8 flex items-center justify-center ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                  <FaClock size={20} />
                </div>
              </div>
              <p className={`text-4xl font-bold mt-4 ${isDark ? 'text-white' : 'text-blue-700'}`}>{pendingTasks}</p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-400'} text-sm mt-2`}>Pending bookings/tasks</p>
            </div>
          </div>

          {/* Two DIFFERENT charts side-by-side (responsive) */}
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {/* LEFT: Booked vs Pending — classic Pie with legend */}
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow p-6 w-full md:w-1/2`} style={{ minWidth: 320 }}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Bookings Status</h3>

              {pieData.reduce((s, d) => s + d.value, 0) === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>No booking data</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', borderRadius: 8 }} />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: isDark ? '#fff' : '#000' }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* RIGHT: Price Range — DONUT with center overlay (different design) */}
            <div
              className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow p-6 relative flex flex-col items-center w-full md:w-1/2`}
              style={{ minWidth: 320 }}
            >
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Price Range (Donut)</h3>

              <div className="w-full flex items-center justify-center" style={{ height: 260 }}>
                <div style={{ width: 240, height: 240, position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priceChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={4}
                        startAngle={90}
                        endAngle={-270}
                        labelLine={false}
                        isAnimationActive={false}
                      >
                        {priceChartData.map((entry, index) => (
                          <Cell
                            key={`cell-price-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke={isDark ? '#0f172a' : '#fff'}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      pointerEvents: 'none',
                      width: '100%',
                    }}
                  >
                    <div className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold text-lg`}>
                      {minPrice}-{maxPrice} {exampleServiceData.currency}
                    </div>
                    <div className={`${isDark ? 'text-gray-300' : 'text-gray-500'} text-xs mt-1`}>
                      Avg: {avgPrice} {exampleServiceData.currency}
                    </div>
                  </div>
                </div>
              </div>

              {/* small legend / provider info under donut */}
              <div className={`mt-4 w-full flex items-center justify-between ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-3">
                  <div style={{ width: 12, height: 12, background: COLORS[0], borderRadius: 3 }} />
                  <span className="text-sm">Min</span>
                </div>
                <div className="flex items-center gap-3">
                  <div style={{ width: 12, height: 12, background: COLORS[1], borderRadius: 3 }} />
                  <span className="text-sm">Max</span>
                </div>
                <div className="text-sm opacity-80">{exampleServiceData.providerName}</div>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow p-6 mb-10`} style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid stroke={isDark ? '#2b2b2b' : '#E6EEF9'} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: isDark ? '#fff' : '#0B5FFF', fontSize: 13 }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tick={{ fill: isDark ? '#fff' : '#0B5FFF', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', borderRadius: 8 }} cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(37,99,235,0.08)' }} />
                <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
