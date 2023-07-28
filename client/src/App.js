import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeComponent from "./routes/HomeComponent"
import LoginComponent from "./routes/login";
import SignupComponent from "./routes/Signup";

function App() {
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element=<HomeComponent /> />
          <Route path="/login" element=<LoginComponent /> />
          <Route path="/signup" element=<SignupComponent /> />
          <Route path="*" element=<Navigate to="/home" /> />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
