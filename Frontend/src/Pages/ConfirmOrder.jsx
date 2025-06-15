import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Context/User/UserContext';

const ConfirmOrder = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const { UserDetails } = useContext(UserContext);

  const [paymentMode, setPaymentMode] = useState('CASH ON DELIVERY');

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/order/addOrder',
        {
          location: addressId,
          payment: {
            mode: paymentMode,
            amount: 0, // You can replace this with the actual amount if available
            status: 'PENDING',
          },
          status: 'PLACED',
        },
        { withCredentials: true }
      );

      console.log(res);

      if (paymentMode === 'Online Methods') {
        // ✅ FIX: Correct query string format
        navigate(`/razorpay?orderID=${res.data.order._id}`);
        return;
      }

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
          <option value="Online Methods">Online Methods</option>
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
