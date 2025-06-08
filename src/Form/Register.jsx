import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';

import registerAnimation from '../assets/Animation - 1748973418078.json';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';

const Register = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const { createUser, updateUser, setuser, googleSingIn } = useContext(AuthContext);

    const location = useLocation();
    const form = location.state || '/';

    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const photo = e.target.photoURL.value;
        const agree = e.target.privacy.checked;

        if (!agree) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'You must agree to the privacy policy.',
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'Passwords do not match!',
            });
            return;
        }

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setuser({
                            ...user,
                            displayName: name,
                            photoURL: photo,
                        });
                        navigate(form);
                    })
                    .catch((error) => {
                        console.log(error);
                        setuser(user);
                    });

                Swal.fire({
                    icon: 'success',
                    title: 'Account created successfully!',
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                });
            });
    };

    const handleGoogleSignIn = () => {
        googleSingIn()
            .then((result) => {
                const user = result.user;
                setuser(user);
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in successfully via Google!',
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate(form);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign-In Failed',
                    text: error.message,
                });
            });
    };

    return (
        <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'} min-h-screen flex items-center justify-center`}>
            <div
                className={`w-full max-w-4xl flex flex-col md:flex-row
                ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
            >
                <div className="md:w-1/2 flex items-center justify-center p-8">
                    <Lottie animationData={registerAnimation} loop={true} className="w-80 h-80" />
                </div>

                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        {/* Logo swap */}
                        <Link to="/" className="inline-block">
                            {theme === 'dark' ? (
                                <img
                                    className="w-48 h-auto object-contain"
                                    src="/dark.png"
                                    alt="Service Hub Dark Logo"
                                    style={{ backgroundColor: 'transparent' }}
                                />
                            ) : (
                                <img
                                    className="w-48 h-auto object-contain"
                                    src="/ChatGPT Image Jun 8, 2025, 01_10_41 PM.png"
                                    alt="Service Hub Light Logo"
                                    style={{ backgroundColor: 'transparent' }}
                                />
                            )}
                        </Link>
                        <h2 className="mt-4 text-3xl font-semibold">Create Your Account</h2>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
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
                                className={`mt-2 block w-full px-6 py-3 border rounded-md focus:outline-none 
                                ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    }`}
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
                                className={`mt-2 block w-full px-6 py-3 border rounded-md focus:outline-none
                                ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    }`}
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
                                className={`mt-2 block w-full px-6 py-3 border rounded-md focus:outline-none
                                ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    }`}
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
                                className={`mt-2 block w-full px-6 py-3 border rounded-md focus:outline-none
                                ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    }`}
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
                                className={`mt-2 block w-full px-6 py-3 border rounded-md focus:outline-none
                                ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400'
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    }`}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="privacy"
                                name="privacy"
                                className={`h-5 w-5 border-gray-300
                                ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}`}
                            />
                            <label
                                htmlFor="privacy"
                                className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                    }`}
                            >
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

                    <div className="mt-4">
                        <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Or continue with
                        </p>
                        <button
                            className={`w-full mt-3 ml-2 flex justify-center text-lg bg-white border border-gray-300 rounded-lg py-3 hover:bg-gray-100 transition
                            ${theme === 'dark' ? 'text-gray-700 bg-gray-700 border-gray-600 hover:bg-gray-600' : 'text-gray-700'}`}
                            onClick={() => handleGoogleSignIn()}
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-6 h-6 mr-3"
                            />
                            Continue with Google
                        </button>
                    </div>

                    <p
                        className={`mt-8 text-center text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                    >
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-blue-500 font-semibold hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
