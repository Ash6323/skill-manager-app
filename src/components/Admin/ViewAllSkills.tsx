import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Skill} from './Entities';
import { Modal } from "react-bootstrap";
import React, {useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import AddSkillModal from './AddSkillModal';

const baseURL = "https://localhost:7247/api/Skill";

const ViewAllSkills = () => {

    const [skills, setSkills] = useState<Skill[]>([]);
    const [show, setShow] = useState(false);
    const [deletionSkillId, setDeletionSkillId] = useState<string>("");
    const navigate = useNavigate();
    
    const closeModal = (showValue : boolean) =>
    {
      setShow(showValue);
    }

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
      }, [show]);
    
    // const handleDeleteClick = (id:any) => {
    //     // setDeletionCustomerId(id);
    //     // invokeDeleteModal(true);
    //     axios.delete(`${baseURL}/${id}`)
    //     .then(() => 
    //     {
    //         getCustomers();
    //     });
    // }
    return (
        <>
        <div className="my-container shadow pb-5">
            <div className="row">
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn submit-btn map-emp-btn" onClick={() => setShow(true)}>
                        Add New
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col justify-content-center">
                    <h3>List of Skills</h3>
                </div>
            </div>
            <hr></hr>

            <div className="row mx-4 mt-2">     
                {skills.map((skill,index) => {
                    return (
                        <div key={index} className="col-sm-3 mt-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{skill.skillName}</h5>
                                    <a href="#" className="btn skill-update-btn btn-warning">Update</a>
                                    <a href="#" className="btn skill-delete-btn btn-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    )
                })
                }  
            </div>
            <div>
                <Modal show={show} onHide={() => setShow(false)} contentClassName="modal-container">
                    <AddSkillModal ShowModal={closeModal}/>
                </Modal>
            </div>
        </div>
        </>
    );
}
export default ViewAllSkills;