import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState(0);
  const location = useLocation();
const navigate=useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const orderID = queryParams.get('orderID');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.post('http://localhost:8080/api/v1/order/getOrderById', {
          id: orderID
        });
        setOrder(res.data);
        console.log(res.data)
        if (res.data && res.data.payment && res.data.payment.amount) {
          setAmount(res.data.payment.amount*80);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };

    if (orderID) {
      fetchOrder();
    }
  }, []);

  const payNow = async () => {
    const amt = Number(amount);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/payment/razorpay", {
        amount: amt
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = response.data;

      const options = {
        key: "rzp_test_MfzEUtnfE7fSOu", // Replace with your actual Razorpay key
        amount: data.amount,
        currency: data.currency,
        name: "My Company",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          alert("Payment ID: " + response.razorpay_payment_id);
          alert("Order ID: " + response.razorpay_order_id);
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Something went wrong. Please try again.");
    }finally{
        navigate('/orders')
}
  };

  return (
 <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Make a Payment</h2>

    {order ? (
      <>
        <p className="text-base text-gray-600 mb-2">
          <span className="font-medium text-gray-800">Order ID:</span> {order._id}
        </p>
        <p className="text-lg text-blue-600 font-semibold mb-6">
          <span className="font-medium text-gray-800">Amount:</span> ₹{amount}
        </p>
        <button
          onClick={payNow}
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Pay Now
        </button>
      </>
    ) : (
      <p className="text-gray-500">Loading order details...</p>
    )}
  </div>
</div>

  );
};

export default PaymentPage;
