import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Homepage from "./pages/Homepage";
import ManageAccount from "./pages/ManageAccount"; // ✅ import
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/manage-account" element={<ManageAccount />} /> {/* ✅ new route */}
      </Routes>
    </Router>
  );
}

export default App;
