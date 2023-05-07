import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import {EmployeeSkillMap} from '../../Data/Entities';
import axios from 'axios';

const employeeSkillBaseURL = "https://localhost:7247/api/EmployeeSkill";
const skillBaseURL = "https://localhost:7247/api/Skill";

interface IModal {
  ShowUpdateModal: (show: boolean) => void;
  updatedEmployeeId: string,
  updatedSkillId: number,
  updatedExpertise: string,
}

const UpdateExpertiseModal: React.FC<IModal> = ({ShowUpdateModal, updatedEmployeeId, updatedSkillId, updatedExpertise}) => {

  const [newExpertise, setNewExpertise] = useState<EmployeeSkillMap>({employeeId:"", skillId:0, expertise:""});
  const [expertises, setExpertises] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const setDefaultValue = () => {
    setNewExpertise({employeeId:"", skillId:0, expertise:""});
  }

  const HandleChange = (e:any) =>{
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
    axios.put(employeeSkillBaseURL, newExpertise).then((response) =>
    {
        console.log(response.data);
        setDefaultValue();
        handleClose();
    }).catch(error => {
        if(error.response)
        {
            alert(error.response.data.data);
        }
        else if (error.request)
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

  return (
    <div>
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title>Update Employee Expertise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-center'>
          <select required id = "expertise-dropdown" className="input-item-details" name="expertise"
                  defaultValue="Select-Expertise"
                  onChange={HandleChange} >
              <option value= "Select-Expertise" disabled>Select New Expertise</option>
              {expertises.map((expertise, index) => { 
              return (<option key= {index} value={ expertise } disabled={expertise == updatedExpertise}>
                          {expertise}
                      </option>);
              })}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn update-btn btn-warning mt-3 px-4" 
                  onClick={updateExpertise}>
                  Update
          </button>
        </div>
      </Modal.Body>
    </div>
  )
}
export default UpdateExpertiseModal;