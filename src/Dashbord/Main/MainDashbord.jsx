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
  Sector,
} from 'recharts';
import Footer from '../../Fooder/Fooder';
import { AuthContext } from '../../Contexts/AuthContext';
import { ThemeContext } from '../../Them/ThemProvider';
import { FaBook, FaCheckCircle, FaClock, FaTools } from 'react-icons/fa';
import ChartLoading from '../../Loding/ChartLoading';

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

  // pie/donut active indexes + animation state
  const [activeBookingIndex, setActiveBookingIndex] = useState(null);
  const [activePriceIndex, setActivePriceIndex] = useState(null);
  const [animatedAvg, setAnimatedAvg] = useState(0);

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

        // If bookings endpoint returns 401, that will be thrown and caught below
        if (!sRes.ok) throw new Error(`Services fetch failed: ${sRes.status}`);
        if (!bRes.ok) throw new Error(`Bookings fetch failed: ${bRes.status}`);

        const servicesData = await sRes.json();
        const bookingsData = await bRes.json();

        if (!mounted) return;

        const servicesCount = Array.isArray(servicesData) ? servicesData.length : 0;
        const bookingsCount = Array.isArray(bookingsData) ? bookingsData.length : 0;

        // pending heuristic: check booking.status === 'pending'
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

  // Price range data (from exampleServiceData)
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

  // animate avg in center when avgPrice changes
  useEffect(() => {
    let raf = null;
    const from = animatedAvg;
    const to = avgPrice || 0;
    const duration = 600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const cur = Math.round(from + (to - from) * t);
      setAnimatedAvg(cur);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avgPrice]);

  // Active slice renderer for price donut (unique design)
  const renderActivePrice = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
  
      value,
    } = props;
    const RADIAN = Math.PI / 180;
    const sx = cx + (outerRadius + 8) * Math.cos(-midAngle * RADIAN);
    const sy = cy + (outerRadius + 8) * Math.sin(-midAngle * RADIAN);
    const mx = cx + (outerRadius + 18) * Math.cos(-midAngle * RADIAN);
    const my = cy + (outerRadius + 18) * Math.sin(-midAngle * RADIAN);
    const ex = mx + (midAngle < -90 || midAngle > 90 ? -28 : 28);
    const ey = my;
    const textAnchor = midAngle < -90 || midAngle > 90 ? 'end' : 'start';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 18}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.12}
        />
        <path d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} opacity={0.95} />
        <circle cx={ex} cy={ey} r={4} fill={fill} />
        <text x={ex + (textAnchor === 'end' ? -8 : 8)} y={ey - 6} textAnchor={textAnchor} fill={isDark ? '#fff' : '#111'} fontWeight="700">
          {payload.name}
        </text>
        <text x={ex + (textAnchor === 'end' ? -8 : 8)} y={ey + 12} textAnchor={textAnchor} fill={isDark ? '#cbd5e1' : '#4b5563'} fontSize={12}>
          {value} {exampleServiceData.currency}
        </text>
      </g>
    );
  };

  const userName = user?.displayName || user?.name || user?.email || 'User';
  const userPhoto = user?.photoURL || user?.photo || '/default-profile.png';

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-gray-50'} min-h-screen`}>
      {/* Navbar */}
      <header>
       
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
                   <ChartLoading></ChartLoading>
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

          {/* Two DIFFERENT charts side-by-side */}
          <div className="flex gap-6 mb-10 flex-wrap">
            {/* LEFT: Booked vs Pending — classic Pie with legend */}
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow p-6`} style={{ minWidth: 320, flexBasis: '50%' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Bookings Status</h3>

                {/* small controls: time-range (placeholder) + refresh */}
                <div className="flex items-center gap-2">
                  <select
                    className={`text-sm rounded-md px-2 py-1 border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}
                    onChange={() => { /* optional: hook up filter by time */ }}
                    defaultValue="all"
                    aria-label="Filter bookings"
                  >
                    <option value="all">All</option>
                    <option value="30">Last 30d</option>
                    <option value="7">Last 7d</option>
                  </select>

                  <button
                    className={`text-sm px-2 py-1 rounded-md ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-blue-50 border border-blue-100'}`}
                    onClick={() => { /* optional: refresh handler */ }}
                    title="Refresh"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {pieData.reduce((s, d) => s + d.value, 0) === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>No booking data</p>
                </div>
              ) : (
                <>
                  <div style={{ height: 260 }} className="relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={56}
                          outerRadius={90}
                          paddingAngle={6}
                          activeIndex={activeBookingIndex}
                          // keep default active shape (slightly expanded) for clarity
                          onMouseEnter={(data, index) => setActiveBookingIndex(index)}
                          onMouseLeave={() => setActiveBookingIndex(null)}
                          isAnimationActive={true}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              stroke={isDark ? '#0b1220' : '#fff'}
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [value, name]} contentStyle={{ background: isDark ? '#0f1724' : '#fff', borderRadius: 8 }} />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Center overlay with totals */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none" style={{ width: 160 }}>
                      <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{pieData.reduce((s, d) => s + d.value, 0)}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>total bookings</div>
                      {pieData.length >= 2 && pieData[0].value + pieData[1].value > 0 && (
                        <div className={`mt-1 text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          {Math.round((pieData[0].value / (pieData[0].value + pieData[1].value)) * 100) || 0}%
                          <span className="text-xs ml-1 text-gray-400">booked</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* compact legend / breakdown */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {pieData.map((d, i) => (
                        <div key={d.name} className="flex items-center gap-2">
                          <span style={{ width: 12, height: 12, background: COLORS[i % COLORS.length], borderRadius: 4 }} />
                          <div className="text-sm">
                            <div className={`${isDark ? 'text-gray-200' : 'text-gray-700'} font-medium`}>{d.name}</div>
                            <div className={`${isDark ? 'text-gray-300' : 'text-gray-500'} text-xs`}>{d.value} items</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className={`text-sm px-3 py-1 rounded-md ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-blue-50 border border-blue-100 text-blue-600'}`} onClick={() => { /* navigate to bookings page */ }}>
                      View details
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT: Price Range — UNIQUE DONUT with active slice rendering */}
            <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow p-6 relative flex flex-col items-center`} style={{ height: 360, flexBasis: '50%', minWidth: 320 }}>
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
                        paddingAngle={6}
                        startAngle={90}
                        endAngle={-270}
                        activeIndex={activePriceIndex}
                        activeShape={renderActivePrice}
                        onMouseEnter={(data, index) => setActivePriceIndex(index)}
                        onMouseLeave={() => setActivePriceIndex(null)}
                        isAnimationActive={true}
                      >
                        {priceChartData.map((entry, index) => (
                          <Cell key={`cell-price-${index}`} fill={COLORS[index % COLORS.length]} stroke={isDark ? '#0f172a' : '#fff'} strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: isDark ? '#1f2937' : '#fff', borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center overlay */}
                  <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', width: '100%' }}>
                    <div className={`${isDark ? 'text-white' : 'text-gray-900'} font-bold text-lg`}>{minPrice}-{maxPrice} {exampleServiceData.currency}</div>
                    <div className={`${isDark ? 'text-gray-300' : 'text-gray-500'} text-xs mt-1`}>Avg: {animatedAvg} {exampleServiceData.currency}</div>
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
        </main>
      </div>

      <Footer />
    </div>
  );
}
