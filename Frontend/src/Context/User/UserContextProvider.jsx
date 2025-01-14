import UserContext from "./UserContext";
import React, { useState } from "react";

const UserContextProvider=({children})=>{
    const[UserDetails, setUserDetails]=useState(JSON.parse(localStorage.getItem("auth"))||null)
    return(
        <UserContext.Provider  value={{UserDetails, setUserDetails}}>
         {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
