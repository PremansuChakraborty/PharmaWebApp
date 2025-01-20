import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const Ambulance= () => {
  const [array, setArray] = useState([]);
  
  // Fetch items when the component mounts
  useEffect(() => {
    async function fetchitems() {
      try {
        const response = await fetch('http://localhost:8000/api/v1/ambulance/allAmbulance');
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
          array.map(item => (
            <div key={item.id} className="w-64 p-4 bg-white rounded-lg">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 object-cover"><h2>{item.location}</h2></div>
            <div className="h-40 bg-gray-300 rounded-md mb-4"><img src={item.imageLink}
              className="w-full h-full object-contain"/></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"><p>Contact: {item.contact_number}</p></div>
            </div>
          ))
        )}
      </div>
  );
};

export default Ambulance;