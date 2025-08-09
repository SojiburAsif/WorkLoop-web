import React from 'react';

const DashboardHome = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-500 text-white rounded-xl shadow">
                    <h2 className="text-xl font-semibold">Total Services</h2>
                    <p className="text-2xl mt-2">15</p>
                </div>
                <div className="p-6 bg-green-500 text-white rounded-xl shadow">
                    <h2 className="text-xl font-semibold">Booked Services</h2>
                    <p className="text-2xl mt-2">8</p>
                </div>
                <div className="p-6 bg-purple-500 text-white rounded-xl shadow">
                    <h2 className="text-xl font-semibold">Pending Tasks</h2>
                    <p className="text-2xl mt-2">4</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
