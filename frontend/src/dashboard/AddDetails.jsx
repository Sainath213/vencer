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
        console.log("patient data", patientData);
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
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Add New Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="rep"
          placeholder="Rep"
          value={patientData.rep}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={patientData.patientName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="insurance"
          placeholder="Insurance"
          value={patientData.insurance}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="benefit"
          value={patientData.benefit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Medical">Medical</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
        <input
          type="text"
          name="drug"
          placeholder="Drug"
          value={patientData.drug}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="md"
          placeholder="Doctor (MD)"
          value={patientData.md}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={patientData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
          <option value="Initiated">Initiated</option>
          <option value="Cancelled/No Go">Cancelled/No Go</option>
        </select>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="dwo"
            checked={patientData.dwo}
            onChange={handleChange}
            className="mr-2"
          />
          DWO
        </label>
        
        {/* Added labels for the two date inputs */}
        <label htmlFor="welcomeCall" className="block font-medium">
          Welcome Call Date
        </label>
        <input
          type="date"
          id="welcomeCall"
          name="welcomeCall"
          value={patientData.welcomeCall}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label htmlFor="deliveryDate" className="block font-medium">
          Delivery Date
        </label>
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={patientData.deliveryDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={patientData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
