// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [data, setData] = useState({
//     allPatients: [],
//     pendingPatients: [],
//     initialPatients: [],
//     deliveryDates: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:3000/api/dashboard", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("Fetched Data:", response.data);

//         const { allPatients, pendingPatients, initialPatients, deliveryDates } = response.data;

//         setData({
//           allPatients,
//           pendingPatients,
//           initialPatients,
//           deliveryDates,
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         setError("Failed to load dashboard data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => navigate("/add-patient")}
//           className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
//         >
//           Add Patient
//         </button>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         {/* All Patients */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">All Patients</h2>
//           {data.allPatients.length > 0 ? (
//             data.allPatients.map((patient, index) => (
//               <div key={index} className="border-b border-gray-200 py-2">
//                 {patient.patientName} - {patient.insurance}
//               </div>
//             ))
//           ) : (
//             <p>No patients available</p>
//           )}
//         </div>

//         {/* Patients Pending Approval */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Patients Pending Approval</h2>
//           {data.pendingPatients.length > 0 ? (
//             data.pendingPatients.map((patient, index) => (
//               <div key={index} className="border-b border-gray-200 py-2">
//                 {patient.patientName} - {patient.insurance}
//               </div>
//             ))
//           ) : (
//             <p>No patients pending approval</p>
//           )}
//         </div>

//         {/* Initial Patients */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Initial Patients</h2>
//           {data.initialPatients.length > 0 ? (
//             data.initialPatients.map((patient, index) => (
//               <div key={index} className="border-b border-gray-200 py-2">
//                 {patient.patientName} - {patient.drug}
//               </div>
//             ))
//           ) : (
//             <p>No initial patients</p>
//           )}
//         </div>

//         {/* Delivery Date */}
//         <div className="p-4 bg-white rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Delivery Date</h2>
//           {data.deliveryDates.length > 0 ? (
//             data.deliveryDates.map((patient, index) => (
//               <div key={index} className="border-b border-gray-200 py-2">
//                 {patient.patientName} -{" "}
//                 {new Date(patient.deliveryDate).toLocaleDateString()}
//               </div>
//             ))
//           ) : (
//             <p>No scheduled deliveries</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation

const Dashboard = () => {
  const [data, setData] = useState({
    allPatients: [],
    pendingPatients: [],
    initialPatients: [],
    deliveryDates: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Data:", response.data);

        const { allPatients, pendingPatients, initialPatients, deliveryDates } = response.data;

        setData({
          allPatients,
          pendingPatients,
          initialPatients,
          deliveryDates,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/add-patient")}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Add Patient
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* All Patients */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">All Patients</h2>
          {data.allPatients.length > 0 ? (
            data.allPatients.map((patient, index) => (
              <div key={index} className="border-b border-gray-200 py-2">
                <Link
                  to={`/patient/${patient._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {patient.patientName}
                </Link>{" "}
                - {patient.insurance}
              </div>
            ))
          ) : (
            <p>No patients available</p>
          )}
        </div>

        {/* Patients Pending Approval */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Patients Pending Approval</h2>
          {data.pendingPatients.length > 0 ? (
            data.pendingPatients.map((patient, index) => (
              <div key={index} className="border-b border-gray-200 py-2">
                <Link
                  to={`/patient/${patient._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {patient.patientName}
                </Link>{" "}
                - {patient.insurance}
              </div>
            ))
          ) : (
            <p>No patients pending approval</p>
          )}
        </div>

        {/* Initial Patients */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Initial Patients</h2>
          {data.initialPatients.length > 0 ? (
            data.initialPatients.map((patient, index) => (
              <div key={index} className="border-b border-gray-200 py-2">
                <Link
                  to={`/patient/${patient._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {patient.patientName}
                </Link>{" "}
                - {patient.drug}
              </div>
            ))
          ) : (
            <p>No initial patients</p>
          )}
        </div>

        {/* Delivery Date */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Delivery Date</h2>
          {data.deliveryDates.length > 0 ? (
            data.deliveryDates.map((patient, index) => (
              <div key={index} className="border-b border-gray-200 py-2">
                <Link
                  to={`/patient/${patient._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {patient.patientName}
                </Link>{" "}
                - {new Date(patient.deliveryDate).toLocaleDateString()}
              </div>
            ))
          ) : (
            <p>No scheduled deliveries</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
