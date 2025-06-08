import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import loginAnimation from '../assets/Animation - 1748971877426.json';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';

const Login = () => {
    const { loginUser, googleSingIn } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const containerClass = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    const inputBg = theme === 'dark' ? 'bg-neutral-800 text-white' : 'bg-white text-black';
    const logoSrc = theme === 'dark'
        ? '/dark.png'
        : '/ChatGPT Image Jun 8, 2025, 01_10_41 PM.png';

    const handleSubmit = e => {
        e.preventDefault();
        if (!rememberMe) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops…',
                text: 'You must check "Remember me" to continue.',
            });
        }
        const { email, password } = e.target;
        loginUser(email.value, password.value)
            .then(() => {
                Swal.fire('Login Successful', `Welcome back, ${email.value}!`, 'success');
                setError('');
                navigate('/');
            })
            .catch(err => {
                Swal.fire('Login Failed', err.message, 'error');
                setError(err.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSingIn()
            .then(() => {
                Swal.fire('Signed in successfully!', 'Welcome to the app.', 'success');
                navigate('/');
            })
            .catch(() => {
                Swal.fire('Oops…', 'Google sign-in failed!', 'error');
            });
    };

    return (
        <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${containerClass}`}>
            {/* CSS Shape - a translucent circle at top-right */}
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-300 opacity-20 dark:bg-blue-700"></div>

            <div className="w-full max-w-4xl flex flex-col md:flex-row z-10">
                {/* Left Animation */}
                <div className="md:w-1/2 flex items-center justify-center p-8">
                    <div className="w-80 h-80 rounded-xl overflow-hidden bg-white dark:bg-neutral-900">
                        <Lottie animationData={loginAnimation} loop />
                    </div>
                </div>

                {/* Right Form */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <Link to="/" className="inline-block">
                            <img
                                className="w-48 h-auto object-contain"
                                src={logoSrc}
                                alt={`Service Hub ${theme === 'dark' ? 'Dark' : 'Light'} Logo`}
                            />
                        </Link>
                        <h2 className="mt-4 text-3xl font-semibold">Sign In to Your Account</h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-base font-medium">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                className={`mt-2 block w-full px-6 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${inputBg}`}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-base font-medium">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Enter your password"
                                className={`mt-2 block w-full px-6 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${inputBg}`}
                            />
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded border-gray-300"
                                    checked={rememberMe}
                                    onChange={e => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                        </div>

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full flex justify-center text-lg bg-slate-900 text-white rounded-lg px-7 py-3 transition hover:rounded-full hover:bg-slate-950"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Google Sign-In */}
                    <div className="mt-8">
                        <p className="text-center text-sm text-gray-500">Or continue with</p>
                        <button
                            onClick={handleGoogleSignIn}
                            className="mt-4 w-full flex items-center justify-center px-6 py-3 border rounded-md bg-white text-sm font-medium text-black"
                        >
                            {/* Google SVG icon - keep original colors */}
                            <svg
                                className="h-6 w-6 mr-2"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                            >
                                {/* The original Google multi-color logo paths */}
                                <path fill="#4285F4" d="M24 9.5c3.54 0 6.31 1.52 7.76 2.8l5.68-5.68C32.27 4.63 28.36 3 24 3 14.73 3 7.13 9.4 4.93 17.72l6.58 5.12C12.85 16.5 17.84 9.5 24 9.5z" />
                                <path fill="#34A853" d="M46.5 24c0-1.6-.15-2.9-.43-4.18H24v7.91h12.64c-.54 3.02-2.3 5.59-4.9 7.27l7.51 5.81c4.36-4.03 6.75-9.92 6.75-16.81z" />
                                <path fill="#FBBC05" d="M11.5 28.84c-.41-1.25-.64-2.58-.64-3.96 0-1.38.23-2.7.64-3.95L4.93 17.72C3.53 20.34 2.73 23.1 2.73 26c0 2.9.8 5.66 2.2 8.28l6.57-5.12z" />
                                <path fill="#EA4335" d="M24 46.5c6.15 0 11.33-2.04 15.12-5.54l-7.51-5.81c-2.05 1.38-4.7 2.2-7.61 2.2-6.17 0-11.36-4.16-13.23-9.76l-6.58 5.12C7.05 42.1 14.72 46.5 24 46.5z" />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>


                    <p className="mt-8 text-center text-gray-500">
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
