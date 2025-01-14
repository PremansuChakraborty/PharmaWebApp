import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const Ambulance= () => {
  const [array, setArray] = useState([]);
  
  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://medical-api-m6ni.onrender.com/ambulences');
        const products = await response.json();
        setArray(products?.data); // Update state with the fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    
    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array means it runs once when the component mounts
  
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_300px)] justify-around gap-y-2.5">
        {array.length === 0 ? (
         <Loader/>
        ) : (
          array.map(product => (
            <div key={product.id} className="w-64 p-4 bg-white rounded-lg">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 object-cover"><h2>{product.location}</h2></div>
            <div className="h-40 bg-gray-300 rounded-md mb-4"><img src='https://cdn-ilbcdcb.nitrocdn.com/MeIeCSkEMhiSeDZskUUpnJqKXJDTuHPy/assets/images/optimized/rev-93321bb/www.rescusaveslives.com/wp-content/uploads/2022/02/shutterstock_1159851319.jpg'
              className="w-full h-full object-contain"/></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"><p>Contact: {product.contact}</p></div>
            </div>
          ))
        )}
      </div>
  );
};

export default Ambulance;