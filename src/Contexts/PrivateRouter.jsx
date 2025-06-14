import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loding from '../Loding/Loding';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    // console.log(location);
    // console.log(user,);

    if (loading) {
        return <Loding></Loding>
    }

    if (user && user?.email) {
        return children
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>
};

export default PrivateRouter;