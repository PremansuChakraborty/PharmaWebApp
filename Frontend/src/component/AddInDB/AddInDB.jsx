import { useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/User/UserContext';
export default function AddInDB() {
  const [showCard, setShowCard] = useState(false);
  const navigate=useNavigate()
  const {UserDetails}=useContext(UserContext)

  const toggleCard = () => {
    setShowCard(!showCard);
  };

  return (
    <>
      {/* Floating Button */}
      
      <div className="fixed bottom-24 right-6">
        <button
          className="bg-green-500 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          onClick={toggleCard}
          aria-label="add"
        >
          <AddIcon />
        </button>
      </div>

      {/* Options Card */}
      {showCard && (
         <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Request Admin Assistance</h1>
        <p className="text-gray-600 mb-6">
          To add a new <strong>Doctor</strong>, <strong>Ambulance</strong>, or <strong>Medicine</strong>, please contact the admin via email.
        </p>
        <p className="text-lg font-medium text-green-600">
          📧 Email: <a href="mailto:xyz@gmail.com" className="underline">yourpharmnew@gmail.com</a>
        </p>
      </div>
    </div>
      )}
    </>
  );
}
