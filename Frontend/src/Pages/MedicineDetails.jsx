import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../Context/User/UserContext';

const MedicineDetails = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const {UserDetails}=useContext(UserContext)

  useEffect(() => {
    const fetchDetails = async (id) => {
      try {
        const res = await axios.post('/api/v1/medicine/getMedicine', { id: id });
        setMedicine(res.data);
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  const addToCart=async(_id)=>{
      try{
        console.log(UserDetails.email+" "+_id);
        await axios.post('/api/v1/user/addToCart',{email: UserDetails.email,id:_id});
        alert("Item added to the cart");
      }
      catch(err){
        console.log(err)
      }
    }

  if (!medicine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-2">{medicine.name}</h1>
      <img src={medicine.imageLink} alt={medicine.name} className="w-full h-full object-cover"  />
      <p className="mb-4">{medicine.description}</p>
      <p className="text-lg font-semibold">Price: ₹{medicine.price*8}</p>
      <p className="text-lg font-semibold">Rating: {medicine.rating}⭐ / 5⭐</p>
      <p className="text-lg font-semibold">Stock: {medicine.stock}</p>
      <button
    onClick={(e) => {
      e.stopPropagation();
      addToCart(id);
    }}
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out shadow-md"
  >
    Add to cart
  </button>
    </div>
  );
};

export default MedicineDetails;
