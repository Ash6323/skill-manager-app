import React, { useState, useContext } from 'react';
import {Modal} from 'react-bootstrap';
import {Skill} from './Entities';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = "https://localhost:7247/api/Skill";

interface IModal {
  ShowUpdateModal: (showUpdate: boolean) => void;
  updateSkillId: number,
  updateSkillName: string,
  updateSkillDescription: string,
}

const UpdateSkillModal:React.FC<IModal> = ({ShowUpdateModal, updateSkillId, updateSkillName,updateSkillDescription}) => {

  const [updatedSkill, setUpdatedSkill] = useState<Skill>({id: 0, skillName: "",description: ""});
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect( () => {
    setUpdatedSkill({id: updateSkillId, skillName: updateSkillName, description: updateSkillDescription});
  }, []);

  const setDefaultValue = () => {
    setUpdatedSkill({id:0, skillName:"", description:""});
  }

  const HandleChange = (e:any) =>{
    const {name,value} = e.target;
    setUpdatedSkill({...updatedSkill, [name]:value})
  }

  const handleClose = () => {
    ShowUpdateModal(false);
  };

  const updateSkill = () => {
    console.log(updatedSkill);
    
    axios.put(baseURL, updatedSkill)
    .then(response => 
    {
      console.log(response.data);
      setDefaultValue();
      handleClose();
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
        <Modal.Title>Update Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input type="text" name="skillName" value={updatedSkill.skillName}
                placeholder="Enter New Skill" onChange={HandleChange} required/>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-warning mt-3 px-4" onClick={updateSkill}>Update</button>
        </div>
      </Modal.Body>
    </div>
  )
}
export default UpdateSkillModal;