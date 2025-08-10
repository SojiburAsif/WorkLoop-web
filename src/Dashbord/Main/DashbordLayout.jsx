import React, { useContext } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router';
import { ThemeContext } from '../../Them/ThemProvider';
import DashboardHome from './MainDashbord';
import { FaHome, FaPlusCircle, FaTasks, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

const DashbordLayout = () => {
    const { theme } = useContext(ThemeContext);
    const location = useLocation();

    // ডাইনামিক ব্যাকগ্রাউন্ড ও টেক্সট কালার theme অনুযায়ী
    const sidebarBg = theme === 'dark' ? 'bg-black text-gray-300' : 'bg-white text-gray-900';

    // NavLink ক্লাস
    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
            isActive
                ? 'text-blue-500 font-semibold'
                : theme === 'dark'
                ? 'text-gray-400 hover:text-blue-400'
                : 'text-gray-700 hover:text-blue-500'
        }`;

    // আইকনের জন্য কালার
    const iconClass = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex min-h-screen`}>
            {/* Sidebar */}
            <aside
                className={`w-[16%] p-6 space-y-6 shadow-lg ${sidebarBg}`}
                style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}
            >
                {/* Logo */}
                <div className="flex items-center space-x-4 mb-8 cursor-default select-none">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/ChatGPT Image Aug 10, 2025, 04_19_00 AM.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <nav>
                    <h2 className="text-gray-400 uppercase text-xs font-semibold mb-2 tracking-wider">Main Menu</h2>
                    <ul className="space-y-2">
                        <li>
                            <NavLink to="/dashboard" end className={navLinkClass}>
                                <FaHome className={iconClass} /> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="addtask" className={navLinkClass}>
                                <FaPlusCircle className={iconClass} /> Add Service
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="manage-service" className={navLinkClass}>
                                <FaTasks className={iconClass} /> Manage Service
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="service-to-do" className={navLinkClass}>
                                <FaCheckCircle className={iconClass} /> Service-To-Do
                            </NavLink>
                        </li>
                    </ul>

                    <hr className={`my-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`} />

                    <h2 className="text-gray-400 uppercase text-xs font-semibold mb-2 tracking-wider">Bookings</h2>
                    <ul className="space-y-2">
                        <li>
                            <NavLink to="booked-services" className={navLinkClass}>
                                <FaClipboardList className={iconClass} /> My Booked Services
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1">
                {location.pathname.toLowerCase() === '/dashboard' ? <DashboardHome /> : <Outlet />}
            </main>
        </div>
    );
};

export default DashbordLayout;
