import React from 'react';
import { Link } from 'react-router'; // ✅ FIXED
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Animation - 1748971877426.json';

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        // Replace this with actual authentication logic
        console.log('Submitted credentials:', { email, password });
    };

    const handleGoogleSignIn = () => {
        // Replace with actual Google auth logic
        console.log('Google Sign-In initiated');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white ">
                {/* Left: Animation */}
                <div className="md:w-1/2 flex items-center justify-center p-8">
                    <Lottie animationData={loginAnimation} loop={true} className="w-80 h-80" />
                </div>

                {/* Right: Login Form */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    {/* Logo and Heading */}
                    <div className="text-center mb-6">
                        <Link to="/">
                            <img
                                src="/e9322ee7-eb8b-4e67-8f61-37f0067e70a1.png"
                                alt="logo"
                                className="mx-auto h-16 w-auto"
                            />
                        </Link>
                        <h2 className="mt-4 text-3xl font-semibold">Sign In to Your Account</h2>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
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

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-base font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Enter your password"
                                className="mt-2 block w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>



                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                                <span className="text-sm">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-blue-500 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full flex justify-center text-lg bg-slate-900 font-medium text-white hover:rounded-full rounded-lg mx-2 px-7 py-3 transition hover:bg-slate-950">
                            Sign In
                        </button>
                    </form>

                    {/* Google Sign-In */}
                    <div className="mt-8">
                        <p className="text-center text-sm  text-gray-500">Or continue with</p>
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="mt-4 ml-2 w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md bg-white text-sm font-medium hover:bg-gray-50 transition">
                            <svg className="h-6 w-6 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.35 0 6.08 1.15 8.33 3.4l6.25-6.25C34.18 3.05 29.43 1 24 1 14.62 1 6.86 6.93 3.37 15.85l7.44 5.77C12.28 16.27 17.68 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.5 24c0-1.6-.15-3.13-.43-4.62H24v8.75h12.73c-.55 2.92-2.18 5.4-4.65 7.07l7.13 5.53C42.63 37.34 46.5 31.24 46.5 24z" />
                                <path fill="#FBBC05" d="M10.81 28.13A14.59 14.59 0 0110 24c0-1.13.2-2.22.56-3.25L3.12 14.98A23.997 23.997 0 001 24c0 3.88.93 7.55 2.56 10.86l7.25-6.73z" />
                                <path fill="#34A853" d="M24 46c5.43 0 10.18-1.8 14.01-4.86l-7.13-5.53A14.43 14.43 0 0124 36c-6.32 0-11.72-6.77-13.19-15.63l-7.44 5.77C6.86 41.07 14.62 47 24 47z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-sm text-gray-500">
                        Not a member yet?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
