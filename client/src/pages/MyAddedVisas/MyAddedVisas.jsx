import { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { AuthContext } from "../../providers/AuthProvider";

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisa, setSelectedVisa] = useState(null); // For the modal

  useEffect(() => {
    axios.get("http://localhost:5000/visas").then((response) => {
      const visas = response.data;
      setVisas(visas);
      setLoading(false);
    });
  }, [user.email]);

  const handleUpdate = (visa) => {
    setSelectedVisa(visa);
    document.getElementById("update-modal").checked = true; // Open the modal
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this visa?")) {
      axios
        .delete(`http://localhost:5000/visas/${id}`) // Change to your actual API delete endpoint
        .then(() => {
          setVisas(visas.filter((visa) => visa._id !== id));
          alert("Visa deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting visa:", error);
          alert("Failed to delete visa.");
        });
    }
  };

  const handleModalSubmit = (updatedVisa) => {
    axios
      .put(`http://localhost:5000/visas/${updatedVisa._id}`, updatedVisa) // Change to your actual API update endpoint
      .then(() => {
        setVisas(
          visas.map((visa) => (visa._id === updatedVisa._id ? updatedVisa : visa))
        );
        document.getElementById("update-modal").checked = false; // Close the modal
        alert("Visa updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating visa:", error);
        alert("Failed to update visa.");
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-12">
        <span className="loading loading-spinner text-primary"></span> Loading
        your added visas...
      </div>
    );
  }

  if (visas.length === 0) {
    return (
      <p className="text-center mt-12 text-gray-500">No visas found.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold text-center">My Added Visas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {visas.map((visa) => (
          <div
            key={visa._id}
            className="border border-gray-300 rounded-lg shadow-md p-4 bg-white"
          >
            <img
              src={visa.image}
              alt={`${visa.country} flag`}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-3 text-lg font-semibold">{visa.country}</h3>
            <p>
              <strong>Visa Type:</strong> {visa.visaType}
            </p>
            <p>
              <strong>Processing Time:</strong> {visa.processingTime}
            </p>
            <p>
              <strong>Fee:</strong> {visa.fee}
            </p>
            <p>
              <strong>Validity:</strong> {visa.validity}
            </p>
            <p>
              <strong>Application Method:</strong> {visa.applicationMethod}
            </p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleUpdate(visa)}
                className="btn btn-primary btn-sm"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(visa._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Daisy UI Modal */}
      <input type="checkbox" id="update-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Visa</h3>
          {selectedVisa && (
            <UpdateForm
              visa={selectedVisa}
              onClose={() =>
                (document.getElementById("update-modal").checked = false)
              }
              onSubmit={handleModalSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const UpdateForm = ({ visa, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    ...visa, // Ensure the initial state matches the visa details
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="countryName"
        value={formData.countryName}
        onChange={handleChange}
        placeholder="Country"
        className="input input-bordered w-full"
        required
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
        value={formData.processingTime}
        onChange={handleChange}
        placeholder="Processing Time"
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="fee"
        value={formData.fee}
        onChange={handleChange}
        placeholder="Fee"
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="validity"
        value={formData.validity}
        onChange={handleChange}
        placeholder="Validity"
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        name="applicationMethod"
        value={formData.applicationMethod}
        onChange={handleChange}
        placeholder="Application Method"
        className="input input-bordered w-full"
        required
      />
      <div className="modal-action">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MyAddedVisas;
