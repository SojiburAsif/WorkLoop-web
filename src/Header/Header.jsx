import React from 'react';
import { Link, NavLink } from 'react-router';

const Header = () => {

    const user = {
        name: 'John Doe',
        photoURL: 'https://i.pravatar.cc/40'
    };

    const navLinkClass = ({ isActive }) =>
        `hover:underline hover:text-blue-600 transition duration-200 ${isActive ? 'text-blue-700 font-semibold' : ''}`;

    return (
        <div className="shadow-sm">
            <div className="navbar bg-slate-100 min-h-[80px] px-4">
                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                            <li><NavLink to="/services" className={navLinkClass}>Services</NavLink></li>
                            {user && (
                                <li>
                                    <details>
                                        <summary>Dashboard</summary>
                                        <ul className="p-2 text-sm space-y-2">
                                            <li><NavLink to="/add-service" className={navLinkClass}>Add Service</NavLink></li>
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
                        <img
                            className="w-28 h-auto object-contain"
                            src="/e9322ee7-eb8b-4e67-8f61-37f0067e70a1.png"
                            alt="Workloop Logo"
                        />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg font-medium gap-2">
                        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/services" className={navLinkClass}>Services</NavLink></li>
                        {user && (
                            <li className="relative group">
                                <span className="cursor-pointer">Dashboard</span>
                                <ul className="absolute hidden group-hover:flex flex-col p-2 bg-white text-black rounded shadow-lg mt-6 z-10 text-sm space-y-2 min-w-[180px]">
                                    <li><NavLink to="/add-service" className={navLinkClass}>Add Service</NavLink></li>
                                    <li><NavLink to="/manage-service" className={navLinkClass}>Manage Service</NavLink></li>
                                    <li><NavLink to="/booked-services" className={navLinkClass}>Booked Services</NavLink></li>
                                    <li><NavLink to="/service-to-do" className={navLinkClass}>Service-To-Do</NavLink></li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-2">
                    <label className="swap swap-rotate">
                        <input type="checkbox" />

                        {/* sun icon */}
                        <svg
                            className="swap-on h-7 w-7 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-off h-7 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {/* 👇 Show Login & Register when NOT logged in */}
                    {user && (
                        <>
                            <Link to="/login" className="text-lg font-medium mx-2 hover:underline hover:text-blue-900">Login</Link>
                            <Link
                                to="/register"
                                className="text-lg bg-white font-medium text-black rounded-full mx-2 px-7 py-3 transition hover:bg-black hover:text-white"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {!user && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL} alt="User Avatar" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="btn btn-error w-full">Logout</button>
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
