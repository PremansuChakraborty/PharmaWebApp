import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './Pages/Register';
import { Login } from './Pages/Login';

import './index.css';

import MainContainer from './component/Main/mainContainer';
import Footer from './component/footer';

import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Wallet from './Pages/Wallet';
import Orders from './Pages/Orders';
import Offers from './Pages/Offers';

import MedicineDetails from './Pages/medicinedetails';
import DoctorDetails from './Pages/DoctorDetails';
import AmbulanceDetails from './Pages/AmbulanceDetails';

import AddDoctor from './Pages/AddDoctor';
import AddMedicine from './Pages/AddMedicine';
import AddAmbulance from './Pages/AddAmbulance';

import Address from './Pages/Address';

import UserContextProvider from './Context/User/UserContextProvider';
import ConfirmOrder from './Pages/ConfirmOrder';
import BillPage from './Pages/BillPage';
import PaymentPage from './Pages/PaymentPage';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>

        {/* Optional: Add conditional Navbar here based on auth state */}
        {/* {auth && <Navbar />} */}

        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {/* Persistent Layout Components */}
        <MainContainer />

        <Routes>
          {/* Main App Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/offers" element={<Offers />} />

          {/* Dynamic Detail Pages */}
          <Route path="/medicine_details/:id" element={<MedicineDetails />} />
          <Route path="/doctor_details/:id" element={<DoctorDetails />} />
          <Route path="/ambulance_details/:id" element={<AmbulanceDetails />} />

          {/* Admin/Add Routes */}
          <Route path="/add_new_doctor" element={<AddDoctor />} />
          <Route path="/add_new_medicine" element={<AddMedicine />} />
          <Route path="/add_new_ambulance" element={<AddAmbulance />} />

          {/* Address Selection */}
          <Route path="/select_address" element={<Address />} />

          <Route path="/confirm_order/:addressId" element={<ConfirmOrder/>} />

          <Route path="/bill_page/:orderId" element={<BillPage/>} />
          <Route path="/razorpay" element={<PaymentPage/>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
