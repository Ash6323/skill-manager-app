import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Navbar from "../common/Navbar";
import EmployeeSidebar from "./EmployeeSidebar";
import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Profile from '../common/Profile';
import EmployeeHomePage from './EmployeeHomePage';
import AvailableSkills from './AvailableSkills';
import AddEmployee from '../Admin/AddEmployee';

const EmployeeParentPage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const [userName, setUserName] = useState<string>("");

    useEffect( () => {
        setUserName(user.userFullName);
    });

    return (
        <>
        <Navbar userFullName={userName}/>
        <div className="d-flex">
            <div className="col-md-2">
                <EmployeeSidebar />
            </div>
            <div className="col-md-10">
                <Routes>
                    <Route path="home" element={<EmployeeHomePage />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="profile/update" element={<AddEmployee />} />
                    <Route path="skills/view-all" element={<AvailableSkills />} />
                </Routes>
            </div>
            
        </div>
        </>
    )
}
export default EmployeeParentPage