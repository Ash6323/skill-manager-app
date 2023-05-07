import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  return (
    <nav id="sidebar">
      <div>
        <Button className = "sidebar-items" onClick={()=>navigate("../employee/home")}>Home</Button>
        <Button className = "sidebar-items" onClick={()=>navigate("../employee/skills/view-all")}>What I can Achieve</Button>
      </div>
    </nav>
  );
};
export default EmployeeSidebar;