import React from 'react';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupNavbar from './Navbar';


function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [state, setState] = useState('');
    const [validationMessage, setValidationMessage] = useState({});
    const navigate = useNavigate();

    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const validateForm = () => {
        const errors = {};
        if (!firstName) errors.firstName = 'First Name is required.';
        if (!lastName) errors.lastName = 'Last Name is required.';
        if (!email) errors.email = 'Email is required.';
        if (!password) errors.password = 'Password is required.';
        if (password.length < 8) errors.password = 'Password must be at least 8 characters long.';
        if (!confirmpassword) errors.confirmpassword = 'Confirm Password is required.';
        if (password !== confirmpassword) errors.confirmpassword = 'Passwords do not match.';
        if (!address) errors.address = 'Address is required.';
        if (!city) errors.city = 'City is required.';
        if (!state) errors.state = 'State is required.';
        if (!zip) errors.zip = 'Zipcode is required.';
        if (!phone) errors.phone = 'Phone number is required.';

        setValidationMessage(errors);

        for (let key in errors) {
            alert(errors[key]);
            break;
        }

        return Object.keys(errors).length === 0;
    };

    const handleFormData = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
    
            const baseUrl = 'https://dreadful-catacombs-56428-6f40204a3e20.herokuapp.com';

    
        const url = `${baseUrl}/signup`; // Signup URL
        const options = {
            method: "POST",
            body: JSON.stringify({
                firstName, lastName, password, confirmpassword, address, city, phone, zip, email, companyName, userName, state
            }),
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        };
    
        try {
            const response = await fetch(url, options);
            const result = await response.json();
    
            if (response.ok) {
                alert('Signup successful!');
                navigate('/login'); // Redirect to login page on success
            } else {
                // Show validation errors from server response
                if (result.errors) {
                    result.errors.forEach(err => {
                        alert(`${err.path}: ${err.message}`);
                    });
                } else {
                    alert(result.message || 'Signup failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred. Please try again.');
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
          {/* Navbar at the top */}
          <SignupNavbar />
      
          {/* Centered Signup Form */}
          <div className="flex flex-grow items-center justify-center w-full">
            <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-md mx-4 ">
              <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Signup</h1>
              <form onSubmit={handleFormData} className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <input
                    type="text"
                    placeholder="Address"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                  <select
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    className="input-field flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="" disabled>Select a state...</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      );
      
}

export default Signup;
