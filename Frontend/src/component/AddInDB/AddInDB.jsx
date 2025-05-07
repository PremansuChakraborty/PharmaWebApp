import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
export default function AddInDB() {
  const [showCard, setShowCard] = useState(false);
  const navigate=useNavigate()

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
        <div className="fixed bottom-40 right-6 w-36 shadow-lg rounded-lg p-2 z-50 bg-green-500">
          <div className='bg-white'>
            <h6 className="text-lg font-bold mb-3 ">Options</h6>
            <hr className="bg-green-500 h-2" />
            <p className="text-sm cursor-pointer mb-2 hover:text-green-500"
            onClick={()=>navigate('/add_new_doctor')}>
              Doctor
            </p>
            <p className="text-sm cursor-pointer mb-2 hover:text-green-500"
             onClick={()=>navigate('/add_new_medicine')}>
              Medicine
            </p>
            <p className="text-sm cursor-pointer mb-2 hover:text-green-500"
            onClick={()=>navigate('/add_new_ambulance')}>
              Ambulance
            </p>
          </div>
        </div>
      )}
    </>
  );
}
