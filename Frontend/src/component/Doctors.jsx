import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const Doctors= () => {
  const [array, setArray] = useState([]);
  
  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://medical-api-m6ni.onrender.com/doctors');
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
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 object-cover"><h2>{product.name}</h2></div>
            <div className="h-40 bg-gray-300 rounded-md mb-4">
  <img src={product.imageLink} alt={product.title} className="w-full h-full object-cover" />
</div>

            <div className="h-6 bg-gray-300 rounded w-1/2"><p>{product.specialization}</p></div>
            </div>
          ))
        )}
      </div>
  );
};

export default Doctors;