import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Routes, Route } from "react-router-dom";
import Navbar from "../common/Navbar";
import AdminSidebar from "./AdminSidebar";
import ViewAllEmployees from "./ViewAllEmployees";
import AddEmployee from './AddEmployee';
import ViewAllSkills from "./ViewAllSkills";
import { useEffect, useState } from 'react';
import AdminHomePage from './AdminHomePage';
import Profile from '../common/Profile';

const AdminParentPage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const [userName, setUserName] = useState<string>("");
    
    useEffect( () => {
        setUserName(user.userFullName);
    },[]);

    return (
        <>
        <Navbar userFullName={userName}/>
        <div className="d-flex">
            <div className="col-md-2">
                <AdminSidebar />
            </div>
            <div className="col-md-10">
            <Routes>
                <Route path="home" element={<AdminHomePage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="employees/add-new" element={<AddEmployee />} />
                <Route path="employee/update" element={<AddEmployee />} />
                <Route path="profile/update" element={<AddEmployee />} />
                <Route path="employees/view-all" element={<ViewAllEmployees />} />
                <Route path="skills/view-all" element={<ViewAllSkills />} />
            </Routes>
            </div>
        </div>
        </>
    )
}
export default AdminParentPage