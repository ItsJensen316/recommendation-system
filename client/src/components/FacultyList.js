import { useEffect, useState } from "react";
import FacultyStrip from "./FacultyStrip";
import axios from "axios";

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [facultiesData, setFacultiesData] = useState([]);
  // const [usersData, setUsersData] = useLocalStorageState([], "UserData");
  // console.log("admin:", usersData);

  const fetchFacultiesData = (faculties) => {
    // faculties.map((faculty) => fetchFacultyData(faculty));
  };

  const fetchFacultyData = async (faculty) => {
    // await axios.get(`http://localhost:5000/faculty-list`);
  };

  useEffect(() => {
    async function fetchFaculty() {
      const response = await axios.get(`http://localhost:5000/faculty-list`);
      setFaculties(response.data);
      
    }
    fetchFaculty();
  }, []);

  return (
    <>
      <ul className="mx-60 mt-10 mb-28 list-none">
        {faculties.map((faculty, index) => (
          <FacultyStrip key={index} faculty={faculty} />
        ))}
      </ul>
    </>
  );
}

export default FacultyList;
