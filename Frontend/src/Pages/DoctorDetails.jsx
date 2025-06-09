import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async (id) => {
      try {
        const res = await axios.post('/api/v1/doctor/getDoctor', { id: id });
        setDetails(res.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{details.name}</h1>
      <img src={details.imageLink} alt={details.name} className="w-full h-full object-cover" />
      <p className="text-lg font-semibold mb-2">Specialization: {details.specialization}</p>
      <p className="text-lg mb-2">Experience: {details.experience} years</p>
      <p className="text-lg mb-2">Contact Number: {details.contact_number}</p>
      <p className="text-lg mb-2">Location: {details.location}</p>
      <p className="text-lg mb-2">Email: {details.email}</p>
      <p className="mb-4">{details.description}</p>
    </div>
  );
};

export default Details;
