import { useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import Loader from "./Loader";
import { useNavigate } from 'react-router-dom';
import UserContext from "../Context/User/UserContext";
function Emergency() {
  const [doctors, setDoctors] = useState([]);
  const navigate= useNavigate()
  const {UserDetails } = useContext(UserContext);
  const handleClick=(id)=>{
    //  console.log(id);
     navigate(`/doctor_details/${id}`)
  }
  const socket = useMemo(() => {
    return io("",{
     query:{
      user:JSON.stringify(UserDetails)
     }
    });
  }, []);

  useEffect(() => {
    socket.on("new-user", (users) =>{
      setDoctors(users)
      console.log(users[0].doctorId)
    } 
    );
      
     return () => {
      socket.off("new-user");
    };
  }, [socket]);

  return (
  	<>
      <h1 className="font-bold text-center text-2xl">Live Doctors for Help!</h1>{" "}
      <br />
      <div className="grid grid-cols-[repeat(auto-fill,_300px)] justify-around gap-y-2.5">
        {doctors.length === 0 ? (
          <Loader />
        ) : (
          <>
            {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="w-64 p-4 bg-white rounded-lg shadow-lg"
                  onClick={()=>handleClick(doctor?.doctorId?._id)}
                >
                  {/* Doctor's Name */}
                  <div className="mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {doctor?.doctorId?.name}
                    </h2>
                  </div>

                  {/* Doctor's Image */}
                  <div className="h-40 bg-gray-300 rounded-md overflow-hidden mb-4">
                    <img
                      src={doctor?.doctorId?.imageLink || "default-image.jpg"} // Fallback for missing image
                      alt={doctor?.doctorId.title || "Doctor Image"} // Fallback for missing title
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Specialization */}
                  <div>
                    <p className="text-sm text-gray-600">
                      {doctor?.doctorId?.specialization}
                    </p>

                  {/* Connected Button */}
              <button
                className="mt-2 px-4 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent onClick
                  window.open(doctor?.doctorId?. userJoiningLink,'_blank')
                }}
              >
                Connected
              </button>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default Emergency;
