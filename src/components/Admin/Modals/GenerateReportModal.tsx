import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import baseUrl from '../../../config/ApiBaseUrl';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

interface IModal {
  ShowReportModal: (showUpdate: boolean) => void;
  employeeId: string,
  employeeName: string,
}

const GenerateReportModal:React.FC<IModal> = ({ShowReportModal, employeeId, employeeName}) => {

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    ShowReportModal(false);
  };

  const getReport = () => {
    axios.get(`${baseUrl}Report/${employeeId}`, {responseType: 'blob'})
    .then(response => 
    {
      window.open(URL.createObjectURL(response.data));
      handleClose();
    }).catch(error => {
      if (error.request)
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
        <Modal.Title>Employee Skill Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <span className="display-26 text-secondary me-2 font-weight-600">Generate Skill Report for {employeeName}?</span>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success mt-3 px-4" onClick={getReport}>
            <i className="bi bi-cloud-arrow-down-fill mx-1"></i> Yes
          </button>
        </div>
      </Modal.Body>
      <ToastContainer />
    </div>
  )
}
export default GenerateReportModal;