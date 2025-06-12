import UserContext from "./UserContext";
import React, { useState, useEffect } from "react";
import axios from 'axios'

const UserContextProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState(null)

  // Automatically persist UserDetails to localStorage
  useEffect(() => {
   (async function fetchdata(){
    try{
      const res=await axios.get('/api/v1/user/checkAuth',{withCredentials:true})
      if(res) setUserDetails(res.data.data.user);
    }catch(err){
      console.log(err);
    }
   })()
  }, []);

  return (
    <UserContext.Provider value={{ UserDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
