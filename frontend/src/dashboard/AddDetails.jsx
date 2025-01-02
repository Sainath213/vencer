import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // For decoding JWT token

const AddPatient = () => {
  const [patientData, setPatientData] = useState({
    rep: "",
    patientName: "",
    insurance: "",
    benefit: "Medical",
    drug: "",
    md: "",
    status: "Initiated",
    welcomeCall: "",
    dwo: false,
    deliveryDate: "",
    notes: "",
  });

  const [userId, setUserId] = useState(""); // To store userId extracted from JWT
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";

  // Extract userId from token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId); // Extract userId from decoded token
      } catch (error) {
        console.error("Error decoding token:", error);
        alert("Session expired. Please log in again.");
        navigate("/login"); // Redirect to login page if token is invalid
      }
    } else {
      alert("No token found. Please log in.");
      navigate("/login"); // Redirect if token is missing
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/initialReferral/users/${userId}/referrals`,
        patientData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Patient added successfully!");
      navigate("/home"); // Redirect back to home page
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient. Please try again.");
    }
  };

  return (
    <div className="p-8 mt-6 max-w-4xl mx-auto bg-gradient-to-r from-blue-100 to-blue-200 shadow-2xl rounded-3xl">
      <h1 className="text-3xl font-bold text-center text-white-600 mb-6">Add New Patient</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            name="rep"
            placeholder="Rep"
            value={patientData.rep}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={patientData.patientName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="insurance"
            placeholder="Insurance"
            value={patientData.insurance}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <select
            name="benefit"
            value={patientData.benefit}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Medical">Medical</option>
            <option value="Pharmacy">Pharmacy</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            name="drug"
            placeholder="Drug"
            value={patientData.drug}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="md"
            placeholder="Doctor (MD)"
            value={patientData.md}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <select
            name="status"
            value={patientData.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
            <option value="Initiated">Initiated</option>
            <option value="Cancelled/No Go">Cancelled/No Go</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="dwo"
            checked={patientData.dwo}
            onChange={handleChange}
            className="h-5 w-5 text-blue-500 focus:ring-blue-400"
          />
          <span className="ml-2">DWO</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Welcome Call Date</label>
          <input
            type="date"
            name="welcomeCall"
            value={patientData.welcomeCall}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            value={patientData.deliveryDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-2">
          <textarea
            name="notes"
            placeholder="Notes"
            value={patientData.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
