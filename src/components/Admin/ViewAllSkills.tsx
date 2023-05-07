import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Skill} from '../Data/Entities';
import { Modal } from "react-bootstrap";
import React, {useState} from "react";
import axios from 'axios';
import AddSkillModal from './Modals/AddSkillModal';
import UpdateSkillModal from './Modals/UpdateSkillModal';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const baseURL = "https://localhost:7247/api/Skill";

const ViewAllSkills = () => {

    const printRef = React.useRef<HTMLInputElement>(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element!);
        const data = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Report.pdf');
      };

    const [skills, setSkills] = useState<Skill[]>([]);
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updationSkillId, setUpdationSkillId] = useState<number>(0);
    const [updationSkillName, setUpdationSkillName] = useState<string>("");
    const [updationSkillDescription, setUpdationSkillDescription] = useState<string>("");
    
    const closeModal = (showValue : boolean) =>
    {
      setShow(showValue);
    }
    const closeUpdateModal = (showValue : boolean) =>
    {
      setShowUpdate(showValue);
    }
    const HandleCardClick = (skillId: number, skillName: string, skillDescription: string) => {
        setUpdationSkillId(skillId);
        setUpdationSkillName(skillName);
        setUpdationSkillDescription(skillDescription);
        setShowUpdate(true);
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
    }, [show, showUpdate]);
    
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
        <div ref={printRef} className="my-container shadow pb-5" >
            <div className="row">
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn submit-btn btn-success" onClick={handleDownloadPdf}>
                        <i className="bi bi-printer-fill mx-1"></i> Print
                    </button>
                    <button type="submit" className="btn submit-btn new-skill-btn" onClick={() => setShow(true)}>
                        <i className="bi bi-plus-square px-1"></i> Add New
                    </button>
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
                                <tr className='hoverable' onClick={() => HandleCardClick(skill.id,skill.skillName,skill.description)}>
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
            <div>
                <Modal show={show} onHide={() => setShow(false)} contentClassName="modal-container">
                    <AddSkillModal ShowModal={closeModal}/>
                </Modal>
                <Modal show={showUpdate} onHide={() => setShowUpdate(false)} contentClassName="modal-container">
                    <UpdateSkillModal ShowUpdateModal={closeUpdateModal} 
                                        updateSkillId={updationSkillId} updateSkillName={updationSkillName} 
                                        updateSkillDescription={updationSkillDescription}/>
                </Modal>
            </div>
        </div>
        </>
    );
}
export default ViewAllSkills;