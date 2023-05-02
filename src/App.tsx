import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Navbar from "./components/LandingNavbar";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AdminHomePage from "./components/AdminHomePage";
import EmployeeHomePage from "./components/EmployeeHomePage";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="admin/home/*" element={<AdminHomePage />} />
            <Route path="employee/home/*" element={<EmployeeHomePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
