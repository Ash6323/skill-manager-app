import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminParentPage from "./components/Admin/AdminParentPage";
import EmployeeParentPage from "./components/Employee/EmployeeParentPage";
import ProtectedAdmin from "./components/ProtectedRouting/ProtectedAdmin";
import ProtectedEmployee from "./components/ProtectedRouting/ProtectedEmployee";
import ProtectedLandingPage from "./components/ProtectedRouting/ProtectedLandingPage";

function App() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("User") || "{}");

  axios.interceptors.request.use(
    config => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      console.log(token);
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      setLoading(false);
      return response;
    },
    function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  return (
    <div className="App">
      {loading ? <Loader /> : ""}
      <div className="row">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedLandingPage>
                {" "}
                <LandingPage />{" "}
              </ProtectedLandingPage>
            }
          />
          <Route
            path="admin/*"
            element={
              <ProtectedAdmin>
                {" "}
                <AdminParentPage />{" "}
              </ProtectedAdmin>
            }
          />
          <Route
            path="employee/*"
            element={
              <ProtectedEmployee>
                {" "}
                <EmployeeParentPage />{" "}
              </ProtectedEmployee>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
export default App;
