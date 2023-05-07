import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Modal } from "react-bootstrap";
import {EmployeeSkills} from '../Data/Entities';
import React, {useState} from "react";
import axios from 'axios';
import MapSkillModal from './Modals/MapSkillModal';
import UpdateExpertiseModal from './Modals/UpdateExpertiseModal';

const baseURL = "https://localhost:7247/api/EmployeeSkill";

const AdminHomePage = () => {

    const [allEmployeeSkills, setAllEmployeeSkills] = useState<EmployeeSkills[]>([]);
    const [show, setShow] = useState(false);
    const [updateShow, setUpdateShow] = useState(false);
    const [updationEmployeeId, setUpdationEmployeeId] = useState<string>("");
    const [updationSkillId, setUpdationSkillId] = useState<number>(0);
    const [updationExpertise, setUpdationExpertise] = useState<string>("");

    const closeModal = (showValue : boolean) =>
    {
      setShow(showValue);
    }
    const closeUpdateModal = (showValue : boolean) =>
    {
        setUpdateShow(showValue);
    }
    const handleExpertiseClick = (employeeId: string, skillId: number, skillExpertise: string) => {
        setUpdationEmployeeId(employeeId);
        setUpdationSkillId(skillId);
        setUpdationExpertise(skillExpertise);
        setUpdateShow(true);
    }

    const getAllEmployeeSkills = () => {
        axios.get(baseURL).then((response) => 
        {
            console.log("Inside get.then");
            setAllEmployeeSkills(response.data.data);

        }).catch(error => {
            if(error.response)
            {
                alert(error.response.data);
            }
            else if (error.request)
            {
                alert("Server Inactive or Busy");
            }
        });
    }


    React.useEffect( () => {
        getAllEmployeeSkills();
    }, [show, updateShow]);

    return (
        <>
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
                        Map to Employee
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex mt-2 justify-content-center">
                    <h3>Employee Skill List</h3>
                </div>
            </div>
            <hr></hr>
            <div className="mt-2">
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
                        {allEmployeeSkills.map((item,index) => {
                            return ( 
                            <tr key={index}>
                                <td className="description">{index+1}</td>
                                <td className="description">{item.employeeName}</td>
                                <td>
                                <React.Fragment key={index}>
                                        {item.employeeSkills.map((skill, index) => {
                                            if(skill.expertise==="Basic")
                                            return (
                                                <td key = {index}>  
                                                    <span className="badge rounded-pill border border-4 basic hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise==="Novice")
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 novice hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise==="Intermediate")
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 intermediate hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise==="Advanced")
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 advanced hoverable"
                                                            onClick={() => handleExpertiseClick(item.employeeId, skill.id, skill.expertise)}>
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise==="Expert")
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
            </div>
        </div>
        </>
    )
}
export default AdminHomePage
