import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate();
    const handleLogin=()=>{
        navigate("/login");
    }
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo/Image on the left */}
        <div className="flex items-center space-x-2">
          {/* <img 
            src="path/to/your-logo.png" 
            alt="Logo" 
            className="h-8 w-8"
          /> */}
          <span className="text-lg font-semibold">MyApp</span>
        </div>

        {/* Login button on the right */}
        <div>
          <button onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
