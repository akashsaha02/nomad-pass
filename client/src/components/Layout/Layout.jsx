import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './../Footer/Footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <div className='min-h-screen grid grid-rows-[auto_1fr_auto]'>
            <Navbar />
            <Outlet />
            <Toaster />
            <Footer />
        </div>
    )
}

export default Layout
