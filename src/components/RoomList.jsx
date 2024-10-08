import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch rooms and services data from the API when the component mounts
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/all");
        setRooms(response.data.data); // Assuming rooms are inside response.data.data
        setLoading(false);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      }
    };

    const fetchServices = async () => {
      try {
        const serviceResponse = await axios.get("/api/services/all");
        setServices(serviceResponse.data.data); // Assuming services are inside response.data.data
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchRooms();
    fetchServices();
  }, []);

  const handleRoomClick = (room) => {
    // Navigate to the RoomDetails component, passing room and services data
    navigate(`/roomdetails/${room.id}`, { state: { room, services } });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl text-black font-sans font-bold mb-8 text-center">Our Rooms</h1>

      {loading ? (
        <div className="text-center">
          <p className="text-xl text-gray-500">Loading rooms...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => handleRoomClick(room)}
              className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={room.image_url}
                alt={`Room ${room.room_number}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-2">
                  {room.room_type} - Room {room.room_number}
                </h2>
                <p className="text-gray-600 mb-2">Capacity: {room.capacity} persons</p>
                <p className="text-green-600 font-bold text-lg mb-2">
                  $ {room.price_per_night} / night
                </p>
                <p className="text-gray-600 mb-2">Features: {room.features}</p>

                {room.status === "1" ? (
                  <p className="text-sm text-white bg-green-500 px-3 py-1 rounded-full inline-block font-semibold">
                    Available
                  </p>
                ) : (
                  <p className="text-sm text-white bg-red-500 px-3 py-1 rounded-full inline-block font-semibold">
                    Unavailable
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
