import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const RoomDetails = () => {
  const { state } = useLocation();
  const { room, services } = state;

  const [selectedServices, setSelectedServices] = useState(
    services.map((service) => ({
      ...service,
      number_of_times: 0, // Start from 0
    }))
  );

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone_number: "",
    check_in: "",
    check_out: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Set the check-in date to today
    const today = new Date().toISOString().split("T")[0];
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      check_in: today,
      check_out: today, // Set checkout to today initially
    }));
  }, []);

  const incrementService = (id) => {
    setSelectedServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, number_of_times: service.number_of_times + 1 }
          : service
      )
    );
  };

  const decrementService = (id) => {
    setSelectedServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id && service.number_of_times > 0 // Allow decrement only if > 0
          ? { ...service, number_of_times: service.number_of_times - 1 }
          : service
      )
    );
  };

  const calculateTotal = () => {
    const serviceTotal = selectedServices.reduce(
      (total, service) => total + service.price * service.number_of_times,
      0
    );

    // Calculate number of days for the stay
    const checkInDate = new Date(customerDetails.check_in);
    const checkOutDate = new Date(customerDetails.check_out);
    const numberOfDays = Math.max(0, (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    // Calculate total amount
    return room.price_per_night * numberOfDays + serviceTotal;
  };

  const isPhoneNumberValid = (phone) => {
    return /^254[0-9]{10}$/.test(phone); // Phone should start with 254 and have 12 digits
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dates
    if (new Date(customerDetails.check_out) <= new Date(customerDetails.check_in)) {
      setErrorMessage("Check-out date must be after check-in date.");
      return;
    }

    // Validate phone number
    if (!isPhoneNumberValid(customerDetails.phone_number)) {
      setErrorMessage("Phone number must start with 254 and be 12 digits long.");
      return;
    }

    const reservationData = {
      ...customerDetails,
      room_id: room.id,
      services: selectedServices.map((service) => ({
        service_id: service.id,
        number_of_times: service.number_of_times,
      })),
    };

    try {
      const response = await axios.post("/api/room/reservation", reservationData);
      console.log("Reservation successful:", response.data);
      // Optionally reset form or redirect
    } catch (error) {
      setErrorMessage("Error making reservation. Please try again.");
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="mx-auto bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* First Column: Room Image */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl text-black font-bold mb-4">
            {room.room_type} - Room {room.room_number}
          </h2>
          <img
            src={room.image_url}
            alt={`Room ${room.room_number}`}
            className="w-full h-60 sm:h-80 object-cover mb-4 rounded-lg"
          />
          <div className="text-red-500 font-sans text-bold">Capacity: {room.capacity} Persons</div>
          <div className="text-black mt-3 text-bold">Features: {room.features}</div>
          <p className="text-lg mt-5 font-semibold text-black">Price: Ksh. {room.price_per_night}</p>
        </div>
        
        {/* Middle Column: Services */}
        <div className="text-center overflow-y-auto h-80 sm:w-60">
          <h3 className="text-2xl text-black font-bold mb-4">Available Services</h3>
          <ul className="mb-6">
            {selectedServices.map((service, index) => (
              <li key={service.id} className="flex justify-between text-black items-center mb-4 ml-6 border-b border-gray-300 pb-2">
                <span className="flex-grow text-left">{index + 1}. {service.service_name} - Ksh. {service.price}</span>
                <button
                  onClick={() => decrementService(service.id)}
                  className="px-3 py-1 bg-red-600 rounded-full mr-2"
                  aria-label={`Decrease ${service.service_name} quantity`}
                >
                  -
                </button>
                <span>{service.number_of_times}</span>
                <button
                  onClick={() => incrementService(service.id)}
                  className="px-3 py-1 bg-green-600 rounded-full ml-2"
                  aria-label={`Increase ${service.service_name} quantity`}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Last Column: Form */}
        <div className="space-y-4 sm:w-72">
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={customerDetails.name}
                onChange={(e) =>
                  setCustomerDetails({ ...customerDetails, name: e.target.value })
                }
                required
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md"
                aria-label="Customer name"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={customerDetails.email}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    email: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md"
                aria-label="Customer email"
              />
            </div>

            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone Number (254XXXXXXXXXX)"
                value={customerDetails.phone_number}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    phone_number: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md"
                aria-label="Customer phone number"
              />
            </div>

            <div className="mb-4">
              <input
                type="date"
                placeholder="Check-in Date"
                value={customerDetails.check_in}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    check_in: e.target.value,
                  })
                }
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md"
                aria-label="Check-in date"
              />
            </div>

            <div className="mb-4">
              <input
                type="date"
                placeholder="Check-out Date"
                value={customerDetails.check_out}
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    check_out: e.target.value,
                  })
                }
                required
                min={customerDetails.check_in} // Ensure check-out is after check-in
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md"
                aria-label="Check-out date"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Total Amount: Ksh. {Math.floor(calculateTotal())} 
              </label>
            </div>

            <button
              type="submit"
              className="bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Reserve Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
