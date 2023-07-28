import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import useHttp from "../../config/https";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../loaders/Loader';
import { useAppSelector } from '../../store/hooks';
import messages from '../../constants/messages';

interface IModal {
  ShowPhotoRemoveModal: (show: boolean) => void;
}

const PictureRemoveModal: React.FC<IModal> = ({ShowPhotoRemoveModal}) => {

  const loading = useAppSelector(state => state.loader.loading);
  const axiosInstance = useHttp();
  const [show, setShow] = useState<boolean>(false);
  const userProps = JSON.parse(localStorage.getItem("User") || '{}');
  const userId = userProps.userId;

  const handleClose = () => {
    ShowPhotoRemoveModal(false);
  };

  const RemovePhoto = () => {

    axiosInstance.delete(`ProfileImage/${userId}`)
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