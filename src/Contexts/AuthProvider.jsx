import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import Loding from '../Loding/Loding';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Create a new user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user with email and password
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google sign in
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Update user profile
    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    };

    // Logout user
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Observe auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleSignIn,
        updateUser,
        logout,
        setUser,
    };

    // Show loading spinner while checking auth
    if (loading) {
        return <Loding></Loding>
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
