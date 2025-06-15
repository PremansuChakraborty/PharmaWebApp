import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Context/User/UserContext';
import { useContext } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setUserDetails } = useContext(UserContext);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length > 0 && password.length > 0) {
      try {
        const response = await axios.post('/api/v1/user/signup', {
          name: name,
          email: email,
          password: password
        });

        console.log(response.data);
        const response2 = await axios.post(`/api/v1/user/login`, {
          email:email,
          password: password
        });

        if (response2.status === 200) {
         console.log(response.data.message);
          setUserDetails(response.data.data.user);
          localStorage.setItem("auth",JSON.stringify(response.data.data.user))

          navigate('/');
        }// Redirect to login page after successful registration
      } catch (error) {
        console.error('An error occurred:', error.response?.data || error.message);
        alert(error.response?.data?.error || 'An error occurred during registration');
      }
    } else {
      alert('Please fill out all fields');
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
            Register
          </button>
        </form>
        
        {/* Redirect to Login Page */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-black hover:text-blue-700">
              Login
            </Link>
          </p>
          <p className="text-gray-600">
            View as Guest?{' '}
            <Link to="/" className="text-black hover:text-blue-700">
            Guest View
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}



export {Register};

