import React, { useState, useContext } from 'react';
import UserContext from '../Context/User/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const apiUrl = 'http://localhost:8000/api/v1/user';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    if (email && password) {
      try {
        const response = await axios.post(`${apiUrl}/login`, {
          email:email,
          password: password
        });

        if (response.status === 200) {
          console.log(response.data.message);
          setUserDetails({ name: response.data.data.user.name, email: response.data.data.user.email });
          localStorage.setItem("auth",JSON.stringify({name:response.data.data.user.name,email:response.data.data.user.email}))

          navigate('/');
        }
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      }
    } else {
      setError("Please enter both email and password");
    }
  };

  return (
    <div className="login-container flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        
        {error && <p className="text-white text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-black hover:text-blue-700">
              Register
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

export {Login};
