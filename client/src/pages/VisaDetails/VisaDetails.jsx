import { Link, useLoaderData } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider'; // Assuming you have an AuthProvider for user details

const VisaDetails = () => {
    const visa = useLoaderData();
    const { user } = useContext(AuthContext); // Get the current user details
    const [isModalOpen, setModalOpen] = useState(false); // To handle modal visibility

    // Handle applying for the visa
    const handleApplyNow = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const applicationData = {
            visaId: visa._id,
            countryImage: visa.countryImage,
            countryName: visa.countryName,
            visaType: visa.visaType,
            fee: visa.fee,
            validity: visa.validity,
            applicationMethod: visa.applicationMethod,
            applicantName: `${formData.get('firstName')} ${formData.get('lastName')}`,
            applicantEmail: user?.email || "unknown@example.com",
            appliedDate: new Date().toISOString(),
        };

        try {
            const response = await axios.post('http://localhost:5000/applications', applicationData);
            alert(`Application submitted successfully! Application ID: ${response.data.applicationId}`);
            setModalOpen(false); // Close the modal after submission
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit the application. Please try again.');
        }
    };

    if (!visa) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">{visa.countryName} Visa Details</h2>
                    <Link
                        to="/all-visas"
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                        Back to All Visas
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={visa.countryImage}
                            alt={visa.countryName}
                            className="w-full h-56 object-cover rounded-lg shadow-md mb-4"
                        />
                    </div>

                    <div>
                        <p className="text-lg text-gray-700 mb-4">
                            <strong>Visa Type:</strong> {visa.visaType}
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            <strong>Processing Time:</strong> {visa.processingTime}
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            <strong>Age Restriction:</strong> {visa.ageRestriction ? visa.ageRestriction : 'No restriction'}
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            <strong>Fee:</strong> ${visa.fee}
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            <strong>Validity:</strong> {visa.validity}
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            <strong>Application Method:</strong> {visa.applicationMethod}
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6">Required Documents</h3>
                        <ul className="list-disc ml-5 text-gray-700">
                            {visa.requiredDocuments.map((doc, index) => (
                                <li key={index} className="text-sm mb-2">{doc}</li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6">Description</h3>
                        <p className="text-lg text-gray-700">{visa.description}</p>

                        {/* Apply Now Button */}
                        <button
                            onClick={() => setModalOpen(true)}
                            className="mt-6 btn btn-primary"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>

                {/* Modal for applying */}
                {isModalOpen && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Apply for {visa.countryName} Visa</h3>
                            <form onSubmit={handleApplyNow} className="space-y-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={user?.email || ''}
                                    placeholder="Email"
                                    className="input input-bordered w-full"
                                    disabled
                                />
                                <input
                                    type="text"
                                    name="fee"
                                    value={`$${visa.fee}`}
                                    placeholder="Visa Fee"
                                    className="input input-bordered w-full"
                                    disabled
                                />
                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">Apply</button>
                                    <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisaDetails;
