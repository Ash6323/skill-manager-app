import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {EmployeeSkills} from '../../constants/entities';
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import React, {useState} from "react";
import useHttp from "../../config/https";
import GenerateReportModal from '../../components/modals/GenerateReportModal';
import Loader from '../../components/loaders/Loader';
import { useAppSelector } from '../../store/hooks';

const ViewSkills = () => {

    const loading = useAppSelector(state => state.loader.loading);
    const axiosInstance = useHttp();
    const [skills, setSkills] = useState<EmployeeSkills>();
    const userProps = JSON.parse(localStorage.getItem("User") || '{}');
    const [reportShow, setReportShow] = useState(false);
    const reportEmployeeId = userProps.userId;
    const reportEmployeeName = userProps.userFullName;

    const closeReportModal = (showValue : boolean) =>
    {
        setReportShow(showValue);
    }
    const handleReportClick = () => {
        setReportShow(true);
    }

    const getSkills = () => {
        axiosInstance.get(`EmployeeSkill/${userProps.userId}`).then((response) => 
        {
            setSkills(response.data.data);
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
                } 
                else {
                    toast.error("Server Inactive or Busy", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
        });
    }

    React.useEffect( () => {
        getSkills();
    },[]);
    
    return (
        <>
        {loading ? <Loader /> : ""}
        <div className="my-container shadow pb-5" >
        <div className="row">
            <div className="d-flex px-4 col-md-6">
                <span className="badge rounded-pill border border-4 basic">Basic</span>
                <span className="badge rounded-pill border border-4 novice">Novice</span>
                <span className="badge rounded-pill border border-4 intermediate">Intermediate</span>
                <span className="badge rounded-pill border border-4 advanced">Advanced</span>
                <span className="badge rounded-pill border border-4 expert">Expert</span>
            </div>
            <div className="d-flex justify-content-end mb-2 col-md-6">
                <button type="submit" className="btn submit-btn map-emp-btn" onClick={handleReportClick}>
                    <i className="bi bi-printer-fill px-1"></i> Generate Report
                </button>
            </div>
        </div>
        <div className="row">
            <div className="d-flex col justify-content-center">
                <h3>My Skills</h3>
            </div>
        </div>
        <hr></hr>

        <div className="row mx-4 mt-2">
            {skills?.employeeSkills.map((skill,index) => {
                return (
                    <div key={index} className="col-sm-3 mt-2">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Skill No. {index+1}</h5>
                                {skill.expertise === 0 &&  
                                    <span className="badge rounded-pill border border-4 basic">
                                        {skill.skillName}
                                    </span>
                                }  
                                {skill.expertise === 1 &&  
                                    <span className="badge rounded-pill border border-4 novice">
                                        {skill.skillName}
                                    </span>
                                }
                                {skill.expertise === 2 &&  
                                    <span className="badge rounded-pill border border-4 intermediate">
                                        {skill.skillName}
                                    </span>
                                }
                                {skill.expertise === 3 &&  
                                    <span className="badge rounded-pill border border-4 advanced">
                                        {skill.skillName}
                                    </span>
                                }
                                {skill.expertise === 4 &&  
                                    <span className="badge rounded-pill border border-4 expert">
                                        {skill.skillName}
                                    </span>
                                }                                    
                            </div>
                        </div>
                    </div>
                )
            })
            } 
            <Modal show={reportShow} onHide={() => setReportShow(false)} contentClassName="modal-container">
                <GenerateReportModal ShowReportModal={closeReportModal} employeeId={reportEmployeeId} employeeName={reportEmployeeName}/>
            </Modal>  
            </div>
            <ToastContainer />
        </div>
        </>
    );
}
export default ViewSkills;