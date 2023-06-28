import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Skill} from '../data/Entities';
import { Modal } from "react-bootstrap";
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import useHttp from "../../config/https";
import AddSkillModal from './modals/AddSkillModal';
import UpdateSkillModal from './modals/UpdateSkillModal';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Loader from '../loaders/Loader';

const ViewAllSkills = () => {

    const {axiosInstance, loading} = useHttp();
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
        pdf.save('Skill-Report.pdf');
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
        axiosInstance.get(`Skill`).then((response) => 
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
                  } else {
                    toast.error("Server Inactive or Busy", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                }
            }
        });
    }
    const [search, setSearch] = useState('');
    const filteredSkills = 
    {
        list: skills.filter((item) =>item.skillName.toLowerCase().includes(search.toLowerCase())),
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        setSearch(event.target.value);
    };

    React.useEffect( () => {
        getSkills();
    }, [show, showUpdate]);
    
    return (
        <>
        {loading ? <Loader /> : ""}
        <div ref={printRef} className="my-container shadow pb-5" >
            <div className="row">
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn submit-btn btn-success" onClick={handleDownloadPdf}>
                        <i className="bi bi-printer-fill mx-1"></i> Print
                    </button>
                    <button type="submit" className="btn btn-success new-skill-btn" onClick={() => setShow(true)}>
                        <i className="bi bi-plus-square px-1"></i> Add New
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col justify-content-center">
                    <h3>List of Skills</h3>
                </div>
            </div>
            <div className="d-flex justify-space-between align-items-center">
                <div className="mx-4 col-md-3">
                <input 
                    list="skill-list" type="text" onChange={handleSearch} placeholder="Search for a Skill"
                    className="form-control" id="item-search-input">
                </input>
                
                <datalist id="skill-list">
                    {skills.map((item) => (
                    <div key={item.id}>
                        <option value={item.skillName}></option>
                    </div>
                    ))}
                </datalist>
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
                        {filteredSkills.list.map((skill,index) => {
                            return (
                                <tr className='hoverable' 
                                    key={index}
                                    onClick={() => HandleCardClick(skill.id,skill.skillName,skill.description)}>
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
            <ToastContainer />
        </div>
        </>
    );
}
export default ViewAllSkills;