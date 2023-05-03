import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <nav id="sidebar">
      <div>
        <div>
          <Button className = "sidebar-items" onClick={()=>navigate("../admin/home")}>Home</Button>
          <Button className = "sidebar-items" onClick={()=>navigate("employees/view-all")}>Employees</Button>
          <Button className = "sidebar-items" onClick={()=>navigate("skills/view-all")}>Skills</Button>
          {/* <Dropdown>
            <Dropdown.Toggle variant="success" id="employees-dropdown" className="sidebar-items" 
                              data-bs-toggle="collapse" data-bs-target="#employees-collapse" aria-expanded="false">
              Employees
            </Dropdown.Toggle>
            <Dropdown.Menu className="sidebar-dropdown-menu" id="employees-collapse">
              <Dropdown.Item className="dropdown-items" onClick={()=>navigate("employees/add-new")}>Add New</Dropdown.Item>
              <Dropdown.Item className="dropdown-items" onClick={()=>navigate("employees/view-all")}>View All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
        {/* <div>
          <Dropdown>
          <Dropdown.Toggle variant="success" id="invoices-dropdown" className="sidebar-items">Skills</Dropdown.Toggle>
            <Dropdown.Menu className="sidebar-dropdown-menu ">
              <Dropdown.Item className="dropdown-items" onClick={()=>navigate("../admin/home")}>Add New</Dropdown.Item>
              <Dropdown.Item className="dropdown-items" onClick={()=>navigate("../admin/home")}>View All</Dropdown.Item>            
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="invoices-dropdown" className="sidebar-items">Employee Skills</Dropdown.Toggle>
            <Dropdown.Menu className="sidebar-dropdown-menu ">
              <Dropdown.Item className="dropdown-items" 
                            onClick={()=>navigate("../admin/home")}>Assign Skill</Dropdown.Item>
              <Dropdown.Item className="dropdown-items" 
                            onClick={()=>navigate("../admin/home")}>View all with Skills</Dropdown.Item>
              <Dropdown.Item className="dropdown-items" 
                            onClick={()=>navigate("../admin/home")}>View one with Skills</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};
export default AdminSidebar;