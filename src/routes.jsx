import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';  // Import your components here
import AdminSignup from './components/AdminSignUp';
import AdminLogin from './components/AdminLogin';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminsign" element={<AdminSignup />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/rooms" element={<RoomList />} />
      <Route path="/roomdetails/:id" element={<RoomDetails />} />




     
    </Routes>
  );
};

export default AppRoutes;
