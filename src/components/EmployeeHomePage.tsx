import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import LandingNavbar from "./LandingNavbar";
import EmployeeSidebar from "./EmployeeSidebar";

const EmployeeHomePage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');

    return (
        <>
        <LandingNavbar />
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
export default EmployeeHomePage