import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import useHttp from "./config/https";
import Loader from "./components/loaders/Loader";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import AdminParentPage from "./components/Admin/AdminParentPage";
import EmployeeParentPage from "./components/employee/EmployeeParentPage";
import ProtectedAdmin from "./components/protectedRouting/ProtectedAdmin";
import ProtectedEmployee from "./components/protectedRouting/ProtectedEmployee";
import ProtectedLandingPage from "./components/protectedRouting/ProtectedLandingPage";

function App() {
  
  const {axiosInstance, loading} = useHttp();
  
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
