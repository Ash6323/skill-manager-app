import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Modal } from "react-bootstrap";
import {Employee} from './Entities';
import React, {useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const baseURL = "https://localhost:7247/api/Employee";

const ViewAllEmployees = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isView, invokeViewModal] = useState(false);
    const [getCustomerId,setGetCustomerId] = useState<number>();
    const [deletionCustomerId, setDeletionCustomerId] = useState<string>("");
    const navigate = useNavigate();
    
    const getEmployees = () => {
        axios.get(baseURL).then((response) => 
        {
            setEmployees(response.data.data);
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
        console.log("Hello");
        getEmployees();
      }, []);
    
    // const handleTableRowClick = (employeeId:string) => FOR UPDATING EMPLOYEE
    // {
    //     setGetCustomerId(employeeId);
    //     invokeViewModal(true);
    // }

    // const handleUpdateClick = (sendId:any,sendName:any,sendEmail:any,sendPhone:any,
    //                         sendStreet:any,sendTown:any,sendCity:any, sendZipcode:any) => 
    // { 
    //     navigate('../employee/add-employee',
    //             {state:
    //                 {
    //                     type: "Update",
    //                     id: sendId, name: sendName, email: sendEmail, phone: sendPhone,
    //                     street: sendStreet, town: sendTown, city: sendCity, zipcode: sendZipcode
    //                 }
    //             });
    // }

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
        <div className="my-container shadow">
            <h3>Employee List</h3>
            <div className="table-responsive card">
                <table className="table table-bordered table-striped ">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                 <tbody>
                    {employees.map((employee,index)=>{
                        const {Id, Username, FullName, Gender, PhoneNumber, Email, IsActive} = employee;
                    return <tr key={index}>
                            <td className="view-info">{index+1}</td>
                            <td className="view-info">{FullName}</td>
                            <td className="view-info">{Email}</td>
                            <td className="view-info">{PhoneNumber}</td>
                            <td className="view-info">{Gender}</td>
                            <td>
                                <button 
                                    type="button" 
                                    className="btn update-btn btn-warning"
                                    // onClick={() => handleUpdateClick(Id, Username, FullName, Gender, PhoneNumber, Email, IsActive)}
                                    >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    // onClick = {() => handleDeleteClick(id)}
                                    >Delete
                                </button>
                            </td>
                            </tr>
                        })}
                 </tbody>
                </table>
            </div>
            {/* <div>
                <Modal show={isView} onHide={() => invokeViewModal(false)} contentClassName="modal-container">
                    <ViewModal getCustomerId={getCustomerId} /> 
                </Modal>
                <Modal show={isShow} onHide={() => invokeDeleteModal(false)} contentClassName="modal-container">
                    <ConfirmDeleteModal deletionCustomerId = {deletionCustomerId} /> 
                </Modal>
            </div> */}
        </div>
        </>
    );
}
export default ViewAllEmployees;