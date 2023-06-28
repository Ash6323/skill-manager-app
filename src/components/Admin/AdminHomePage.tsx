import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Modal } from "react-bootstrap";
import {EmployeeSkills} from '../Data/Entities';
import React, {useState} from "react";
import useHttp from "../../Config/https";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import MapSkillModal from './Modals/MapSkillModal';
import UpdateExpertiseModal from './Modals/EmployeeSkillModal';
import GenerateReportModal from './Modals/GenerateReportModal';
import Loader from '../Loaders/Loader';

const AdminHomePage = () => {

    const {axiosInstance, loading} = useHttp();
    const [allEmployeeSkills, setAllEmployeeSkills] = useState<EmployeeSkills[]>([]);
    const [show, setShow] = useState(false);
    const [updateShow, setUpdateShow] = useState(false);
    const [reportShow, setReportShow] = useState(false);
    const [updationEmployeeId, setUpdationEmployeeId] = useState<string>("");
    const [updationSkillId, setUpdationSkillId] = useState<number>(0);
    const [updationExpertise, setUpdationExpertise] = useState<number>(-1);
    const [reportEmployeeId, setReportEmployeeId] = useState<string>("");
    const [reportEmployeeName, setReportEmployeeName] = useState<string>("");

    const closeModal = (showValue : boolean) =>
    {
      setShow(showValue);
    }
    const closeUpdateModal = (showValue : boolean) =>
    {
        setUpdateShow(showValue);
    }
    const closeReportModal = (showValue : boolean) =>
    {
        setReportShow(showValue);
    }
    const handleExpertiseClick = (employeeId: string, skillId: number, skillExpertise: number) => {
        setUpdationEmployeeId(employeeId);
        setUpdationSkillId(skillId);
        setUpdationExpertise(skillExpertise);
        setUpdateShow(true);
    }
    const handleReportClick = (employeeId: string, employeeName: string) => {
        setReportEmployeeId(employeeId);
        setReportEmployeeName(employeeName);
        setReportShow(true);
    }

    const getAllEmployeeSkills = () => {
        axiosInstance.get(`EmployeeSkill`).then((response) => 
        {
            setAllEmployeeSkills(response.data.data);
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
    const [search, setSearch] = useState('');
    const filteredEmployees = 
    {
        list: allEmployeeSkills.filter((item) =>item.employeeName.toLowerCase().includes(search.toLowerCase())),
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        setSearch(event.target.value);
    };

    React.useEffect( () => {
        getAllEmployeeSkills();
    }, [show, updateShow]);

    return (
        <>
        {loading ? <Loader /> : ""}
        <div className="my-container shadow">
            <div className="row">
                <div className="d-flex px-4 col-md-6">
                    <span className="badge rounded-pill border border-4 basic">Basic</span>
                    <span className="badge rounded-pill border border-4 novice">Novice</span>
                    <span className="badge rounded-pill border border-4 intermediate">Intermediate</span>
                    <span className="badge rounded-pill border border-4 advanced">Advanced</span>
                    <span className="badge rounded-pill border border-4 expert">Expert</span>
                </div>
                <div className="d-flex justify-content-end mb-2 col-md-6">
                    <button type="submit" className="btn submit-btn map-emp-btn" onClick={() => setShow(true)}>
                        <i className="bi bi-person-fill-up px-1"></i> Map to Employee
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex mt-2 justify-content-center">
                    <h3>Employee Skill List</h3>
                </div>
            </div>

            <div className="d-flex justify-space-between align-items-center">
                <div className="mx-4 col-md-3">
                <input 
                    list="employees-list" type="text" onChange={handleSearch} placeholder="Search for an Employee"
                    className="form-control" id="item-search-input">
                </input>
                
                <datalist id="employees-list">
                    {allEmployeeSkills.map((item) => (
                    <div key={item.employeeId}>
                        <option value={item.employeeName}></option>
                    </div>
                    ))}
                </datalist>
                </div>                        
            </div>

            <hr></hr>
            <div className="mt-2">
            <h6>Click: Employee Name for Skill Report || Click: Particular Skill to Update Expertise/Remove Skill</h6>
                <div className="table-responsive card">
                    <table className="table table-bordered table-striped ">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Employee</th>
                                <th scope="col">Skills</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredEmployees.list.map((item,index) => {
                            return (
                            <tr key={index}>
                                <td className="description">{index+1}</td>
                                <td className="description hoverable" onClick={() => handleReportClick(item.employeeId, item.employeeName)}>
                                    {item.employeeName}
                                </td>
                                <td>
                                <React.Fragment key={index}>
                                        {item.employeeSkills.map((skill, index) => {
                                            if(skill.expertise===0)
                                            return (
                                                <td key = {index}>  
                                                    <span className="badge rounded-pill border border-4 basic hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise===1)
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 novice hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise===2)
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 intermediate hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise===3)
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 advanced hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise===4)
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 expert hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                        })}
                                    </React.Fragment>
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <Modal show={show} onHide={() => setShow(false)} contentClassName="modal-container">
                    <MapSkillModal ShowModal={closeModal}/>
                </Modal>
                <Modal show={updateShow} onHide={() => setUpdateShow(false)} contentClassName="modal-container">
                    <UpdateExpertiseModal ShowUpdateModal={closeUpdateModal} updatedEmployeeId={updationEmployeeId}
                                            updatedSkillId={updationSkillId} updatedExpertise={updationExpertise}/>
                </Modal>
                <Modal show={reportShow} onHide={() => setReportShow(false)} contentClassName="modal-container">
                    <GenerateReportModal ShowReportModal={closeReportModal} employeeId={reportEmployeeId} employeeName={reportEmployeeName}/>
                </Modal>
            </div>
            <ToastContainer />
        </div>
        </>
    )
}
export default AdminHomePage
