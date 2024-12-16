import { FaMapMarkerAlt, FaRegClock, FaDollarSign, FaShieldAlt } from 'react-icons/fa';
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
        <div className=" bg-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
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
                            <option value="Business Visa">Business Visa</option>
                            <option value="Medical Visa">Medical Visa</option>
                        </select>
                    </div>
                </div>

                {/* Visa Grid */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {visas.map((visa) => (
                        <div
                            key={visa._id}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            {/* Image Section */}
                            <div className="relative">
                                <img
                                    src={visa.countryImage}
                                    alt={visa.countryName}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                                    {visa.visaType}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5">
                                {/* Country Name */}
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
                                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                                    {visa.countryName}
                                </h3>

                                {/* Details */}
                                <div className="flex items-center text-gray-600 text-sm md:text-md mt-2">
                                    <FaRegClock className="text-green-500 mr-2" />
                                    <span className="font-semibold">Processing Time:&nbsp;</span>{visa.processingTime}
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="flex items-center text-gray-600 text-sm md:text-md">
                                        <FaDollarSign className="text-yellow-500 mr-2" />
                                        <span className="font-semibold">Fee:&nbsp;</span> ${visa.fee}
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm md:text-md">
                                        <FaShieldAlt className="text-red-500 mr-2" />
                                        <span className="font-semibold">Validity:&nbsp;</span>{visa.validity}
                                    </div>

                                </div>
                                {/* Button */}
                                <Link
                                    to={`/visa-details/${visa._id}`}
                                    className="block mt-5 text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm md:text-md font-medium py-2 px-4 rounded-lg hover:opacity-90 transition duration-200"
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
        </div>
    );
};

export default AllVisas;
