import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Signin from "./pages/Signin";
import Homepage from "./pages/Homepage";
function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}
export default App;
