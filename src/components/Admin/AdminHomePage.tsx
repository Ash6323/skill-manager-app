import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
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
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn submit-btn map-emp-btn" onClick={() => setShow(true)}>
                        Map to Employee
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col justify-content-center">
                    <h3>Employees Skill List</h3>
                </div>
            </div>
            <hr></hr>
            <div className="row mx-4 mt-2">     
                {allEmployeeSkills.map((item,index) => {
                    return (
                      <div key={index} className="col-sm-4 mt-2">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">
                              {item.employeeName}
                            </h5>
                            <div className="table-responsive card">
                              <table className="table table-bordered table-striped ">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Skill</th>
                                        <th scope="col">Expertise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <React.Fragment key={index}>
                                        {item.employeeSkills.map((skill, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{skill.skillName}</td>
                                                    <td>{skill.expertise}</td>
                                                </tr>
                                            )
                                        })}
                                    </React.Fragment>
                                </tbody>
                              </table>
                            </div>
                            {/* <a href="#" className="btn skill-update-btn btn-warning">Update</a>
                                    <a href="#" className="btn skill-delete-btn btn-danger">Delete</a> */}
                          </div>
                        </div>
                      </div>
                    );
                })
                }  
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
