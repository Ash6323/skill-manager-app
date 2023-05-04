import React, { useState, useContext } from 'react';
import {Modal} from 'react-bootstrap';
import {Employee, Skill, EmployeeSkillMap} from './Entities';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeBaseURL = "https://localhost:7247/api/Employee";
const employeeSkillBaseURL = "https://localhost:7247/api/EmployeeSkill";
const skillBaseURL = "https://localhost:7247/api/Skill";

interface IModal {
  ShowModal: (show: boolean) => void;
}

const MapSkillModal: React.FC<IModal> = ({ShowModal}) => {

  const [newSkill, setNewSkill] = useState<EmployeeSkillMap>({employeeId:"", skillId:0, expertise:""});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [expertises, setExpertises] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const setDefaultValue = () => {
    setNewSkill({employeeId:"", skillId:0, expertise:""});
  }

  const HandleChange = (e:any) =>{
    const {name,value} = e.target;
    setNewSkill({...newSkill, [name]:value})
  }

  const handleClose = () => {
    ShowModal(false);
  };

  const getEmployees = () => {
    axios.get(EmployeeBaseURL).then((response) => 
    {
      setEmployees(response.data.data);

    }).catch(error => {
      if(error.response)
      {
        alert(error.response.data);
      }
      else if (error.request)
      {
        alert("Server Inactive or Busy");
      }
    });
  }

  const getSkills = () => {
    axios.get(skillBaseURL).then((response) => 
    {
      setSkills(response.data.data);
    }).catch(error => {
      if (error.request)
      {
          alert("Server Inactive or Busy");
      }
    });
  }

  const getExpertise = () => {
    axios.get(`${skillBaseURL}/Expertise`).then((response) => 
    {
      setExpertises(response.data.data);
    }).catch(error => {
      if (error.request)
      {
          alert("Server Inactive or Busy");
      }
    });
  }

  React.useEffect( () => {
    getEmployees();
    getSkills();
    getExpertise();
  }, []);

  const addSkill = () => {
    console.log(newSkill);

    axios.post(employeeSkillBaseURL, newSkill)
    .then(response => 
    {
      console.log(response.data);
      setDefaultValue();
      handleClose();
    }).catch(error => {
      if(error.response)
      {
        alert(error.response.data.message);
      }
      else if (error.request)
      {
        alert("Server Inactive or Busy");
      }
    });
  } 

  return (
    <div>
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title>Map Skill to Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex'>
          <select required id = "employee-dropdown" className="input-item-details" name="employeeId"
                  defaultValue="Select-Employee"
                  onChange={HandleChange} >
            <option value= "Select-Employee" disabled>Select an Employee</option>
            {employees.map((employee, index) => { 
            return (<option key= {index} value={ employee.id }>
                        {employee.fullName}
                    </option>);
            })}
          </select>
          <select required id = "skill-dropdown" className="input-item-details" name="skillId"
                  defaultValue="Select-Skill"
                  onChange={HandleChange} >
              <option value= "Select-Skill" disabled>Select a Skill</option>
              {skills.map((skill, index) => { 
              return (<option key= {index} value={ skill.id }>
                          {skill.skillName}
                      </option>);
              })}
          </select>
        </div>
        <div className='d-flex'>
          <select required id = "expertise-dropdown" className="input-item-details" name="expertise"
                  defaultValue="Select-Expertise"
                  onChange={HandleChange} >
              <option value= "Select-Expertise" disabled>Select Expertise</option>
              {expertises.map((expertise, index) => { 
              return (<option key= {index} value={ expertise }>
                          {expertise}
                      </option>);
              })}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success mt-3 px-4" 
                  onClick={addSkill} disabled={newSkill.employeeId == "" || newSkill.skillId == 0 || newSkill.expertise == ""}>
            Add
          </button>
        </div>
      </Modal.Body>
    </div>
  )
}
export default MapSkillModal;