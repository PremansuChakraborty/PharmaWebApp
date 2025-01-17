import React, { useContext } from 'react'
import { Navbar } from './Nav'
import {  Outlet } from 'react-router-dom'
import UserContext from '../../Context/User/UserContext'
import ChatBot from '../ChatBot/ChatBot'

const MainContainer = () => {
   const {UserDetails}=useContext(UserContext)
  return (
    <>
        <Navbar UserDetails={UserDetails}/>
        <ChatBot/>
        <Outlet/>
    </>
  )
}

export default MainContainer
