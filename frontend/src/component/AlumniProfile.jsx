import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AlumniProfile = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/alumni")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.Alumni_ID === id);
        setAlumni(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!alumni) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#BBDCE5]">
        <div className="text-lg font-medium text-gray-700 animate-pulse">
          Loading alumni profile…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#BBDCE5] py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-6 p-8 border-b bg-[#F5F8FA]">
          <img
            src="/profile.jpg"
            alt={alumni.Alumni_ID}
            className="w-28 h-28 rounded-full object-cover shadow-md ring-4 ring-blue-100"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {alumni.Alumni_ID}
            </h1>
            <p className="text-gray-500 text-sm">
              {alumni.Graduation_Year} • {alumni.Course} {alumni.Department}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Job Title</h3>
            <p className="text-gray-600">{alumni.Job_Title}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Company</h3>
            <p className="text-gray-600">{alumni.Company_Name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Current City
            </h3>
            <p className="text-gray-600">{alumni.Current_City}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
            <p className="text-gray-600">{alumni.Skills}</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 border-t flex justify-end bg-[#F5F8FA]">
          <button className="bg-[#cfab8d] hover:bg-[#896C6C] focus:ring-[#896C6C] text-white text-sm font-medium px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-colors">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;
