import React from "react";
import img from "../Images/logo.png";

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#BBDCE5]">
      <div className="bg-[#F5EFE6] p-10 rounded-xl shadow-lg w-150 h-150 text-center">
        <div className="flex justify-center items-center ">
          <div className="mt-4 mb-10  flex items-center justify-center relative">
            <img src={img} alt="Logo" className="object-fill h-50 w-50" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-3">Welcome To AlumniSphere</h1>
        <p className="text-sm text-gray-600 mb-6 mt-10">
          Reconnect with your peers, celebrate milestones, and unlock exclusive
          opportunities across our alumni community.
        </p>
        <div className="flex gap-3 mb-6 mt-4">
          <button className="flex-1 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition">
            Log In
          </button>
          <a href="" ></a>
          <button className="flex-1 border border-blue-900 text-blue-900 py-2 rounded-lg hover:bg-blue-50 transition">
            Sign Up
          </button>
        </div>
        <p className="text-xs  text-gray-500 mt-5">
          New here?{" "}
          <a href="#" className="text-blue-900 hover:underline font-medium">
            Create your alumni account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Loader;
