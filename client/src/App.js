import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeComponent from "./routes/HomeComponent"
import LoginComponent from "./routes/login";
import SignupComponent from "./routes/Signup";
import LoggedInHome from "./routes/LoggedInHome.js";
import Jobs from "./routes/Jobs";
import { useCookies } from "react-cookie";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token && cookie.token !== undefined ? (
          <Routes>
            <Route path="/home" element=<LoggedInHome /> />
            <Route path="/jobs" element=<Jobs /> />
            <Route path="*" element=<LoggedInHome /> />
          </Routes>
        ) : (
          <Routes>
            <Route path="/jobs" element=<Jobs /> />
            <Route path="/home" element=<HomeComponent /> />
            <Route path="/login" element=<LoginComponent /> />
            <Route path="/signup" element=<SignupComponent /> />
            <Route path="*" element=<Navigate to="/home" /> />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
