import React from 'react';
import { Link } from 'react-router'; // ✅ FIXED
import Lottie from 'lottie-react';

import registerAnimation from '../assets/Animation - 1748973418078.json';

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const photoURL = e.target.photoURL.value;
        const agree = e.target.privacy.checked;

        if (!agree) {
            alert("You must agree to the privacy policy.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log('User info:', { name, email, password, photoURL });
        // You can now send this to Firebase or your server
    };

   

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg">
                {/* Left: Lottie */}
                <div className="md:w-1/2 flex items-center justify-center p-8">
                    <Lottie animationData={registerAnimation} loop={true} className="w-80 h-80" />
                </div>

                {/* Right: Form */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <Link to="/">
                            <img
                                src="/e9322ee7-eb8b-4e67-8f61-37f0067e70a1.png"
                                alt="logo"
                                className="mx-auto h-16 w-auto"
                            />
                        </Link>
                        <h2 className="mt-4 text-3xl font-semibold">Create Your Account</h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {/* Name, Photo, Email, Password */}
                        <div>
                            <label htmlFor="name" className="block text-base font-medium">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Enter your full name"
                                className="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="photoURL" className="block text-base font-medium">
                                Photo URL
                            </label>
                            <input
                                id="photoURL"
                                name="photoURL"
                                type="url"
                                placeholder="Enter your photo URL"
                                className="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-base font-medium">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-base font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Create a password"
                                className="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-base font-medium">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="Re-enter your password"
                                className="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Privacy Policy */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="privacy"
                                name="privacy"
                                className="h-5 w-5 border-gray-300"
                            />
                            <label htmlFor="privacy" className="text-sm text-gray-600">
                                I agree to the{' '}
                                <Link to={'/privacy'} className="text-blue-500 hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center text-lg bg-slate-900 font-medium text-white hover:rounded-full rounded-lg mx-2 px-7 py-3 transition hover:bg-slate-950 hover:text-white"
                        >
                            Register
                        </button>
                    </form>

                    {/* Google Sign-In Button */}
                    <div className="mt-4">
                            <p className="text-center text-sm  text-gray-500">Or continue with</p>
                        <button
                         
                            className="w-full mt-3 ml-2 flex justify-center text-lg bg-white border border-gray-300 text-gray-700 rounded-lg py-3 hover:bg-gray-100 transition"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 mr-3" />
                            Continue with Google
                        </button>
                    </div>

                    <p className="mt-8 text-center text-base text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
