import React, { useState } from 'react';
import axios from 'axios';

const AddAddressForm = ({ email, onClose, onAddressAdded }) => {
  const [form, setForm] = useState({
    street: '',
    city: '',
    landmark: '',
    zip: '',
    state: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/address/addAddress", {
        ...form
      },{withCredentials:true});
      onAddressAdded(); // To refresh the address list
      onClose(); // Close form
    } catch (err) {
      console.error(err.message);
      alert('Failed to add address.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" name="street" placeholder="Street" required onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="city" placeholder="City" required onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="landmark" placeholder="Landmark" required onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="zip" placeholder="Zip" required onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="state" placeholder="State" required onChange={handleChange} className="p-2 border rounded" />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white">Cancel</button>
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressForm;
