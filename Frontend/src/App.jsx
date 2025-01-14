

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './Pages/Register'

import './index.css'
import MainContainer from './component/Main/mainContainer'
import Offers from './Pages/Offers'
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import UserContextProvider from './Context/User/UserContextProvider'
import { Login } from './Pages/Login'
import Footer from './component/footer'
import Wallet from './Pages/Wallet'
import Orders from './Pages/Orders'

function App() {
  return (

    <>
     <UserContextProvider>
      <BrowserRouter>
      {/* {auth?<Navbar/>:null} */}
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      </Routes>
      <MainContainer/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/wallet" element={<Wallet/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path="/offers" element={<Offers/>} />
      </Routes>
          <Footer/>
      </BrowserRouter>
      </UserContextProvider>

    </>
  )
}

export default App
