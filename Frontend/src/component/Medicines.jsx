import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
const Medicines= () => {
  const [array, setArray] = useState([]);
  const navigate = useNavigate();
  //handle click
  const handleClick=(id)=>{
    //  console.log(id);
     navigate(`/medicine_details/${id}`)
  }
  
  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8000/api/v1/medicine/allMedicine');
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
          array.map(medicine => (
            <div
                  key={medicine._id}
                  className="w-64 p-4 bg-white rounded-lg shadow-lg"
                  onClick={()=>handleClick(medicine._id)}
                >
                  {/* Doctor's Name */}
                  <div className="mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {medicine.name}
                    </h2>
                  </div>

                  {/* Doctor's Image */}
                  <div className="h-40 bg-gray-300 rounded-md overflow-hidden mb-4">
                    <img
                      src={medicine.imageLink} // Fallback for missing image
                      alt={medicine.title} // Fallback for missing title
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Specialization */}
                  <div>
                    <p className="text-sm text-gray-600">
                    ₹{medicine.price*8}
                    </p>
                  </div>
                </div>
          ))
        )}
      </div>
  );
};

export default Medicines;
