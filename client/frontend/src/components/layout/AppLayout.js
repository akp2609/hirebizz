import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import ChatBotWidget from './Bizzie.js'

const AppLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-1 shadow-inner pb-24">
                <Outlet />
            </div>
            <Footer />
            <ChatBotWidget/>
        </div>
    );
};

export default AppLayout;
