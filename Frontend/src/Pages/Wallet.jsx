import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import UserContext from '../Context/User/UserContext';
import { useNavigate } from 'react-router-dom';
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';

const Wallet = () => {
  const { UserDetails } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/order/getOrder',{withCredentials:true});
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (UserDetails?.email) {
      fetchOrders();
    }
  }, [UserDetails?.email]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getExpectedDelivery = (isoString, daysToAdd = 4) => {
    const date = new Date(isoString);
    date.setDate(date.getDate() + daysToAdd);
    return formatDate(date.toISOString());
  };

  return (
    <div className="p-6">
      <h1 className="font-bold text-center text-2xl mb-4">Purchase Details</h1>
      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-lg font-semibold mb-2">Order #{index + 1}</h2>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Payment Mode:</strong> {order.payment.mode}</p>
              <p><strong>Amount:</strong> ₹{order.payment.amount * 8}</p>
              <p><strong>Payment Status:</strong> {order.payment.status}</p>
              <p><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>
              <p><strong>Expected Delivery:</strong> {getExpectedDelivery(order.createdAt)}</p>

              {/* Medicines */}
              <div className="mt-2">
                <p className="font-semibold">Medicines:</p>
                <ul className="list-disc list-inside">
                  {order.medicines.map((item, idx) => (
                    <li key={idx}>
                      {item.medicine_id?.name || 'Unknown'} × {item.count} = ₹{item.medicine_id?.price * item.count * 8}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Address Details */}
              {order.location ? (
                <div className="mt-4">
                  <p className="font-semibold">Delivery Address:</p>
                  <p>{order.location.name}</p>
                  <p>{order.location.phone}</p>
                  <p>{order.location.street}, {order.location.city}</p>
                  <p>{order.location.state} - {order.location.zip}</p>
                  <br/>
                  <button  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" onClick={()=>navigate(`/bill_page/${order._id}`)}>Show bill</button>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mt-2">Address details not available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wallet;
