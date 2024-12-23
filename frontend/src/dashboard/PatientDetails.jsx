import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/patients/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatient(response.data.patient);
        setUpdatedData(response.data.patient); // Initialize the form with fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setError("Failed to load patient details");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/api/patients/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatient(updatedData); // Update patient state
      setEditMode(false); // Exit edit mode
      alert("Patient details updated successfully!");
    } catch (error) {
      console.error("Error updating patient details:", error);
      alert("Failed to update patient details.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Patient deleted successfully!");
        navigate("/home"); // Redirect to the home page after deletion
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Failed to delete patient.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Patient Details</h1>
      {!editMode ? (
        <div className="space-y-2">
          <p><strong>Rep:</strong> {patient.rep || "N/A"}</p>
          <p><strong>Name:</strong> {patient.patientName || "N/A"}</p>
          <p><strong>Insurance:</strong> {patient.insurance || "N/A"}</p>
          <p><strong>Benefit:</strong> {patient.benefit || "N/A"}</p>
          <p><strong>Drug:</strong> {patient.drug || "N/A"}</p>
          <p><strong>MD:</strong> {patient.md || "N/A"}</p>
          <p><strong>Status:</strong> {patient.status || "N/A"}</p>
          <p>
            <strong>Delivery Date:</strong>{" "}
            {patient.deliveryDate
              ? new Date(patient.deliveryDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Welcome Call:</strong>{" "}
            {patient.welcomeCall
              ? new Date(patient.welcomeCall).toLocaleDateString()
              : "N/A"}
          </p>
          <p><strong>DWO:</strong> {patient.dwo ? "Yes" : "No"}</p>
          <p><strong>Notes:</strong> {patient.notes || "N/A"}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
            >
              Edit Details
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {[
            { label: "Rep", key: "rep" },
            { label: "Name", key: "patientName" },
            { label: "Insurance", key: "insurance" },
            { label: "Benefit", key: "benefit" },
            { label: "Drug", key: "drug" },
            { label: "MD", key: "md" },
            {
              label: "Status",
              key: "status",
              type: "select",
              options: [
                { value: "Approved", label: "Approved" },
                { value: "Denied", label: "Denied" },
                { value: "Initiated", label: "Initiated" },
                { value: "Cancelled/No Go", label: "Cancelled/No Go" },
              ],
            },
            { label: "Delivery Date", key: "deliveryDate", type: "date" },
            { label: "Welcome Call", key: "welcomeCall", type: "date" },
            { label: "Notes", key: "notes", type: "textarea" },
            { label: "DWO", key: "dwo", type: "checkbox" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block font-semibold mb-1">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  value={updatedData[field.key] || ""}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, [field.key]: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={updatedData[field.key] || false}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, [field.key]: e.target.checked })
                  }
                  className="p-2"
                />
              ) : field.type === "select" ? (
                <select
                  value={updatedData[field.key] || ""}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, [field.key]: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  value={
                    field.type === "date" && updatedData[field.key]
                      ? updatedData[field.key].split("T")[0]
                      : updatedData[field.key] || ""
                  }
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, [field.key]: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              )}
            </div>
          ))}
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
