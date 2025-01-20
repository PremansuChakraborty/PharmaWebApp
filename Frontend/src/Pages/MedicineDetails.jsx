import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MedicineDetails = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    const fetchDetails = async (id) => {
      try {
        const res = await axios.post('http://localhost:8000/api/v1/medicine/getMedicine', { id: id });
        setMedicine(res.data);
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  if (!medicine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{medicine.name}</h1>
      <img src={medicine.imageLink} alt={medicine.name} className="w-full h-full object-cover"  />
      <p className="mb-4">{medicine.description}</p>
      <p className="text-lg font-semibold">Price: ₹{medicine.price}</p>
      <p className="text-lg font-semibold">Rating: {medicine.rating} / 5</p>
      <p className="text-lg font-semibold">Stock: {medicine.stock}</p>
    </div>
  );
};

export default MedicineDetails;
