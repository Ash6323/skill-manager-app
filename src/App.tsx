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
import Protected from './components/Protected/Protected';

function App() {

  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("User") || '{}');

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        console.log("Before Request..");
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
          <Route path="admin/*" element={ <Protected> <AdminParentPage /> </Protected>} />
          <Route path="employee/*" element={ <Protected> <EmployeeParentPage /> </Protected>} />
        </Routes>
        {/* {user.role?
        (
          <>
          {user.role == "Employee"? <EmployeeParentPage /> : (user.role =="Admin" ? <AdminParentPage /> : <p>Unknown</p>)}
          </>
        ):<LandingPage />} */}
      </div>
    </div>
  );
}
export default App;
