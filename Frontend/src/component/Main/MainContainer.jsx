import React, { useContext } from 'react'
import { Navbar } from './Nav'
import {  Outlet } from 'react-router-dom'
import UserContext from '../../Context/User/UserContext'

const MainContainer = () => {
   const {UserDetails}=useContext(UserContext)
  return (
    <>
        <Navbar UserDetails={UserDetails}/>
        <Outlet/>
    </>
  )
}

export default MainContainer
