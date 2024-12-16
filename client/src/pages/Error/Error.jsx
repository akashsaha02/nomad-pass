import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#bae6fd] via-[#60a5fa] to-[#0369a1]">
            <Helmet>
                <title>Nomad Pass| 404 Not Found</title>
            </Helmet>
            <div className="text-center px-6 md:px-20">
                <h1 className="text-9xl font-bold text-[#0284c7]">404</h1>
                <p className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">
                    Oops! Page not found.
                </p>
                <p className="mt-2 text-gray-600">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <Link to="/" className="mt-6 inline-block px-8 py-3 bg-[#0284c7] text-white text-lg font-medium rounded-full hover:bg-[#2563eb]">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
