import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Doctors= () => {
  const [array, setArray] = useState([]);
  const navigate = useNavigate();
  const handleClick=(id)=>{
    // console.log(id);
    navigate(`/doctor_details/${id}`)
 }
  
  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8000/api/v1/doctor/allDoctor');
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
          array.map(doctor => (
            <div
                  key={doctor._id}
                  className="w-64 p-4 bg-white rounded-lg shadow-lg"
                  onClick={()=>handleClick(doctor._id)}
                >
                  {/* Doctor's Name */}
                  <div className="mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {doctor.name}
                    </h2>
                  </div>

                  {/* Doctor's Image */}
                  <div className="h-40 bg-gray-300 rounded-md overflow-hidden mb-4">
                    <img
                      src={doctor.imageLink || "default-image.jpg"} // Fallback for missing image
                      alt={doctor.title || "Doctor Image"} // Fallback for missing title
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Specialization */}
                  <div>
                    <p className="text-sm text-gray-600">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
          ))
        )}
      </div>
  );
};

export default Doctors;