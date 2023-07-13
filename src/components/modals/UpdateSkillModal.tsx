import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useHttp from "../../config/https";
import { Skill } from '../../constants/Entities';
import Loader from "../loaders/Loader";

interface IModal {
  ShowUpdateModal: (showUpdate: boolean) => void;
  updateSkillId: number;
  updateSkillName: string;
  updateSkillDescription: string;
}

const UpdateSkillModal: React.FC<IModal> = ({ShowUpdateModal, updateSkillId, updateSkillName, updateSkillDescription,}) => {
  
  const [updatedSkill, setUpdatedSkill] = useState<Skill>({id: 0, skillName: "", description: "",});
  const {axiosInstance, loading} = useHttp();
  const [show, setShow] = useState<boolean>(false);

  React.useEffect(() => {
    setUpdatedSkill({id: updateSkillId, skillName: updateSkillName, description: updateSkillDescription,});
  },[]);

  const setDefaultValue = () => {
    setUpdatedSkill({ id: 0, skillName: "", description: "" });
  };

  const HandleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedSkill({ ...updatedSkill, [name]: value });
  };

  const handleClose = () => {
    ShowUpdateModal(false);
  };

  const updateSkill = () => {
    axiosInstance.put(`Skill/${updateSkillId}`, updatedSkill)
      .then((response) => {
        setDefaultValue();
        handleClose();
      })
      .catch((error) => {
        if (error.request) {
          if (error.response.status === 403 || error.response.status === 401) {
            toast.error("Unauthorized", {
              position: toast.POSITION.TOP_RIGHT,
            });
          } 
          else {
            toast.error("Server Inactive or Busy", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
    });
  };

  return (
    <div>
      {loading ? <Loader /> : ""}
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title>Update Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Title</h5>
          <input
            type="text"
            name="skillName"
            value={updatedSkill.skillName}
            placeholder="Enter New Skill"
            onChange={HandleChange}
          />
        </div>
        <div className="mt-2">
          <h5>Description</h5>
          <input
            type="text"
            name="description"
            value={updatedSkill.description}
            placeholder="Enter Description"
            onChange={HandleChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-warning mt-3 px-4"
            onClick={updateSkill}
          >
            <i className="bi bi-pencil-square px-1"></i>
            Update
          </button>
        </div>
      </Modal.Body>
      <ToastContainer />
    </div>
  );
};
export default UpdateSkillModal;
