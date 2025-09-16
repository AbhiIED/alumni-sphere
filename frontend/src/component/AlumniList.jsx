import React, { useEffect, useState } from "react";
import AlumniDir from "./AlumniDir";

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/alumni") // ✅ backend runs on port 5000
      .then((res) => res.json())
      .then((data) => setAlumni(data))
      .catch((err) => console.error("Error fetching alumni:", err));
  }, []);

  return (
    <div className="space-y-4">
      {alumni.map((item) => (
        <AlumniDir
          key={item.Alumni_ID}
          name={`${item.User_Fname} ${item.User_Lname}`}   // ✅ full name
          graduationYear={item.End_Year}                  // ✅ fix field name
          course={item.Course}                            // ✅ just course for now
          jobTitle={item.Job_Title}
          companyName={item.Company_Name}
        />
      ))}
    </div>
  );
};

export default AlumniList;
