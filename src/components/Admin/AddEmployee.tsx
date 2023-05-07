import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {NewEmployee} from '../Data/Entities';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

const baseURL = "https://localhost:7247/api/Employee";
const genderEnumURL = "https://localhost:7247/api/Employee/Gender";

const AddEmployee = () => {

    const navigate = useNavigate();
    const [newEmployee,setNewEmployee]=useState<NewEmployee>
                                    ({firstName:"",lastName: "",username:"",phoneNumber:"",email:"",password:"",gender:"",
                                    street:"",town:"",city:"",zipcode:"",dateOfBirth:"",previousOrganisation:"",previousDesignation:""});
    const [genders, setGenders] = useState<string[]>([]);
    const [formHeading, setFormHeading] = useState<string>("Add Employee Details");
    const [submitButtonValue, setSubmitButtonValue] = useState<string>("Submit");
    const [validFirstNameFlag, setValidFirstNameFlag] = useState<boolean>(false);
    const [validLastNameFlag, setValidLastNameFlag] = useState<boolean>(false);
    const [validPhoneFlag, setValidPhoneFlag] = useState<boolean>(false);
    const [validEmailFlag, setValidEmailFlag] = useState<boolean>(false);
    const [validPasswordFlag, setValidPasswordFlag] = useState<boolean>(false);
    const [validZipcodeFlag, setValidZipcodeFlag] = useState<boolean>(false);
    const [validOrgNameFlag, setValidOrgNameFlag] = useState<boolean>(false);
    const [validDesignationFlag, setValidDesignationFlag] = useState<boolean>(false);
    const [data,setData]=useState({firstName:"",lastName: "",username:"",phoneNumber:"",email:"",password:"",gender:"",
                                    street:"",town:"",city:"",zipcode:"",dateOfBirth:"",previousOrganisation:"",previousDesignation:""});
    const location = useLocation();

    const getGenders = () => {
        axios.get(genderEnumURL).then((response) => 
        {
            setGenders(response.data.data);
        }).catch(error => {
            if (error.request)
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
        setNewEmployee({firstName:"",lastName: "",username:"",phoneNumber:"",email:"",password:"",gender:"",
                        street:"",town:"",city:"",zipcode:"",dateOfBirth:"",previousOrganisation:"",previousDesignation:""});
    }

    const handleSubmit = (e:any) => 
    {
        e.preventDefault();
        const validName = new RegExp('^[a-zA-z]+([\s][a-zA-Z]+)*$');
        const validOrganisationName = new RegExp("^[A-Za-z]+[A-Za-z ]*$");
        const validDesignation = new RegExp("^[A-Za-z]+[A-Za-z ]*$");
        const validEmail = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
        const validPhone = new RegExp("^[0-9]{10}$");
        const validZipcode = new RegExp("^[0-9]{6}$");

        if (!validName.test(newEmployee.firstName)) 
        {
            setValidFirstNameFlag(true);
        }
        else if(!validName.test(newEmployee.lastName))
        {
            setValidLastNameFlag(true);
        }
        else if(!validPhone.test(newEmployee.phoneNumber))
        {
            setValidPhoneFlag(true);
        }
        else if(!validEmail.test(newEmployee.email))
        {
            setValidEmailFlag(true);
        }
        else if(!validZipcode.test(newEmployee.zipcode))
        {
            setValidZipcodeFlag(true);
        }
        else if(!validOrganisationName.test(newEmployee.previousOrganisation))
        {
            setValidOrgNameFlag(true);
        }
        else if(!validDesignation.test(newEmployee.previousDesignation))
        {
            setValidDesignationFlag(true);
        }
        else
        {
            if(submitButtonValue === "Submit")
            {
                axios.post(baseURL, newEmployee)
                .then(response => 
                {
                    console.log(response.data);
                    setDefaultValues();
                    navigate("../employees/view-all");
                }).catch(error => {
                    if(error.response)
                    {
                        setValidPasswordFlag(true);
                        console.log(error.response.data.title);
                    }
                    else if (error.request)
                    {
                        alert("Server Inactive or Busy");
                    }
                });
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
        <div className="row justify-content-center my-container shadow">
          <h3>{formHeading}</h3>
          <hr></hr>

          <div className='card shadow-2-strong card-registration col-md-10'>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 input-row">
                        <label className="col-md-4"> 
                        First Name
                        <input type="text" name="firstName" value={newEmployee.firstName}
                        placeholder="Enter First Name"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>
                    <div className='col-md-1'></div>
                        <label className="col-md-4">
                        Last Name
                        <input type="text" name="lastName" value={newEmployee.lastName}
                        placeholder="Enter Last Name"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            {validFirstNameFlag ? <p className="text-danger font-weight-bold text-sm">
                            Invalid Entry. Please Try Again</p> : null}
                        </div>
                        <div className='col-md-1'></div>
                        <div className='col-md-4'>
                            {validLastNameFlag ? <p className="text-danger font-weight-bold text-sm">
                            Invalid Entry. Please Try Again</p> : null}
                        </div>
                    </div>
                    <div className="row g-3 input-row">
                        <label className="col-md-4">
                        Username
                        <input type="text" name="username" value={newEmployee.username}
                        placeholder="Enter Username"
                        className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <div className='col-md-1'></div>
                        <label className="col-md-4">
                            Password
                            <input type="password" name="password" value={newEmployee.password}
                            placeholder="Enter Password"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                    </div> 
                    <div className='row'>
                        <div className='col-md-4'></div>
                        <div className='col-md-1'></div>
                        <div className='col-md-4'>
                            {validPasswordFlag ? <p className="text-danger font-weight-bold text-sm">
                            Invalid Entry. Please Try Again</p> : null}
                        </div>
                    </div>

                    <div className="row g-3 input-row">
                        <label className="col-md-4">
                            Phone
                            <input type="text" name="phoneNumber" value={newEmployee.phoneNumber}
                            placeholder="Enter Phone No."
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <div className='col-md-1'></div>
                        <label className="col-md-4">
                            Email
                            <input type="text" name="email" value={newEmployee.email}
                            placeholder="Enter Email"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            {validPhoneFlag ? <p className="text-danger font-weight-bold text-sm">
                            Invalid Entry. Please Try Again</p> : null}
                        </div>
                        <div className='col-md-1'></div>
                        <div className='col-md-4'>
                            {validEmailFlag ? <p className="text-danger font-weight-bold text-sm">
                            Invalid Entry. Please Try Again</p> : null}
                        </div>
                    </div>
                    <div className="row g-3 input-row">
                        <label className="col-md-4">
                            Street
                            <input type="text" name="street" value={newEmployee.street}
                            placeholder="Enter Street"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <div className='col-md-1'></div>
                        <label className="col-md-4">
                            Town
                            <input type="text" name="town" value={newEmployee.town}
                            placeholder="Enter Town"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <div className="row g-3 input-row">
                        <label className="col-md-4">
                            City
                            <input type="text" name="city" value={newEmployee.city}
                            placeholder="Enter City"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <div className='col-md-1'></div>
                        <label className="col-md-4">
                            Zipcode
                            <input type="text" name="zipcode" value={newEmployee.zipcode}
                            placeholder="Enter Zipcode"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        </div>
                        <div className='row'>
                        <div className='col-md-4'>
                            {false ? <p className="text-danger font-weight-bold text-sm">
                            Invalid Entry. Please Try Again</p> : null}
                        </div>
                        <div className='col-md-4'>
                            {validZipcodeFlag ? <p className="text-danger font-weight-bold text-sm">
                            Invalid Entry. Please Try Again</p> : null}
                        </div>
                        </div>
                        <div className="row g-3 input-row">
                        <label className="col-md-4">
                            Date of Birth
                            <input type="date" name="dateOfBirth" value={newEmployee.dateOfBirth}
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <div className='col-md-1'></div>
                        <label className="col-md-4">
                            Gender
                            <select required id = "gender-dropdown" className="input-item-details col-md-12" name="gender"
                                    defaultValue="Select-Gender"
                                    onChange={HandleChange} >
                                <option value= "Select-Gender" disabled>Select Gender</option>
                                {genders.map((gender, index) => { 
                                return (<option key= {index} value={ newEmployee.gender }>
                                            {gender}
                                        </option>);
                                })}
                            </select>
                        </label>
                        </div>
                    </div>
                    <div className="row g-3 input-row">
                        <label className="col-md-4">
                            Previous Organisation
                            <input type="text" name="previousOrganisation" value={newEmployee.previousOrganisation}
                            placeholder="Enter Previous Organisation"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        <div className='col-md-1'></div>
                        <label className="col-md-4">
                            Previous Designation
                            <input type="text" name="previousDesignation" value={newEmployee.previousDesignation}
                            placeholder="Enter Previous Designation"
                            className="input-item-details" onChange={HandleChange} required/>
                        </label>
                        
                    </div>
                    <button className="btn btn-danger mt-3 mb-4 m-3" onClick={handleCancelButton}>Cancel</button>
                    <button type="submit" className="btn add-new-btn mt-3 mb-4">{submitButtonValue}</button>
                </form>
            </div>
        </div>
      </>
    );
}
export default AddEmployee