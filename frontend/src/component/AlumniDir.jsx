import React from "react";
import Navbar from "./Navbar";

const AlumniDir = ({ name, graduationYear, course, jobTitle, companyName }) => {
  return (
    <>
      <Navbar />
        <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8 grid grid-cols-1 md:grid-cols-3 items-center gap-8 mb-8">
          
          {/* Column 1 - Profile */}
          <div className="flex items-center gap-4">
            <img
              src="../../profile.jpg"
              alt={name}
              className="w-20 h-20 rounded-full object-cover shadow-md ring-2 ring-blue-100"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">
                {graduationYear} • {course}
              </p>
            </div>
          </div>

          {/* Column 2 - Details */}
          <div className="space-y-2">
            <p className="text-base text-gray-700">
              <span className="font-medium">Post:</span> {jobTitle}
            </p>
            <p className="text-base text-gray-700">
              <span className="font-medium">Company:</span> {companyName}
            </p>
          </div>

          {/* Column 3 - Action */}
          <div className="flex md:justify-end">
            <button className="bg-[#cfab8d] hover:bg-[#896C6C] focus:ring-[#896C6C] text-white text-sm font-medium px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-colors">
              Connect
            </button>
          </div>
        </div>
      
    </>
  );
};

export default AlumniDir;
