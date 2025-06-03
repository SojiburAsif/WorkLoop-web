import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router';
import Fooder from '../Fooder/Fooder';

const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Fooder></Fooder>
        </div>
    );
};

export default Root;