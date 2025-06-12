import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
// import Section from "../components/Section";
// import { useLocalStorageState } from "../hooks/useLocalStorageState";

function Admin() {
  const [facultiesData, setFacultiesData] = useState([]);
  // const [usersData, setUsersData] = useLocalStorageState([], "UserData");
  // console.log("admin:", usersData);

  // useEffect(() => {
  //   async function fetchFaculty() {
  //     const res = await fetch("http://localhost:8000/faculty");
  //     const faculties = await res.json();
  //     setFacultiesData(faculties);
  //     console.log(faculties);
  //   }
  //   fetchFaculty();
  // }, []);

  return (
    <>
      <NavBar />
      <Outlet/>
    </>
  );
}

export default Admin;
