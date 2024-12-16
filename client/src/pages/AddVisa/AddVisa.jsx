import { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const AddVisa = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        countryImage: '',
        countryName: '',
        visaType: '',
        processingTime: '',
        requiredDocuments: [],
        description: '',
        ageRestriction: '',
        fee: '',
        validity: '',
        applicationMethod: '',
        createdAt: new Date().toISOString(),
        name: user.displayName,
        email: user.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            requiredDocuments: checked
                ? [...prev.requiredDocuments, value]
                : prev.requiredDocuments.filter((doc) => doc !== value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/visas', formData); // Replace with your API endpoint
            toast.success('Visa added successfully!');
            navigate('/'); // Navigate to "All Visas" page after success
        } catch (error) {
            toast.error('Failed to add visa. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Visa</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="url"
                        name="countryImage"
                        placeholder="Country Image URL"
                        value={formData.countryImage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="countryName"
                        placeholder="Country Name"
                        value={formData.countryName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <select
                        name="visaType"
                        value={formData.visaType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Select Visa Type</option>
                        <option value="Tourist Visa">Tourist Visa</option>
                        <option value="Student Visa">Student Visa</option>
                        <option value="Official Visa">Official Visa</option>
                    </select>
                    <input
                        type="text"
                        name="processingTime"
                        placeholder="Processing Time"
                        value={formData.processingTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <div>
                        <label className="block text-gray-700 font-medium">Required Documents</label>
                        <div className="flex items-center space-x-4">
                            {['Valid Passport', 'Visa Application Form', 'Photograph'].map((doc) => (
                                <label key={doc} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={doc}
                                        onChange={handleCheckboxChange}
                                        className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="ml-2 text-gray-700">{doc}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        name="ageRestriction"
                        placeholder="Age Restriction"
                        value={formData.ageRestriction}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        name="fee"
                        placeholder="Fee"
                        value={formData.fee}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        name="validity"
                        value={formData.validity}
                        onChange={handleChange}
                        placeholder="Validity in month"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="applicationMethod"
                        placeholder="Application Method"
                        value={formData.applicationMethod}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.displayName}
                        required
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    /><input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        required
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Add Visa
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddVisa;
