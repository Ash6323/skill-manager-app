import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import {Employee, Skill, EmployeeSkillMap} from '../../data/Entities';
import useHttp from "../../../config/https";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../../loaders/Loader';

interface IModal {
  ShowModal: (show: boolean) => void;
}

const MapSkillModal: React.FC<IModal> = ({ShowModal}) => {

  const {axiosInstance, loading} = useHttp();
  const [newSkill, setNewSkill] = useState<EmployeeSkillMap>({employeeId:"", skillId:0, expertise:-1});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [expertises, setExpertises] = useState<number[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const setDefaultValue = () => {
    setNewSkill({employeeId:"", skillId:0, expertise:-1});
  }

  const HandleChange = (e:any) =>{
    const {name,value} = e.target;
    setNewSkill({...newSkill, [name]:value})
  }

  const handleClose = () => {
    ShowModal(false);
  };

  const getEmployees = () => {
    axiosInstance.get(`Employee`).then((response) => 
    {
      setEmployees(response.data.data);

    }).catch(error => {
      if(error.response)
      {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT        
      });
      }
      else if (error.request)
      {
        if (error.response.status === 403 || error.response.status === 401) {
          toast.error("Unauthorized", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("Server Inactive or Busy", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    });
  }

  const getSkills = () => {
    axiosInstance.get(`Skill`).then((response) => 
    {
      setSkills(response.data.data);
    }).catch(error => {
      if (error.request)
      {
        toast.error("Server Inactive or Busy", {
          position: toast.POSITION.TOP_RIGHT        
      });
      }
    });
  }

  const getExpertise = () => {
    axiosInstance.get(`Skill/Expertise`).then((response) => 
    {
      setExpertises(response.data.data);
    }).catch(error => {
      if (error.request)
      {
        toast.error("Server Inactive or Busy", {
          position: toast.POSITION.TOP_RIGHT        
      });
      }
    });
  }

  React.useEffect( () => {
    getEmployees();
    getSkills();
    getExpertise();
  }, []);

  const addSkill = () => {
    axiosInstance.post(`EmployeeSkill`, newSkill)
    .then(response => 
    {
      setDefaultValue();
      handleClose();
    }).catch(error => {
      if(error.response)
      {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT        
      });
      }
      else if (error.request)
      {
        toast.error("Server Inactive or Busy", {
          position: toast.POSITION.TOP_RIGHT        
      });
      }
    });
  } 

  return (
    <div>
      {loading ? <Loader /> : ""}
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
          <select required id = "skill-dropdown" className="input-item-details mx-2" name="skillId"
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
              return (<option key= {index} value={ index }>
                        {expertise}
                      </option>);
              })}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success mt-3 px-4" 
                  onClick={addSkill} disabled={newSkill.employeeId === "" || newSkill.skillId === 0 || newSkill.expertise === -1}>
            <i className="bi bi-person-fill-up"></i> Add
          </button>
        </div>
      </Modal.Body>
      <ToastContainer />
    </div>
  )
}
export default MapSkillModal;