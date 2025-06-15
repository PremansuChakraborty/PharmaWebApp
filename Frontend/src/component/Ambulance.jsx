import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
const Ambulance= () => {
  const [array, setArray] = useState([]);
    const navigate = useNavigate();
    const handleClick=(id)=>{
      // console.log(id);
      navigate(`/ambulance_details/${id}`)
   }
  
  // Fetch items when the component mounts
  useEffect(() => {
    async function fetchitems() {
      try {
        const response = await fetch('http://localhost:8080/api/v1/ambulance/allAmbulance');
        const items = await response.json();
        setArray(items?.data); // Update state with the fetched items
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
    
    fetchitems(); // Call the fetch function
  }, []); // Empty dependency array means it runs once when the component mounts
  
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_300px)] justify-around gap-y-2.5">
        {array.length === 0 ? (
         <Loader/>
        ) : (
          array.map(ambulance => (
            <div
                  key={ambulance._id}
                  className="w-64 p-4 bg-white rounded-lg shadow-lg"
                  onClick={()=>handleClick(ambulance._id)}
                >
                  {/* Doctor's Name */}
                  <div className="mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {ambulance.location}
                    </h2>
                  </div>

                  {/* Doctor's Image */}
                  <div className="h-40 bg-gray-300 rounded-md overflow-hidden mb-4">
                    <img
                      src={ambulance.imageLink || "default-image.jpg"} // Fallback for missing image
                      alt={"Ambulance Image"} // Fallback for missing title
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Specialization */}
                  <div>
                    <p className="text-sm text-gray-600">
                      Contact:{ambulance.contact_number}
                    </p>
                  </div>
                </div>
          ))
        )}
      </div>
  );
};

export default Ambulance;