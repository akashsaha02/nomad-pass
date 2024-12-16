import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './../Footer/Footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <Outlet />
            <Footer />
            <Toaster/>
        </div>
    )
}

export default Layout
