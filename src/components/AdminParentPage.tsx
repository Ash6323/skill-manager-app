import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import AdminSidebar from "./AdminSidebar";
import ViewAllEmployees from "./ViewAllEmployees";
import AdminHomePage from './AdminHomePage';
import AddEmployee from './AddEmployee';

const AdminParentPage = () => {

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
                <Route path="home" element={<AdminHomePage />} />
                <Route path="employees/add-new" element={<AddEmployee />} />
                <Route path="employees/view-all" element={<ViewAllEmployees />} />
            </Routes>
            </div>
        </div>
        </>
    )
}
export default AdminParentPage