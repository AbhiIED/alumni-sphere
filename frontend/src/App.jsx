import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loader from "./pages/Loader";
// import Signin from "./pages/Signin";
// import Homepage from "./pages/Homepage";

function App() {
  return (
    <div>
      {/* Uncomment this section to enable routing */}
      {/* 
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router> 
      */}

      {/* Render Loader page */}
      <Loader />
    </div>
  );
}

export default App;
