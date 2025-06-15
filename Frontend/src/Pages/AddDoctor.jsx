import React, { useState } from "react";
import axios from "axios";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    imageLink: "",
    experience: "",
    contact_number: "",
    location: "",
    email: "",
    description: "",
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
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
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
        "/api/v1/doctor/addDoctor",
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
        name: "",
        specialization: "",
        imageLink: "",
        experience: "",
        contact_number: "",
        location: "",
        email: "",
        description: "",
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
        <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>

        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.specialization && (
            <p className="text-red-500 text-sm">{errors.specialization}</p>
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
          <label className="block mb-1">Experience:</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience}</p>
          )}
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
          <label className="block mb-1">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
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
          <p className="font-semibold">New Doctor Added!</p>
        </div>
      )}
    </div>
  );
};

export default AddDoctor;
