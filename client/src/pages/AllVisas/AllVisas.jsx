import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllVisas = () => {
    const [visas, setVisas] = useState([]);
    const [visaTypeFilter, setVisaTypeFilter] = useState('');

    useEffect(() => {
        fetchVisas();
    }, [visaTypeFilter]);

    const fetchVisas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/visas')
            if (visaTypeFilter) {
                setVisas(response.data.filter((visa) => visa.visaType === visaTypeFilter));
                return;
            }
            setVisas(response.data);
        } catch (error) {
            console.error('Failed to fetch visas:', error);
        }
    };

    console.log(visas)

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">All Visas</h2>

            {/* Filter Section */}
            <div className="mb-8 flex justify-center">
                <div className="flex items-center space-x-4">
                    <label htmlFor="visaTypeFilter" className="text-lg text-gray-700 font-medium">
                        Filter by Visa Type:
                    </label>
                    <select
                        id="visaTypeFilter"
                        value={visaTypeFilter}
                        onChange={(e) => setVisaTypeFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">All</option>
                        <option value="Tourist Visa">Tourist Visa</option>
                        <option value="Student Visa">Student Visa</option>
                        <option value="Official Visa">Official Visa</option>
                    </select>
                </div>
            </div>

            {/* Visa Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visas.map((visa) => (
                    <div
                        key={visa._id}
                        className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={visa.countryImage}
                            alt={visa.countryName}
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800">{visa.countryName}</h3>
                            <p className="text-sm text-gray-600 mt-1">Visa Type: {visa.visaType}</p>
                            <p className="text-sm text-gray-600">Processing Time: {visa.processingTime}</p>
                            <p className="text-sm text-gray-600">Fee: ${visa.fee}</p>
                            <p className="text-sm text-gray-600">Validity: {visa.validity}</p>
                            <Link
                                to={`/visa-details/${visa._id}`}
                                className="block mt-4 text-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Visas Message */}
            {visas.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No visas available. Try changing the filter.</p>
            )}
        </div>
    );
};

export default AllVisas;
