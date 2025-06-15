import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AmbulanceDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const fetchDetails = async (id) => {
      try {
        console.log(id)
        const res = await axios.post(
          "/api/v1/ambulance/getAmbulance",
          { id: id }
        );
        console.log(res);
        setDetails(res.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    if (id) {
      fetchDetails(id);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {" "}
      <h1 className="text-2xl font-bold mb-2">{details?.driver_name}</h1>{" "}
      <img
        src={details?.imageLink}
        className="w-full h-full object-cover"
      />{" "}
      <p className="text-lg font-semibold mb-2">Location: {details?.location}</p>{" "}
      <p className="text-lg mb-2">Distance: {details?.distance}</p>{" "}
      <p className="text-lg mb-2">Contact: {details?.contact_number}</p>{" "}
    </div>
  );
};

export default AmbulanceDetails;
