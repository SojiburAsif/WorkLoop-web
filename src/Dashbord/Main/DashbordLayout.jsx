import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { ThemeContext } from '../../Them/ThemProvider';
import DashboardHome from './MainDashbord';
import { FaHome, FaPlusCircle, FaTasks, FaClipboardList, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';

const DashbordLayout = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change (mobile)
  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  const sidebarBg = theme === 'dark' ? 'bg-black text-gray-300' : 'bg-white text-gray-900';
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
      isActive
        ? 'text-blue-500 font-semibold'
        : theme === 'dark'
        ? 'text-gray-400 hover:text-blue-400'
        : 'text-gray-700 hover:text-blue-500'
    }`;
  const iconClass = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      {/* Top bar for mobile: hamburger + optional breadcrumb/title */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: theme === 'dark' ? '#1f2937' : '#e5e7eb' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FaBars className={`${theme === 'dark' ? 'text-white' : 'text-black'}`} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src="/ChatGPT Image Aug 10, 2025, 04_19_00 AM.png" alt="Logo" className="h-8 w-auto" />
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Dashboard</span>
          </Link>
        </div>
        {/* optional right area ) can go here */}
      </header>

      <div className="flex">
        {/* Desktop sidebar (visible from md) */}
        <aside
          className={`hidden md:block w-64 p-6 h-screen sticky top-0 overflow-y-auto shadow-lg ${sidebarBg}`}
          aria-label="Sidebar"
        >
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/ChatGPT Image Aug 10, 2025, 04_19_00 AM.png" alt="Logo" className="h-10 w-auto" />
            
            </Link>
          </div>

          <nav>
            <h2 className="text-gray-400 uppercase text-xs font-semibold mb-2 tracking-wider">Main Menu</h2>
            <ul className="space-y-2">
              <li>
                <NavLink to="/dashboard" end className={navLinkClass}>
                  <FaHome className={iconClass} /> <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="addtask" className={navLinkClass}>
                  <FaPlusCircle className={iconClass} /> <span>Add Service</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="manage-service" className={navLinkClass}>
                  <FaTasks className={iconClass} /> <span>Manage Service</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="service-to-do" className={navLinkClass}>
                  <FaCheckCircle className={iconClass} /> <span>Service-To-Do</span>
                </NavLink>
              </li>
            </ul>

            <hr className={`my-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} />

            <h2 className="text-gray-400 uppercase text-xs font-semibold mb-2 tracking-wider">Bookings</h2>
            <ul className="space-y-2">
              <li>
                <NavLink to="booked-services" className={navLinkClass}>
                  <FaClipboardList className={iconClass} /> <span>My Booked Services</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Mobile drawer (small screens) */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            <div className={`absolute inset-y-0 left-0 w-64 p-6 overflow-y-auto ${sidebarBg} transform transition-transform duration-300`}>
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center gap-3" onClick={() => setDrawerOpen(false)}>
                  <img src="/ChatGPT Image Aug 10, 2025, 04_19_00 AM.png" alt="Logo" className="h-8 w-auto" />
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Service Hub</span>
                </Link>

                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <FaTimes className={`${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                </button>
              </div>

              <nav>
                <h2 className="text-gray-400 uppercase text-xs font-semibold mb-2 tracking-wider">Main Menu</h2>
                <ul className="space-y-2">
                  <li>
                    <NavLink to="/dashboard" end className={navLinkClass}>
                      <FaHome className={iconClass} /> <span>Home</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="addtask" className={navLinkClass}>
                      <FaPlusCircle className={iconClass} /> <span>Add Service</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="manage-service" className={navLinkClass}>
                      <FaTasks className={iconClass} /> <span>Manage Service</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="service-to-do" className={navLinkClass}>
                      <FaCheckCircle className={iconClass} /> <span>Service-To-Do</span>
                    </NavLink>
                  </li>
                </ul>

                <hr className={`my-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} />

                <h2 className="text-gray-400 uppercase text-xs font-semibold mb-2 tracking-wider">Bookings</h2>
                <ul className="space-y-2">
                  <li>
                    <NavLink to="booked-services" className={navLinkClass}>
                      <FaClipboardList className={iconClass} /> <span>My Booked Services</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1">
          <div className="">
            {location.pathname.toLowerCase() === '/dashboard' ? <DashboardHome /> : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashbordLayout;
