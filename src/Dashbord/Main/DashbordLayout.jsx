import React, { useContext } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router';
import { ThemeContext } from '../../Them/ThemProvider';
import DashboardHome from './MainDashbord';
import { FaReact, FaHome, FaPlusCircle, FaTasks, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

const DashbordLayout = () => {
    const { theme } = useContext(ThemeContext);
    const location = useLocation();

    const dropdownBg = theme === 'dark' ? 'bg-black text-white' : 'bg-blue-600 text-white';

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-md transition text-white ${
            isActive
                ? 'underline decoration-blue-400 decoration-[1px] underline-offset-4'
                : 'hover:underline hover:decoration-blue-400 decoration-[1px] underline-offset-4'
        }`;

    const iconClass = "text-blue-400"; // Blue color for icons

    return (
        <div className="drawer lg:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main content */}
            <div className="drawer-content flex flex-col p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">
                    Open Menu
                </label>

                {location.pathname.toLowerCase() === '/dashboard' ? <DashboardHome /> : <Outlet />}
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className={`menu min-h-full w-80 p-6 space-y-6 ${dropdownBg} shadow-lg`}>
                    {/* Logo Section */}
                    <li className="flex items-center space-x-4 mb-8 cursor-default select-none">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src="../../../public/ChatGPT Image Aug 10, 2025, 04_19_00 AM.png"
                                alt="Logo"
                                className=""
                            />
                        </Link>
                     
                    </li>

                    {/* Navigation Links with icons */}
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
                        <NavLink to="booked-services" className={navLinkClass}>
                            <FaClipboardList className={iconClass} /> Booked Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="service-to-do" className={navLinkClass}>
                            <FaCheckCircle className={iconClass} /> Service-To-Do
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashbordLayout;
