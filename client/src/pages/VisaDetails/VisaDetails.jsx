import { Link, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FaGlobe, FaClock, FaDollarSign, FaUserAlt, FaFileAlt } from 'react-icons/fa';

const VisaDetails = () => {
  const visa = useLoaderData();
  const { user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);

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
      applicantEmail: user?.email || 'unknown@example.com',
      appliedDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:5000/applications', applicationData);
      alert(`Application submitted successfully! Application ID: ${response.data.applicationId}`);
      setModalOpen(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit the application. Please try again.');
    }
  };

  if (!visa) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FaGlobe className="text-blue-500 mr-2" /> {visa.countryName} Visa Details
          </h1>
          <Link
            to="/all-visas"
            className="text-sm text-blue-500 hover:underline"
          >
            Back to All Visas
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div>
            <img
              src={visa.countryImage}
              alt={visa.countryName}
              className="w-full h-64 object-cover rounded-md shadow-sm"
            />
            <span className="block mt-4 bg-blue-100 text-blue-600 text-sm font-medium py-1 px-2 rounded-full w-fit">
              {visa.visaType}
            </span>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <div className="text-gray-700">
              <p className="flex items-center text-sm">
                <FaClock className="text-green-500 mr-2" />
                <strong className="mr-2">Processing Time:</strong> {visa.processingTime}
              </p>
              <p className="flex items-center text-sm mt-2">
                <FaUserAlt className="text-yellow-500 mr-2" />
                <strong className="mr-2">Age Restriction:</strong> {visa.ageRestriction || 'No restriction'}
              </p>
              <p className="flex items-center text-sm mt-2">
                <FaDollarSign className="text-red-500 mr-2" />
                <strong className="mr-2">Fee:</strong> ${visa.fee}
              </p>
              <p className="flex items-center text-sm mt-2">
                <FaFileAlt className="text-purple-500 mr-2" />
                <strong className="mr-2">Validity:</strong> {visa.validity}
              </p>
              <p className="text-sm mt-2">
                <strong>Application Method:</strong> {visa.applicationMethod}
              </p>
            </div>

            <h2 className="text-lg font-medium text-gray-800 mt-6">Required Documents</h2>
            <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
              {visa.requiredDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>

            <h2 className="text-lg font-medium text-gray-800 mt-6">Description</h2>
            <p className="text-gray-600 text-sm mt-2">{visa.description}</p>

            <button
              onClick={() => setModalOpen(true)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal for applying */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h2 className="text-lg font-medium text-gray-800">Apply for {visa.countryName} Visa</h2>
            <form onSubmit={handleApplyNow} className="mt-4 space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-200"
                required
              />
              <input
                type="email"
                name="email"
                value={user?.email || ''}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-200"
                disabled
              />
              <input
                type="text"
                name="fee"
                value={`$${visa.fee}`}
                placeholder="Visa Fee"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-200"
                disabled
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
