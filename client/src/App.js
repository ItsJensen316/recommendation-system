import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ApprisalForm from "./pages/ApprisalForm";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import FacultyLoginForm from "./pages/FacultyLoginForm";
import FacultyList from "./components/FacultyList";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
// import Loading from "./components/Loading"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        {/* <Route index element={<Loading /> } /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/apprisal-from" element={<ApprisalForm />} />
        <Route path="faculty-profile" element={<FacultyLoginForm />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Navigate replace to={"faculty-list"} />} />
          <Route path="faculty-list" element={<FacultyList />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

