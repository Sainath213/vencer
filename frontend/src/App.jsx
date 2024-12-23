// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Signup from "./register/Signup";
// import Login from "./login/login";
// import AddPatients from "./dashboard/AddDetails";
// import Dashboard from "./dashboard/dashboard1";
// import ProtectedRoute from "./protected/ProtectedRoute"; // Import ProtectedRoute

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Signup />} />
//           <Route path="/login" element={<Login />} />

//           {/* Protected Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/home" element={<Dashboard />} />
//             <Route path="/add-patient" element={<AddPatients />} />
//           </Route>

//           {/* Fallback Route */}
//           <Route path="*" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./register/Signup";
import Login from "./login/login";
import AddPatients from "./dashboard/AddDetails";
import Dashboard from "./dashboard/dashboard1";
import PatientDetails from "./dashboard/PatientDetails"; // Import new PatientDetails component
import ProtectedRoute from "./protected/ProtectedRoute"; // Import ProtectedRoute
import CalendarFeature from "./calender";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/calender" element={<CalendarFeature/>}/>
          <Route path="/login" element={<Login />} />

          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/add-patient" element={<AddPatients />} />
            <Route path="/patient/:id" element={<PatientDetails />} /> 
            
          </Route>

          
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

