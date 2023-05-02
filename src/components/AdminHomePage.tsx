import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import AdminSidebar from "./AdminSidebar";
import ViewAllEmployees from "./ViewAllEmployees";

const AdminHomePage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');

    return (
        <>
        <LandingNavbar />
        <div className="row">
            <div className="col-md-2">
                <AdminSidebar />
            </div>
            <div className="col-md-10">
            <Routes>
                <Route path="employees/view-all" element={<ViewAllEmployees />} />
            </Routes>
                <div className="my-container shadow">
                    <h3>Admin Home</h3>
                </div>
            </div>
        </div>
        </>
    )
}
export default AdminHomePage