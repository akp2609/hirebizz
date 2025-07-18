import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-white">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
