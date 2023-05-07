import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {EmployeeSkills} from '../Data/Entities';
import { Modal } from "react-bootstrap";
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const baseURL = "https://localhost:7247/api/EmployeeSkill";

const ViewSkills = () => {

    const [skills, setSkills] = useState<EmployeeSkills>();
    const userProps = JSON.parse(localStorage.getItem("User") || '{}');
    const navigate = useNavigate();

    const getSkills = () => {
        axios.get(`${baseURL}/${userProps.userId}`).then((response) => 
        {
            setSkills(response.data.data);
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
        getSkills();
    },[]);
    
    return (
        <>
        <div className="my-container shadow pb-5" >
        <div className="row">
            <div className="d-flex px-4 justify-content-end col-md-12">
                <span className="badge rounded-pill border border-4 basic">Basic</span>
                <span className="badge rounded-pill border border-4 novice">Novice</span>
                <span className="badge rounded-pill border border-4 intermediate">Intermediate</span>
                <span className="badge rounded-pill border border-4 advanced">Advanced</span>
                <span className="badge rounded-pill border border-4 expert">Expert</span>
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
                    <div className="col-sm-3 mt-2">
                        <div className="card">
                            <div className="card-body skill-card">
                                <h5 className="card-title">Skill No. {index+1}</h5>
                                {skill.expertise === 'Basic' &&  
                                    <span className="badge rounded-pill border border-4 basic">
                                        {skill.skillName}
                                    </span>
                                }  
                                {skill.expertise === 'Novice' &&  
                                    <span className="badge rounded-pill border border-4 novice">
                                        {skill.skillName}
                                    </span>
                                }
                                {skill.expertise === 'Intermediate' &&  
                                    <span className="badge rounded-pill border border-4 intermediate">
                                        {skill.skillName}
                                    </span>
                                }
                                {skill.expertise === 'Advanced' &&  
                                    <span className="badge rounded-pill border border-4 advanced">
                                        {skill.skillName}
                                    </span>
                                }
                                {skill.expertise === 'Expert' &&  
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
            </div>
        </div>
        </>
    );
}
export default ViewSkills;