import React, { useState, useEffect, useContext } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/User/UserContext';
import axios from 'axios';

const Medicines = () => {
  const [array, setArray] = useState([]);
  const navigate = useNavigate();
  const { UserDetails } = useContext(UserContext);

  const handleClick = (id) => {
    navigate(`/medicine_details/${id}`);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8000/api/v1/medicine/allMedicine');
        const products = await response.json();
        setArray(products?.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const addToCart = async (_id) => {
    try {
      await axios.post('http://localhost:8000/api/v1/user/addToCart', {
        email: UserDetails.email,
        id: _id,
      });
      alert("Item added to the cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      {array.length === 0 ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,_300px)] justify-around gap-y-6">
          {array.map((medicine) => (
            <div
              key={medicine._id}
              className="w-64 p-4 bg-white rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleClick(medicine._id)}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{medicine.name}</h2>

              <div className="h-40 bg-gray-300 rounded-md overflow-hidden mb-4">
                <img
                  src={medicine.imageLink || 'https://via.placeholder.com/150'}
                  alt={medicine.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">₹{medicine.price * 8}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(medicine._id);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out shadow-md"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default Medicines;
