import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {NewEmployee} from './Entities';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

const baseURL = "https://localhost:7247/api/Employee";
const genderEnumURL = "https://localhost:7247/api/Employee/Gender";

const AddEmployee = () => {

    const navigate = useNavigate();
    const [newEmployee,setNewEmployee]=useState<NewEmployee>
                                        ({firstName:"",lastName: "",userName:"",phoneNumber:"",email:"",password:"",gender:""});
    const [genders, setGenders] = useState<string[]>([]);
    const [formHeading, setFormHeading] = useState<string>("Add Employee Details");
    const [submitButtonValue, setSubmitButtonValue] = useState<string>("Submit");
    const [data,setData]=useState({id:"",userName:"",fullName:"",gender:"",phoneNumber:"",email:"",isActive:0});
    const location = useLocation();

    const getGenders = () => {
        axios.get(genderEnumURL).then((response) => 
        {
            setGenders(response.data.data);
        }).catch(error => {
            if(error.response)
            {
                alert(error.response.data.message);
            }
            else if (error.request)
            {
                alert("Server Inactive or Busy");
            }
        });
    }

    const HandleChange = (e:any) =>{
        const {name,value} = e.target;
        setNewEmployee({...newEmployee, [name]:value})
    }

    const setDefaultValues = () =>
    {
        setNewEmployee({firstName:"",lastName: "",userName:"",phoneNumber:"",email:"",password:"",gender:""});
    }

    const handleSubmit = (e:any) => 
    {
        e.preventDefault();
        const validName = new RegExp('^[a-zA-z]+([\s][a-zA-Z]+)*$');
        const validEmail = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
        const validPhone = new RegExp("^[0-9]{10}$");
        const validZipcode = new RegExp("^[0-9]{6}$");
        
        // if (!validName.test(custName)) 
        // {
        //     alert("Please enter a valid Name");
        // }
        if(newEmployee.firstName == "")
        {
            alert("Please Enter First Name");
        }
        else if(newEmployee.lastName == "")
        {
            alert("Please Enter Last Name");
        }
        else if(newEmployee.userName == "")
        {
            alert("Please Enter a Username");
        }
        else if(newEmployee.phoneNumber == "")
        {
            alert("Please Enter a Phone Number");
        }
        else if(newEmployee.email == "")
        {
            alert("Please Enter an email");
        }
        else if(newEmployee.password == "")
        {
            alert("Please Enter a Password");
        }
        else if(newEmployee.gender == "")
        {
            alert("Please select a Gender");
        }
        else
        {
            if(submitButtonValue=== "Submit")
            {
                // axios.post(baseURL, newEmployee)
                // .then(response => 
                // {
                //     navigate("employees/view-all");
                // })
                setDefaultValues();
            }
            else
            {
                // axios.put(`${baseURL}/${data.id}`, newEmployee)
                // .then(response => 
                // {
                //     navigate("../Customer/ViewAllCustomers");
                // })
                // setDefaultValues();
            }
        }
    }

    const handleCancelButton = () => {
        navigate("../employees/view-all");
        // console.log(newEmployee);
    }

    useEffect(()=> {
    if(location.state != null && location.state.type === "Update")
    {
        setFormHeading("Update Customer Details");
        setSubmitButtonValue("Update");
        // data.id = location.state.id;
        // data.name = location.state.name;
        // data.email = location.state.email;
        // data.phone = location.state.phone;
        // data.street = location.state.street;
        // data.town = location.state.town;
        // data.city = location.state.city;
        // data.zipcode = location.state.zipcode;
    
        // // setCustId(data.id);
        // setCustName(data.name);
        // setCustEmail(data.email);
        // setCustPhone(data.phone);
        // setCustStreet(data.street);
        // setCustTown(data.town);
        // setCustCity(data.city);
        // setCustZipcode(data.zipcode);
    }
    else
    {
        setFormHeading("Add Employee Details");
        setSubmitButtonValue("Submit");
        // data.id = 0;
        // data.name = '';
        // data.email = '';
        // data.phone = '';
        // data.street = '';
        // data.town = '';
        // data.city = '';
        // data.zipcode = '';
    
        // // setCustId(data.id);
        // setCustName(data.name);
        // setCustEmail(data.email);
        // setCustPhone(data.phone);
        // setCustStreet(data.street);
        // setCustTown(data.town);
        // setCustCity(data.city);
        // setCustZipcode(data.zipcode);
    }
    getGenders();
    },[location.state])
   
    return (
        <>
        <div className="my-container shadow">
            <h3>{formHeading}</h3>
            <hr></hr>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 input-row">
                        <label className="col-md-4">
                        First Name
                        <input type="text" name="firstName" value={newEmployee.firstName}
                        placeholder="Enter First Name"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>

                        <label className="col-md-4">
                        Last Name
                        <input type="text" name="lastName" value={newEmployee.lastName}
                        placeholder="Enter Last Name"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>

                        <label className="col-md-4">
                        Username
                        <input type="text" name="userName" value={newEmployee.userName}
                        placeholder="Enter Username"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>
                    </div>           
                    <div className="row g-3 input-row">
                    <label className="col-md-4">
                        Phone
                        <input type="text" name="phoneNumber" value={newEmployee.phoneNumber}
                        placeholder="Enter Phone No."
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>

                        <label className="col-md-4">
                        Email
                        <input type="text" name="email" value={newEmployee.email}
                        placeholder="Enter Email"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>

                        <label className="col-md-4">
                            Password
                            <input type="password" name="password" value={newEmployee.password}
                            placeholder="Enter Password"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                    </div>
                    <div className="row g-3 input-row">
                    <label className="col-md-4">
                        Address
                        <input type="text" name="address" value={newEmployee.phoneNumber}
                        placeholder="Enter Address"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <label className="col-md-4">
                        Zipcode
                        <input type="text" name="zipcode" value={newEmployee.email}
                        placeholder="Enter Zipcode"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <label className="col-md-4">
                            Date of Birth
                            <input type="date" name="dateOfBirth" value={newEmployee.password}
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                    </div>
                    <div className="row g-3 input-row">
                        <label className="col-md-4">
                            Previous Organisation
                            <input type="text" name="previousEmployer" value={newEmployee.email}
                            placeholder="Enter Previous Organisation"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <label className="col-md-4">
                            Previous Designation
                            <input type="text" name="previousDesignation" value={newEmployee.email}
                            placeholder="Enter Previous Designation"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <label className="col-md-4">
                            Gender
                            <br></br>
                            <select required id = "gender-dropdown" className="mt-1 input-item-details" name="gender"
                                    defaultValue="Select-Gender"
                                    onChange={HandleChange} >
                                <option value= "Select-Gender" disabled>Select Gender</option>
                                {genders.map((gender, index) => { 
                                return (<option key= {index} value={ gender=="Male"? "M":"F" }>
                                            {gender}
                                        </option>);
                                })}
                        </select>
                        </label>
                    </div>
                    <button type="submit" className="btn submit-btn" 
                            >{submitButtonValue}</button>
                    <button className="btn btn-danger" onClick={handleCancelButton}>Cancel</button>
                </form>
            </div>
        </div>
        </>
    );
}
export default AddEmployee