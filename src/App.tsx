import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import LandingPage from "./components/LandingPage/LandingPage";
import AdminParentPage from "./components/Admin/AdminParentPage";
import EmployeeParentPage from "./components/Employee/EmployeeParentPage";
import './App.css';

// const localStorageService = LocalStorageService.getService()

const apiUrl = "http://localhost:3000";

axios.interceptors.request.use(
  config => {
    console.log("Before Request..");
      
    return config
  },
  error => {
    return Promise.reject(error);
  }
)


function App() {
  return (
    <div className="App">
      <div className="row">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="admin/*" element={<AdminParentPage />} />
          <Route path="employee/*" element={<EmployeeParentPage />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
