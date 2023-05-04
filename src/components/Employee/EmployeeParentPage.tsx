import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import LandingNavbar from "../LandingPage/LandingNavbar";
import EmployeeSidebar from "./EmployeeSidebar";
import { useEffect, useState } from 'react';

const EmployeeParentPage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const [userName, setUserName] = useState<string>("");

    useEffect( () => {
        setUserName(user.userFullName);
    },[]);

    return (
        <>
        <LandingNavbar userFullName={userName}/>
        <div className="row">
            <div className="col-md-2">
                <EmployeeSidebar />
            </div>
            <div className="col-md-10">
                <div className="my-container shadow">
                    <h3>Employee Home</h3>
                </div>
            </div>
        </div>
        </>
    )
}
export default EmployeeParentPage