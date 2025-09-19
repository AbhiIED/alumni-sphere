import AlumniList from "../component/AlumniList";
import React from "react";
import { Link } from "react-router-dom";

const Directory = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="pt-16 px-4 mt-4"> {/* 👈 push content below sticky navbar */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Alumni Directory
        </h1>

        {/* Alumni List */}
        <AlumniList />
      </div>
    </>
  );
};

export default Directory;
