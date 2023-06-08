import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const profileImageBaseURL = "https://localhost:7247/api/ProfileImage";

interface IModal {
  ShowProfileModal: (show: boolean) => void;
}

const UpdateExpertiseModal: React.FC<IModal> = ({ShowProfileModal}) => {

  const [show, setShow] = useState<boolean>(false);
  const userProps = JSON.parse(localStorage.getItem("User") || '{}');
  const userId = userProps.userId;

  const handleClose = () => {
    ShowProfileModal(false);
  };

  const onImageChange = (e:any) => {
    const image = e.target.files[0];
    updatePhoto(image);
  }

  const config = {
    headers: { 'content-type': 'multipart/form-data' }  
  }

  const updatePhoto = (image:any) => {
    const formData = new FormData();
    formData.append("UserId", userId);
    formData.append("Image", image);

    axios.post(profileImageBaseURL, formData, config)
    .then((response) =>
    {
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

  return (
    <div>
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title>Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-center'>
          <input type="file" onChange={onImageChange} />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn update-btn btn-warning mt-3 px-4" onClick={updatePhoto}>
            <i className="bi bi-pencil-square px-1"></i> Update
          </button>
        </div>
      </Modal.Body>
      <ToastContainer />
    </div>
  )
}
export default UpdateExpertiseModal;