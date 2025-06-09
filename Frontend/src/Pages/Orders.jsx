import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../Context/User/UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const { UserDetails } = useContext(UserContext);
  const [arr, setArray] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.post('/api/v1/user/getCart', {
        email: UserDetails?.email,
      });
      setArray(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (UserDetails?.email) fetchProducts();
  }, [UserDetails?.email]);

  const increase = async (email, id) => {
    await axios.post("/api/v1/user/addToCart", { email, id });
    await fetchProducts();
  };

  const decrease = async (email, id, cnt) => {
    if (cnt === 1) return alert('Delete the product');
    await axios.post("/api/v1/user/reduceCount", { email, id });
    await fetchProducts();
  };

  const deleteItem = async (email, id) => {
    await axios.post("/api/v1/user/deleteProduct", { email, id });
    await fetchProducts();
  };

  const handleClick = () => {
    navigate(`/select_address`);
  };

  const filteredItems = arr.filter(item => item.medicine_id !== null);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">My Cart</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_300px)] justify-around gap-y-2.5">
        {filteredItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty or data is loading...</p>
        ) : (
          filteredItems.map((medicine) => {
            const med = medicine.medicine_id;

            return (
              <div key={med._id} className="w-64 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {med.name || 'Unnamed Medicine'}
                </h2>

                <div className="h-40 bg-gray-300 rounded-md overflow-hidden mb-4">
                  <img
                    src={med.imageLink || 'https://via.placeholder.com/150'}
                    alt={med.name || 'Medicine'}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold">₹{med.price * 8}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => decrease(UserDetails?.email, med._id.toString(), medicine.count)}
                        className="px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <h1 className="text-xl font-bold">{medicine.count}</h1>
                      <button
                        onClick={() => increase(UserDetails?.email, med._id.toString())}
                        className="px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">Rating: {med.rating || 'N/A'}⭐</p>
                    <button
                      onClick={() => deleteItem(UserDetails?.email, med._id.toString())}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {filteredItems.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={handleClick}
          >
            Place Your Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
