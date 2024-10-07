import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
  });

  const [step, setStep] = useState(1); 
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); 
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/admin/login', {
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage('OTP sent to your email!'); 
      setStep(2); 
      console.log('Response:', response.data);
    } catch (err) {
      setError('Failed to send OTP. Please check your credentials and try again.'); 
      console.error('Error:', err);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/admin/verify-otp', {
        email: formData.email,
        otp: formData.otp,
      });
      setSuccessMessage('Logged in successfully!'); // Set success message
      console.log('Response:', response.data);
      // Here, you can redirect the admin or perform additional actions upon successful login
    } catch (err) {
      setError('Failed to verify OTP. Please try again.'); // Set error message
      console.error('Error:', err);
    }
  };

  const handleCancel = () => {
    setFormData({
      email: '',
      password: '',
      otp: '',
    });
    setError('');
    setSuccessMessage('');
    setStep(1); // Reset to step 1
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-130px)] bg-gray-100 py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{step === 1 ? 'Admin Login' : 'Enter OTP'}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        
        {step === 1 ? (
          <form onSubmit={handleLoginSubmit}>
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 hover:bg-blue-600"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={handleCancel}
          className="mt-4 w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition duration-200 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
