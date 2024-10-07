import React, { useState } from 'react';
import axios from 'axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message on input change
  };

  const validatePhoneNumber = (phone) => {
    // Check if the phone number is 12 digits long and starts with 254
    const phoneRegex = /^254\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!validatePhoneNumber(formData.phone_number)) {
      setError('Phone number must be 12 digits long and start with 254.');
      return;
    }

    try {
      const response = await axios.post('/api/admin/signup', formData);
      setSuccessMessage('Admin account created successfully!'); // Set success message
      console.log('Response:', response.data);
      // Optionally reset form fields
      setFormData({
        name: '',
        email: '',
        password: '',
        phone_number: '',
      });
    } catch (err) {
      setError('Failed to create admin account. Please try again.'); // Set error message
      console.error('Error:', err);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone_number: '',
    });
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-70px)] bg-gray-100 py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Signup</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="254XXXXXXXXX" // Optional placeholder for clarity
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 hover:bg-blue-600"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="ml-2 w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition duration-200 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
