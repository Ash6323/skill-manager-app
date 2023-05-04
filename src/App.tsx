import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminParentPage from "./components/Admin/AdminParentPage";
import EmployeeParentPage from "./components/Employee/EmployeeParentPage";
import './App.css';
import axios from 'axios';
import Loader from './components/Loader/Loader'

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        console.log("Before Request..");
        // document.body.classList.add("loading-indicator");
        setLoading(true);
        return config;
      },
      function (error) {
        console.log("Error Before Request");
        setLoading(false);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        console.log("After Request..");
        // document.body.classList.remove("loading-indicator");
        setLoading(false);
        return response;
      },
      function (error) {
        console.log("Error After Request");
        setLoading(false);
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <div className="App">
      {loading? <Loader />:""}
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
