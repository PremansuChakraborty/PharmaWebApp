import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Context/User/UserContext';
import AddAddressForm from './AddAddressFrom';
import { useNavigate } from 'react-router-dom';


const Address = () => {
  const { UserDetails } = useContext(UserContext);
  const [arr, setArr] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
const navigate = useNavigate();


  const fetchAddress = async (email) => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/address/getAddresses", { email });
      if (res?.data) {
        setArr(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (UserDetails?.email) {
      fetchAddress(UserDetails.email);
    }
  }, [UserDetails?.email]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Saved Addresses</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowForm(true)}
        >
          + Add Address
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {arr.map((add, index) => (
    <div
      key={index}
      onClick={() => setSelectedAddressId(add._id)}
      className={`cursor-pointer bg-white rounded-xl shadow-md p-5 border-2 ${
        selectedAddressId === add._id ? 'border-green-600' : 'border-gray-200'
      } hover:shadow-lg transition duration-300 ease-in-out`}
    >
      <p><span className="font-semibold">Street:</span> {add.street}</p>
      <p><span className="font-semibold">City:</span> {add.city}</p>
      <p><span className="font-semibold">Landmark:</span> {add.landmark}</p>
      <p><span className="font-semibold">Zip:</span> {add.zip}</p>
      <p><span className="font-semibold">State:</span> {add.state}</p>
    </div>
  ))}
</div>

{selectedAddressId && (
  <div className="flex justify-center mt-6">
    <button
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      onClick={() => navigate(`/confirm_order/${selectedAddressId}`)}
    >
      Proceed
    </button>
  </div>
)}


      {showForm && (
        <AddAddressForm
          email={UserDetails?.email}
          onClose={() => setShowForm(false)}
          onAddressAdded={() => fetchAddress(UserDetails?.email)}
        />
      )}
    </div>
  );
};

export default Address;
