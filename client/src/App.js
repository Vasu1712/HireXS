import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeComponent from "./routes/HomeComponent"

function App() {
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
