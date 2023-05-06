import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Navbar from "../Shared/Navbar";
import EmployeeSidebar from "./EmployeeSidebar";
import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Profile from '../Shared/Profile';

const EmployeeParentPage = () => {

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
                <EmployeeSidebar />
            </div>
            <div className="col-md-10">
                <Routes>
                    {/* <Route path="home" element={<EmployeeHomePage />} /> */}
                    <Route path="profile" element={<Profile />} />
                    {/* <Route path="employees/add-new" element={<AddEmployee />} />
                    <Route path="employees/view-all" element={<ViewAllEmployees />} />
                    <Route path="skills/view-all" element={<ViewAllSkills />} /> */}
                </Routes>
            </div>
            
        </div>
        </>
    )
}
export default EmployeeParentPage