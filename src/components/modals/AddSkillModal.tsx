import React, { useState} from 'react';
import {Modal} from 'react-bootstrap';
import {Skill} from '../../constants/entities';
import useHttp from "../../config/https";
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '../../store/hooks';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../loaders/Loader';
import messages from '../../constants/messages';

interface IModal {
  ShowModal: (show: boolean) => void;
}

const AddSkillModal:React.FC<IModal> = ({ShowModal}) => {

  const loading = useAppSelector(state => state.loader.loading);
  const axiosInstance = useHttp();
  const [newSkill, setNewSkill] = useState<Skill>({id:0, skillName:"",description:""});
  const [show, setShow] = useState<boolean>(false);

  const setDefaultValue = () => {
    setNewSkill({id:0, skillName:"",description:""});
  }

  const HandleChange = (e:any) =>{
    const {name,value} = e.target;
    setNewSkill({...newSkill, [name]:value})
  }

  const handleClose = () => {
    ShowModal(false);
  };

  const addSkill = () => {
    axiosInstance.post(`Skill`, newSkill)
    .then(response => 
    {
      console.log(response.data);
      setDefaultValue();
      handleClose();
    }).catch(error => {
      if (error.request)
      {
        if (error.response.status === 403 || error.response.status === 401) {
          toast.error(messages.api.unauthorized, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(messages.api.server_inactive, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    });
  }

  return (
    <div>
      {loading ? <Loader /> : ""}
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title>Add New Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input type="text" name="skillName" value={newSkill.skillName} 
                placeholder="Enter New Skill" onChange={HandleChange} required/>
        </div>
        <div>
          <input type="text" name="description" value={newSkill.description} 
                placeholder="Enter Description" onChange={HandleChange} required/>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success mt-3 px-4" 
                  onClick={addSkill} disabled = {newSkill.skillName === "" || newSkill.description === ""}>
            <i className="bi bi-plus-square mx-1"></i> Add
          </button>
        </div>
      </Modal.Body>
      <ToastContainer />
    </div>
  )
}
export default AddSkillModal;