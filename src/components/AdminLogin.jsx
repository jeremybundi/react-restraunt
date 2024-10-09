import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/store';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

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
    } catch (err) {
      setError('Failed to send OTP. Please check your credentials and try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/verify-otp', {
        email: formData.email,
        otp: formData.otp,
      });

      // Assuming the response contains token, name, and role
      const { token, name, role } = response.data;

      // Save token, name, and role to Redux store
      dispatch(setAuth({ token, name, role }));

      setSuccessMessage('Logged in successfully!');

      // Navigate to home component after successful login
      navigate('/'); // Add this line to navigate to the home page
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    }
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
              className="w-full bg-lime-950 text-white font-semibold py-2 px-4 font-sans rounded-md transition duration-200 hover:bg-lime-600"
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
              className="w-full bg-lime-950 text-white font-semibold py-2 px-4 font-sans rounded-md transition duration-200 hover:bg-lime-400"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Links for Register and Forgot Password */}
        <div className="flex justify-between mt-4">
          <a href="/admin/sign" className="text-blue-800 italic font-bold hover:underline">Register Now!</a>
          <a href="/forgot-password" className="text-red-600 italic font-sm hover:underline">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
