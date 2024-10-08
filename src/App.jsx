import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppRoutes from './routes';
import logo from './assets/logo.jpg';

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State to manage user info
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Logout function to clear the localStorage and reset user state
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/'); // Redirect to home page after logout
  };

  // On component mount, check if user is logged in by checking localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    if (token && name && role) {
      setUser({ name, role });
    }
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-600 text-white font-sans min-h-screen">
      {/* Top Section with Logo, Title, Centered Links, and Login Links */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        {/* Logo and Title Side-by-Side */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-14 w-14 mr-3 rounded-full" />
          <span className="text-2xl font-bold">Ufanisi Beach Resort</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 mb-4 md:mb-0 text-center">
          <nav className="flex justify-center space-x-8">
            <Link to="/accommodations" className="text-sm hover:underline">Accommodations</Link>
            <Link to="/offers" className="text-sm hover:underline">Offers</Link>
            <Link to="/meetings-events" className="text-sm hover:underline">Meetings & Events</Link>
            <Link to="/brands" className="text-sm hover:underline">Brands</Link>
          </nav>
        </div>

        {/* User Info and Dropdown */}
        <div className="relative">
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name}</span>
              <span 
                onClick={handleLogout} 
                className="cursor-pointer text-white hover:underline"
              >
                Logout
              </span>
            </>
          ) : (
            <span 
              onClick={toggleDropdown} 
              className="cursor-pointer text-white hover:underline"
            >
              Login
            </span>
          )}

          {/* Dropdown Menu */}
          {isDropdownOpen && !user && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg"
              onMouseLeave={closeDropdown} // Close on mouse leave
            >
              <Link 
                to="/admin/login" 
                className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
                onClick={closeDropdown} // Close on selection
              >
                Login as Admin
              </Link>
              <Link 
                to="/customer/login" 
                className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100"
                onClick={closeDropdown} // Close on selection
              >
                Login as Customer
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section for Additional Links (Optional) */}
      <div className="bg-slate-100 py-3 mt-4 rounded-lg">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
            {/* Optional additional links can go here */}
          </div>
        </div>
      </div>

      {/* Route components */}
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
