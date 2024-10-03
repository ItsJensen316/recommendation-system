import { useEffect, useState } from "react";
import FacultyStrip from "./FacultyStrip";

function FacultyList() {
  const [facultiesData, setFacultiesData] = useState([]);
  // const [usersData, setUsersData] = useLocalStorageState([], "UserData");
  // console.log("admin:", usersData);

  useEffect(() => {
    async function fetchFaculty() {
      const res = await fetch("http://localhost:8000/faculty");
      const faculties = await res.json();
      setFacultiesData(faculties);
      console.log(faculties);
    }
    fetchFaculty();
  }, []);

  return (
    <>
      <ul className="mx-60 mt-10 mb-28 list-none">
        {facultiesData.map((faculty, index) => (
          <FacultyStrip key={index} faculty={faculty} />
        ))}
      </ul>
    </>
  );
}

export default FacultyList;
