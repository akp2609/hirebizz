import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-1 shadow-inner">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AppLayout;
