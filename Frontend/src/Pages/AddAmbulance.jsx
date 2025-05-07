import React, { useState } from "react";
import axios from "axios";

const AddAmbulance = () => {
  const [formData, setFormData] = useState({
    location: "",
    distance: "",
    contact_number: "",
    imageLink: "",
    driver_name: "",
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/ambulance/addAmbulance",
        formData
      );
      console.log("Response:", response);

      // Show the success popup
      setShowPopup(true);

      // Optionally hide popup after a few seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Popup disappears after 3 seconds

      // Clear form after submission
      setFormData({
        location: "",
        distance: "",
        contact_number: "",
        imageLink: "",
        driver_name: "",
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Add Ambulance</h2>

        <div className="mb-4">
          <label className="block mb-1">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Distance:</label>
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.distance && <p className="text-red-500 text-sm">{errors.distance}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Contact Number:</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.contact_number && (
            <p className="text-red-500 text-sm">{errors.contact_number}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Image Link:</label>
          <input
            type="url"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.imageLink && (
            <p className="text-red-500 text-sm">{errors.imageLink}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Driver Name:</label>
          <input
            type="text"
            name="driver_name"
            value={formData.driver_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.driver_name && (
            <p className="text-red-500 text-sm">{errors.driver_name}</p>
          )}
        </div>

        <div className="mb-4 text-center">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
          <p className="font-semibold">New Ambulance Added!</p>
        </div>
      )}
    </div>
  );
};

export default AddAmbulance;
