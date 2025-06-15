import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BillPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    axios.post("http://localhost:8080/api/v1/order/getOrderById", { id: orderId }).then((res) => {
      console.log(res.data);
      setOrder(res.data);
    });
  }, [orderId]);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

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

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto ">
      <div ref={printRef} className="p-6 border rounded shadow-md bg-white ">
      <div className="relative flex items-center justify-center mb-4">
  {/* Left-aligned logo */}
  <div className="absolute left-0">
    <img
      src="https://i.ibb.co/bBC4nfj/download-1.png"
      alt="Company Logo"
      className="h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 2xl:h-24 transform hover:scale-125 transition-transform duration-200"
    />
  </div>

  {/* Centered title */}
  <h1 className="text-2xl font-bold text-center">Invoice</h1>
</div>

        <p><strong>Order ID:</strong> {order._id}</p>
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
            {Array.isArray(order.medicines) &&
              order.medicines.map((item, idx) => (
                <li key={idx}>
                  {item.medicine_id?.name || "Unknown"} × {item.count} = ₹
                  {item.medicine_id?.price * item.count * 8}
                </li>
              ))}
          </ul>
        </div>

        {/* Address Details */}
        {order.location && (
          <div className="mt-4">
            <p className="font-semibold">Delivery Address:</p>
            <p>{order.location.name}</p>
            <p>{order.location.phone}</p>
            <p>
              {order.location.street}, {order.location.city}
            </p>
            <p>
              {order.location.state} - {order.location.zip}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Print Bill
      </button>
    </div>
  );
};

export default BillPage;
