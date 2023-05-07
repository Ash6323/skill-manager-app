import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Employee} from '../Data/Entities';
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const baseURL = "https://localhost:7247/api/Employee";

const ViewAllEmployees = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isView, invokeViewModal] = useState(false);
    const [deletionCustomerId, setDeletionCustomerId] = useState<string>("");
    const navigate = useNavigate();
    
    const getEmployees = () => {
        axios.get(baseURL).then((response) => 
        {
            console.log("Inside get.then");
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
        getEmployees();

      }, []);

    const handleUpdateClick = (sendId:string,fullName: string,username:string,phoneNumber:string,email:string,
                            gender:string,street:string,town:string,city:string,zipcode:string,dateOfBirth:string,
                            previousOrganisation:string,previousDesignation:string) => 
    { 
        navigate('../employee/update',
        {state:
            {
                type: "Update",
                id: sendId, fullName: fullName,username: username,phoneNumber: phoneNumber,email: email,gender: gender,street: street,town: town,
                city: city,zipcode: zipcode,dateOfBirth: dateOfBirth,previousOrganisation: previousOrganisation,
                previousDesignation: previousDesignation
            }
        });
    }

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
            <div className="row">
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn submit-btn new-emp-btn" onClick={()=>navigate("../employees/add-new")}>
                        Add New
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col justify-content-center">
                    <h3>Employee List</h3>
                </div>
            </div>
            <hr></hr>

            <div className="table-responsive card">
                <table className="table table-bordered table-striped ">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                 <tbody>
                    {employees.map((employee,index)=>{
                    return <tr key={index}>
                            <td className="view-info">{index+1}</td>
                            <td className="view-info">{employee.fullName}</td>
                            <td className="view-info">{employee.email}</td>
                            <td className="view-info">{employee.phoneNumber}</td>
                            <td className="view-info">{employee.gender}</td>
                            <td>
                                <button 
                                    type="button" 
                                    className="btn update-btn btn-warning"
                                    onClick={() => handleUpdateClick(employee.id, employee.fullName,employee.userName,employee.phoneNumber,
                                                employee.email,employee.gender,employee.street,employee.town,employee.city,employee.zipcode,
                                                employee.dateOfBirth,employee.previousOrganisation,employee.previousDesignation)}>
                                    Update
                                </button>
                                {/* <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick = {() => handleDeleteClick(id)}
                                    >Delete
                                </button> */}
                            </td>
                            </tr>
                        })}
                 </tbody>
                </table>
            </div>
            {/* <div>
                <Modal show={isShow} onHide={() => invokeDeleteModal(false)} contentClassName="modal-container">
                    <ConfirmDeleteModal deletionCustomerId = {deletionCustomerId} /> 
                </Modal>
            </div> */}
        </div>
        </>
    );
}
export default ViewAllEmployees;