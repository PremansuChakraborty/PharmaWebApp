import React, { useContext } from 'react'
import UserContext from '../Context/User/UserContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../component/Loader'
import axios from 'axios'
const Profile = () => {
  const {UserDetails,setUserDetails}=useContext(UserContext)
  const navigate=useNavigate();
  const handleClick=async()=>{
      // localStorage.removeItem("auth");
      try{
        await axios.get('/api/v1/user/logout',{withCredentials:true})
        setUserDetails(null);
        navigate('/');
      }catch(err){
        console.log(err)
      }
  }
  return (
    <div>
    <div className="flex justify-between items-center m-5">
    <h1 className="font-bold text-center text-2xl mx-auto">Profile</h1>
    <button 
      onClick={handleClick} 
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mr-4"
    >
      Logout
    </button>
  </div>
  
      <h4  className="font text-left text-xl">Welcome, {UserDetails.name}, to our pharmacy! Discover a wide range of healthcare products, 
      manage your prescriptions, and enjoy hassle-free shopping. We're here to support your health and well-being with care and convenience!</h4><br/>
      <h2  className="font-bold text-left text-2xl">Treatment Details</h2><br/>
      <Loader/><br/>
      <h2  className="font-bold text-left text-2xl">Medical History</h2><br/>
      <Loader/>
    </div>
  )
}

export default Profile
