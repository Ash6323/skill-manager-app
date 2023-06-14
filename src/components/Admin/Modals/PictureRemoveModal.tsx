import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import axios from 'axios';
import baseUrl from '../../../config/ApiBaseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

interface IModal {
  ShowPhotoRemoveModal: (show: boolean) => void;
}

const PictureRemoveModal: React.FC<IModal> = ({ShowPhotoRemoveModal}) => {

  const [show, setShow] = useState<boolean>(false);
  const userProps = JSON.parse(localStorage.getItem("User") || '{}');
  const userId = userProps.userId;

  const handleClose = () => {
    ShowPhotoRemoveModal(false);
  };

  const RemovePhoto = () => {

    axios.delete(`${baseUrl}ProfileImage/${userId}`)
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

  return (
    <div>
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title>Remove Profile Picture?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-danger mt-3 px-4" onClick={RemovePhoto}>
            <i className="bi bi-trash-fill"></i> Delete
          </button>
        </div>
      </Modal.Body>
      <ToastContainer />
    </div>
  )
}
export default PictureRemoveModal;