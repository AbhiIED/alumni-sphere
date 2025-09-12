import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signin from "./pages/Signin";
// import Homepage from "./pages/Homepage";
// import Loader from "./pages/Loader";
import NewsDetails from "./pages/NewsDetails";

function App() {
  return (
    <div>
      <NewsDetails />
      {/* <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router> */}

      {/* Render Loader page */}
      {/* <Loader /> */}
      {/* <Homepage /> */}
    </div>
  );
}

export default App;
