import AlumniList from "../component/AlumniList";
import Navbar from "../component/Navbar";
import AlumniProfile from "../component/AlumniProfile";
import { Routes, Route } from "react-router-dom";
const Directory = () => {
  return (
    <>
      <Navbar />
      {/* Page Heading */}
      <div className="pt-16 px-4 mt-4">
        {" "}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Alumni Directory
        </h1>
        <Routes>
          <Route index element={<AlumniList />} />
          <Route path=":id" element={<AlumniProfile />} />
        </Routes>
      </div>
    </>
  );
};

export default Directory;
