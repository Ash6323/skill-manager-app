import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal } from "react-bootstrap";
import {EmployeeSkills} from './Entities';
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import MapSkillModal from './MapSkillModal';

const baseURL = "https://localhost:7247/api/EmployeeSkill";

const AdminHomePage = () => {

    const [allEmployeeSkills, setAllEmployeeSkills] = useState<EmployeeSkills[]>([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const closeModal = (showValue : boolean) =>
    {
      setShow(showValue);
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
    }, [show]);

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
                                                    <span className="badge rounded-pill border border-4 basic">
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise==="Novice")
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 novice">
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise==="Intermediate")
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 intermediate">
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise==="Advanced")
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 advanced">
                                                        {skill.skillName}
                                                    </span>
                                                </td>
                                            )
                                            else if(skill.expertise==="Expert")
                                            return (
                                                <td key = {index}>      
                                                    <span className="badge rounded-pill border border-4 expert">
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
            </div>
        </div>
        </>
    )
}
export default AdminHomePage
