import React, {  useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';
import Loding from '../Loding/Loding';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    console.log(user,);

    if (loading) {
        return <Loding></Loding>
    }

    if (user && user?.email) {
        return children
    }
    return <Navigate to={'/login'}></Navigate>
};

export default PrivateRouter;