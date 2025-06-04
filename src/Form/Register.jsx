import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';

import registerAnimation from '../assets/Animation - 1748973418078.json';
import { AuthContext } from '../Contexts/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUser, setuser, googleSingIn } = useContext(AuthContext);

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
                        navigate('/');
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
                navigate('/');
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
        <div className="min-h-screen flex items-center justify-center space-grotesk  bg-white">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white">
                <div className="md:w-1/2 flex items-center justify-center p-8">
                    <Lottie animationData={registerAnimation} loop={true} className="w-80 h-80" />
                </div>

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

                    <div className="mt-4">
                        <p className="text-center text-sm text-gray-500">Or continue with</p>
                        <button
                            className="w-full mt-3 ml-2 flex justify-center text-lg bg-white border border-gray-300 text-gray-700 rounded-lg py-3 hover:bg-gray-100 transition"
                            onClick={()=>handleGoogleSignIn()}
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-6 h-6 mr-3"
                            />
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
