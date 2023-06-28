import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import useHttp from "./Config/https";
import Loader from "./components/Loaders/Loader";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminParentPage from "./components/Admin/AdminParentPage";
import EmployeeParentPage from "./components/Employee/EmployeeParentPage";
import ProtectedAdmin from "./components/ProtectedRouting/ProtectedAdmin";
import ProtectedEmployee from "./components/ProtectedRouting/ProtectedEmployee";
import ProtectedLandingPage from "./components/ProtectedRouting/ProtectedLandingPage";

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
