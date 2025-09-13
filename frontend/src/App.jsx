import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./pages/Loader";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";  
import Homepage from "./pages/Homepage";
import ManageAccount from "./pages/ManageAccount"; // ✅ import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/manage-account" element={<ManageAccount />} /> 
      </Routes>
    </Router>
  );
}

export default App;
