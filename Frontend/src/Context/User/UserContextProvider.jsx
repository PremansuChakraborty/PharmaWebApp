import UserContext from "./UserContext";
import React, { useState, useEffect } from "react";

const UserContextProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("auth");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Automatically persist UserDetails to localStorage
  useEffect(() => {
    if (UserDetails) {
      localStorage.setItem("auth", JSON.stringify(UserDetails));
    } else {
      localStorage.removeItem("auth");
    }
  }, [UserDetails]);

  return (
    <UserContext.Provider value={{ UserDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
