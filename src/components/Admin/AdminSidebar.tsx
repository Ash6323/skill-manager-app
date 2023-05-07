import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminSidebar = () => {

  const navigate = useNavigate();
  return (
    <nav id="sidebar">
      <div>
        <div>
          <Button className = "sidebar-items px-3" onClick={()=>navigate("../admin/home")}>
            <i className="bi bi-house-fill px-1"></i> Home
          </Button>
          <Button className = "sidebar-items px-3" onClick={()=>navigate("employees/view-all")}>
            <i className="bi bi-people-fill px-1"></i> Employees
          </Button>
          <Button className = "sidebar-items px-3" onClick={()=>navigate("skills/view-all")}>
            <i className="bi bi-code-slash px-1"></i> Skills</Button>
        </div>
      </div>
    </nav>
  );
};
export default AdminSidebar;