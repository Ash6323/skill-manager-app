import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import {EmployeeSkillMap} from '../../Data/Entities';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const employeeSkillBaseURL = "https://localhost:7247/api/EmployeeSkill";
const skillBaseURL = "https://localhost:7247/api/Skill";

interface IModal {
  ShowUpdateModal: (show: boolean) => void;
  updatedEmployeeId: string,
  updatedSkillId: number,
  updatedExpertise: number,
}

const EmployeeSkillModal: React.FC<IModal> = ({ShowUpdateModal, updatedEmployeeId, updatedSkillId, updatedExpertise}) => {

  const [newExpertise, setNewExpertise] = useState<EmployeeSkillMap>({employeeId:"", skillId:0, expertise:-1});
  const [expertises, setExpertises] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const setDefaultValue = () => {
    setNewExpertise({employeeId:"", skillId:0, expertise:-1});
  }

  const handleChange = (e:any) =>{
    const {name,value} = e.target;
    setNewExpertise({...newExpertise, [name]:value})
  }

  const handleClose = () => {
    ShowUpdateModal(false);
  };

  React.useEffect( () => {
    setNewExpertise({employeeId: updatedEmployeeId, skillId: updatedSkillId, expertise: updatedExpertise});
    getExpertise();
  }, []);

  const updateExpertise = () => {
    axios.put(`${employeeSkillBaseURL}/${updatedEmployeeId}`, newExpertise)
    .then((response) =>
    {
      setDefaultValue();
      handleClose();
    }).catch(error => {
        if(error.response)
        {
          toast.error(error.response.data.data, {
            position: toast.POSITION.TOP_RIGHT        
        });
        }
        else if (error.request)
        {
          if (error.response.status == 403 || error.response.status == 401) {
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

  const removeSkill = () => {
    axios.delete(`${employeeSkillBaseURL}/${updatedEmployeeId}/${updatedSkillId}`)
    .then((response) =>
    {
      setDefaultValue();
      handleClose();
    }).catch(error => {
        if(error.response)
        {
          toast.error(error.response.data.data, {
            position: toast.POSITION.TOP_RIGHT        
        });
        }
        else if (error.request)
        {
          if (error.response.status == 403 || error.response.status == 401) {
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

  const getExpertise = () => {
    axios.get(`${skillBaseURL}/Expertise`).then((response) => 
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

  return (
    <div>
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title>Employee Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-center'>
          <select required id = "expertise-dropdown" className="input-item-details" name="expertise"
                  defaultValue="Select-Expertise"
                  onChange={handleChange} >
              <option value= "Select-Expertise" disabled>Select New Expertise</option>
              {expertises.map((expertise, index) => {
              return (<option key= {index} value={ index } disabled={index == updatedExpertise}>
                        {expertise}
                      </option>);
              })}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn update-btn btn-warning mt-3 px-3" 
                  onClick={updateExpertise} disabled={newExpertise.expertise == updatedExpertise}>
            <i className="bi bi-pencil-square"></i> Update Expertise
          </button>
          <button type="submit" className="btn btn-danger mt-3 px-3" onClick={removeSkill}>
            <i className="bi bi-trash-fill"></i> Remove Skill
          </button>
        </div>
      </Modal.Body>
      <ToastContainer />
    </div>
  )
}
export default EmployeeSkillModal;