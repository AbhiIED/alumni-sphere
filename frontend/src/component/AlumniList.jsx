import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import AlumniDir from "./AlumniDir";

const AlumniList = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/alumni")
      .then((res) => res.json())
      .then((data) => setAlumni(data))
      .catch((err) => console.error("Error fetching alumni:", err));
  }, []);
  return (
    <>
      <div className="space-y-4">
        {alumni.map((item) => (
          <div
            key={item.Alumni_ID}
            onClick={() => navigate(`/alumni/${item.Alumni_ID}`)}
            style={{ cursor: "pointer" }}
          >
            <AlumniDir
              name={item.Alumni_ID}
              graduationYear={item.Graduation_Year}
              course={`${item.Course} ${item.Department}`}
              jobTitle={item.Job_Title}
              companyName={item.Company_Name}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AlumniList;
