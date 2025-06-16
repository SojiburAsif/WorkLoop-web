import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';
import { FaReact, FaSearch } from 'react-icons/fa';

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const navLinkClass = ({ isActive }) =>
        `hover:text-blue-600 transition duration-200 ${isActive
            ? 'font-semibold text-blue-600'
            : theme === 'dark'
                ? 'text-white'
                : 'text-black'
        }`;

    const containerClass =
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    const dropdownBg =
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
    const hoverBg =
        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

    // const hero =(handelSearch)

    return (
        <div className={`shadow-sm ${containerClass}`}>
            <div className="navbar min-h-[80px] px-4">
                <div className="navbar-start flex items-center">

                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className={`btn btn-ghost ${hoverBg}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow ${dropdownBg}`}
                        >
                            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                            <li><NavLink to="/services" className={navLinkClass}>Services</NavLink></li>
                            {user && (
                                <li>
                                    <details>
                                        <summary className="cursor-pointer text-inherit">Dashboard</summary>
                                        <ul className="p-2 text-sm space-y-2">
                                            <li><NavLink to="/addtask" className={navLinkClass}>Add Service</NavLink></li>
                                            <li><NavLink to="/manage-service" className={navLinkClass}>Manage Service</NavLink></li>
                                            <li><NavLink to="/booked-services" className={navLinkClass}>Booked Services</NavLink></li>
                                            <li><NavLink to="/service-to-do" className={navLinkClass}>Service-To-Do</NavLink></li>
                                        </ul>
                                    </details>
                                </li>
                            )}
                        </ul>
                    </div>

                    <Link to="/">
                        {theme === 'dark' ? (
                            <img
                                className="w-48 h-auto object-contain"
                                src="/dark.png"
                                alt="Service Hub Dark Logo"
                            />
                        ) : (
                            <img
                                className="w-48 h-auto object-contain"
                                src="/ChatGPT Image Jun 8, 2025, 01_10_41 PM.png"
                                alt="Service Hub Light Logo"
                            />
                        )}
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg font-medium gap-2">
                        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/services" className={navLinkClass}>Services</NavLink></li>
                        {user && (
                            <li className="relative group">
                                <span className="cursor-pointer text-inherit">Dashboard</span>
                                <ul
                                    className={`absolute hidden group-hover:flex flex-col p-2 rounded shadow-lg mt-6 z-10 text-sm space-y-2 min-w-[180px] ${dropdownBg}`}
                                >
                                    <li><NavLink to="/addtask" className={navLinkClass}>Add Service</NavLink></li>
                                    <li><NavLink to="/manage-service" className={navLinkClass}>Manage Service</NavLink></li>
                                    <li><NavLink to="/booked-services" className={navLinkClass}>Booked Services</NavLink></li>
                                    <li><NavLink to="/service-to-do" className={navLinkClass}>Service-To-Do</NavLink></li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="navbar-end flex items-center gap-2">


                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition duration-300 ${hoverBg}`}
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 3v1m0 16v1m8.49-8.49h1M3 12h1m15.36 4.95l.7.71M6.34 6.34l.7.71m12.02 0l-.7.71M6.34 17.66l-.7.71M12 7a5 5 0 100 10 5 5 0 000-10z"
                                />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                            </svg>
                        )}
                    </button>

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="font-semibold hover:underline hover:text-blue-500"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="text-lg font-medium rounded-full mx-2 px-7 py-3 transition border bg-white dark:bg-black text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className=" avatar">
                                <div className="w-14 rounded-full border-2 border-blue-500">
                                    <img
                                        src={user.photoURL || 'https://i.ibb.co/S47T06r9/download-3.png'}
                                        alt="User Avatar"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className={`mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 ${dropdownBg}`}
                            >
                                <li>
                                    <button onClick={logout} className="btn btn-error w-full">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;