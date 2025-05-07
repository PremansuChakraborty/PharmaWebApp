import React, { useContext } from 'react'
import { Navbar } from './Nav'
import {  Outlet } from 'react-router-dom'
import UserContext from '../../Context/User/UserContext'
import ChatBot from '../ChatBot/ChatBot'
import AddInDB from '../AddInDB/AddInDB'

const MainContainer = () => {
   const {UserDetails}=useContext(UserContext)
  return (
    <>
        <Navbar UserDetails={UserDetails}/>
        <AddInDB/>
        <ChatBot/>
        <Outlet/>
    </>
  )
}

export default MainContainer
