import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Employee} from '../Data/Entities';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const baseURL = "https://localhost:7247/api/Employee";

const ViewAllEmployees = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const navigate = useNavigate();
    
    const getEmployees = () => {
        axios.get(baseURL).then((response) => 
        {
            setEmployees(response.data.data);

        }).catch(error => {
            if(error.response)
            {
                toast.error(error.response.data.data, {
                    position: toast.POSITION.TOP_RIGHT        
                });
            }
            else if (error.request)
            {
                if (error.response.status == 403 || error.response.status == 401) {
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
    const filteredEmployees = 
    {
        list: employees.filter((item) =>item.fullName.toLowerCase().includes(search.toLowerCase())),
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        setSearch(event.target.value);
    };

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
    return (
        <>
        <div className="my-container shadow">
            <div className="row">
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn submit-btn new-emp-btn" onClick={()=>navigate("../employees/add-new")}>
                        <i className="bi bi-person-plus-fill px-1"></i> Add New
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col justify-content-center">
                    <h3>Employee List</h3>
                </div>
            </div>
            <div className="d-flex justify-space-between align-items-center">
                <div className="mx-4 col-md-3">
                <input 
                    list="employees-list" type="text" onChange={handleSearch} placeholder="Search for an Employee"
                    className="form-control" id="item-search-input">
                </input>
                
                <datalist id="employees-list">
                    {employees.map((item) => (
                    <div key={item.fullName}>
                        <option value={item.fullName}></option>
                    </div>
                    ))}
                </datalist>
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
                    {filteredEmployees.list.map((employee,index)=>{
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
                                    <i className="bi bi-pencil-square px-1"></i> Update
                                </button>
                            </td>
                            </tr>
                        })}
                 </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
        </>
    );
}
export default ViewAllEmployees;