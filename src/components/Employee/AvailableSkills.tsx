import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Skill} from '../Data/Entities';
import React, {useState} from "react";
import axios from 'axios';

const baseURL = "https://localhost:7247/api/Skill";

const AvailableSkills = () => {

    const [skills, setSkills] = useState<Skill[]>([]);
    
    const getSkills = () => {
        axios.get(baseURL).then((response) => 
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
    }, []);
    
    return (
        <>
        <div className="my-container shadow pb-5" >
            <div className="row mb-3">
                <div className="d-flex px-4 col-md-12">
                    <h5 className='align-middle px-2'>Expertise Levels:</h5>
                    <span className="badge rounded-pill border border-4 basic">Basic</span>
                    <span className="badge rounded-pill border border-4 novice">Novice</span>
                    <span className="badge rounded-pill border border-4 intermediate">Intermediate</span>
                    <span className="badge rounded-pill border border-4 advanced">Advanced</span>
                    <span className="badge rounded-pill border border-4 expert">Expert</span>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col justify-content-center">
                    <h3>List of Skills</h3>
                </div>
            </div>
            <hr></hr>
            <div className="mt-2">
                <div className="table-responsive card">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Skill</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {skills.map((skill,index) => {
                            return (
                                <tr>
                                    <td className='table-fit'>{index+1}</td>
                                    <td className='table-fit'>{skill.skillName}</td>
                                    <td className='skill-table-cell'>{skill.description}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}
export default AvailableSkills;