import React from 'react';

const LoginNavbar = () => {
    
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
          
        </div>
      </div>
    </nav>
  );
};

export default LoginNavbar;
