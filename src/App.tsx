import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import AdminParentPage from "./pages/admin/AdminParentPage";
import EmployeeParentPage from "./pages/employee/EmployeeParentPage";
import ProtectedAdmin from "./protectedRouting/ProtectedAdmin";
import ProtectedEmployee from "./protectedRouting/ProtectedEmployee";
import ProtectedLandingPage from "./protectedRouting/ProtectedLandingPage";

function App() {
  
  return (
    <div className="App">
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
