import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Context/User/UserContext';

const ConfirmOrder = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const { UserDetails } = useContext(UserContext);

  const [paymentMode, setPaymentMode] = useState('CASH ON DELIVERY');// This should be calculated dynamically

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/v1/order/addOrder', {
        // email: UserDetails.email,
        location: addressId,
        payment: {
          mode: paymentMode,
          amount: 0,
          status: 'PENDING',
        },
        status: 'PLACED',
      },{withCredentials:true});

      if (res.data) {
        alert('Order placed successfully!');
        navigate('/orders');
      }
    } catch (err) {
      console.error('Order creation failed:', err.message);
      alert('Failed to place order');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Payment Method</label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="CASH ON DELIVERY">Cash on Delivery</option>
          <option value="CREDIT/DEBIT CARD">Credit/Debit Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Place Order
      </button>
    </div>
  );
};

export default ConfirmOrder;
