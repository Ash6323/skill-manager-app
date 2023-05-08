import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  return (
    <nav id="sidebar">
      <div>
        <Button className = "sidebar-items" onClick={()=>navigate("../employee/home")}>
          <i className="bi bi-house-fill px-1"></i> Home
        </Button>
        <Button className = "sidebar-items" onClick={()=>navigate("../employee/skills/view-all")}>
          <i className="bi bi-question-circle-fill px-1"></i> What I can Achieve
        </Button>
      </div>
    </nav>
  );
};
export default EmployeeSidebar;