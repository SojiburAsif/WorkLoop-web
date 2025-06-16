import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';
import Loading from '../Loding/Loding';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        return signOut(auth)
    }
    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    };


    const googleSingIn = () => {
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        const unsubscribr = onAuthStateChanged(auth, (currentuser,) => {
            setuser(currentuser)
            // SiAwselasticloadbalancing(false)
            setLoading(false)

            if (currentuser?.email) {
                const userData = { email: currentuser.email }
                axios.post('https://backend-zeta-ochre-92.vercel.app/jwt', userData,{
                    withCredentials: true
                })
                    .then(res => {
                        // const token = res.data.token
                        // localStorage.setItem('token', token);
                        console.log('Token saved re' , res.data);
                    })
                    .catch(err => console.log(err));
            }

        });
        return () => {
            unsubscribr();
        }



    });



    const userInfo = {
        user,
        createUser,
        loginUser,
        logout,
        googleSingIn,
        updateUser,
        setuser,
        loading,
    };
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
