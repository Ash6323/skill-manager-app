import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {NewEmployee, UpdateAdmin, UpdateEmployee} from '../data/Entities';
import useHttp from "../../config/https";
import {useLocation} from 'react-router-dom';
import Loader from '../loaders/Loader';

const AddEmployee = () => {

    const navigate = useNavigate();
    const {axiosInstance, loading} = useHttp();
    const [newEmployee,setNewEmployee]=useState<NewEmployee>
                                    ({firstName:"",lastName: "",username:"",phoneNumber:"",email:"",password:"",gender:"",
                                    street:"",town:"",city:"",zipcode:"",dateOfBirth:"",previousOrganisation:"",previousDesignation:""});
    const [genders, setGenders] = useState<string[]>([]);
    const [formHeading, setFormHeading] = useState<string>("Add Employee Details");
    const [submitButtonValue, setSubmitButtonValue] = useState<string>("Submit");
    const [validFirstNameFlag, setValidFirstNameFlag] = useState<boolean>(false);
    const [validLastNameFlag, setValidLastNameFlag] = useState<boolean>(false);
    const [validUsernameFlag, setValidUserNameFlag] = useState<boolean>(false);
    const [validPhoneFlag, setValidPhoneFlag] = useState<boolean>(false);
    const [validEmailFlag, setValidEmailFlag] = useState<boolean>(false);
    const [validPasswordFlag, setValidPasswordFlag] = useState<boolean>(false);
    const [validStreetFlag, setValidStreetFlag] = useState<boolean>(false);
    const [validTownFlag, setValidTownFlag] = useState<boolean>(false);
    const [validCityFlag, setValidCityFlag] = useState<boolean>(false);
    const [validZipcodeFlag, setValidZipcodeFlag] = useState<boolean>(false);
    const [validDateFlag, setValidDateFlag] = useState<boolean>(false);
    const [validOrgNameFlag, setValidOrgNameFlag] = useState<boolean>(false);
    const [validDesignationFlag, setValidDesignationFlag] = useState<boolean>(false);
    const [updatedEmployeeId, setUpdatedEmployeeId] = useState<string>("");
    const user = JSON.parse(localStorage.getItem("User") || '{}');

    const location = useLocation();

    const getGenders = () => {
        axiosInstance.get(`Employee/Gender`).then((response) => 
        {
            setGenders(response.data.data);
        }).catch(error => {
            if (error.request)
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
        else if (newEmployee.username === "") 
        {
            setValidUserNameFlag(true);
        }
        else if(!validPhone.test(newEmployee.phoneNumber))
        {
            setValidPhoneFlag(true);
        }
        else if(!validEmail.test(newEmployee.email))
        {
            setValidEmailFlag(true);
        }
        else if(newEmployee.street === "")
        {
            setValidStreetFlag(true);
        }
        else if(newEmployee.town === "")
        {
            setValidTownFlag(true);
        }
        else if(newEmployee.city === "")
        {
            setValidCityFlag(true);
        }
        else if(!validZipcode.test(newEmployee.zipcode))
        {
            setValidZipcodeFlag(true);
        }
        else if(newEmployee.dateOfBirth === "")
        {
            setValidDateFlag(true);
        }
        else if(newEmployee.previousOrganisation === "") 
        {
            setValidOrgNameFlag(true);
        }
        else if(newEmployee.previousOrganisation === "")
        {
            setValidDesignationFlag(true);
        }
        else
        {
            if(submitButtonValue === "Submit")
            {
                axiosInstance.post(`Auth/EmployeeRegistration`, newEmployee)
                .then(response => 
                {
                    setDefaultValues();
                    navigate("../employees/view-all");
                }).catch(error => {
                    if(error.response)
                    {
                        setValidPasswordFlag(true);
                        // toast.error(error.response.data.message, {
                        //     position: toast.POSITION.TOP_RIGHT        
                        // });
                    }
                    else if (error.request)
                    {
                        toast.error("Server Inactive or Busy", {
                            position: toast.POSITION.TOP_RIGHT        
                        });
                    }
                });
            }
            else if(submitButtonValue === "Update Self" && user.role === "Admin")
            {
                const data : UpdateAdmin = ({userName:newEmployee.username, firstName:newEmployee.firstName,lastName: newEmployee.lastName,
                    gender:newEmployee.gender,phoneNumber:newEmployee.phoneNumber,email:newEmployee.email,profilePictureUrl:"",street:newEmployee.street,
                    town:newEmployee.town,city:newEmployee.city,zipcode:newEmployee.zipcode,dateOfBirth:newEmployee.dateOfBirth});

                axiosInstance.put(`Admin/${updatedEmployeeId}`, data)
                .then(response => 
                {
                    navigate("../profile");
                }).catch(error => {
                    if(error.response)
                    {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT        
                        });
                    }
                    else if (error.request)
                    {
                        toast.error("Server Inactive or Busy", {
                            position: toast.POSITION.TOP_RIGHT        
                        });
                    }
                  });
                setDefaultValues();
            }
            else
            {
                const data : UpdateEmployee = ({firstName:newEmployee.firstName,lastName: newEmployee.lastName,gender:newEmployee.gender,
                    phoneNumber:newEmployee.phoneNumber,email:newEmployee.email,profilePictureUrl:"",street:newEmployee.street,
                    town:newEmployee.town,city:newEmployee.city,zipcode:newEmployee.zipcode,dateOfBirth:newEmployee.dateOfBirth});

                axiosInstance.put(`Employee/${updatedEmployeeId}`, data)
                .then(response => 
                {
                    if(location.state != null && location.state.type === "Update")
                        navigate("../employees/view-all");
                    else if(location.state != null && location.state.type === "UpdateSelf")
                        navigate("../profile");
                }).catch(error => {
                    if(error.response)
                    {
                        toast.error(error.response.data.message, {
                            position: toast.POSITION.TOP_RIGHT        
                        });
                    }
                    else if (error.request)
                    {
                        toast.error("Server Inactive or Busy", {
                            position: toast.POSITION.TOP_RIGHT        
                        });
                    }
                  });
                setDefaultValues();
            }
        }
    }

    const handleCancelButton = () => {
        if(location.state != null && location.state.type === "Update")
            navigate("../employees/view-all");
        else if(location.state != null && location.state.type === "UpdateSelf")
            navigate("../profile");
        else
            navigate("../home");
    }

    useEffect(()=> {
    if(location.state != null && location.state.type === "Update")
    {
        setFormHeading("Update Employee Details");
        setSubmitButtonValue("Update");
        const name_array = location.state.fullName.split(" ");
        setUpdatedEmployeeId(location.state.id); 
        newEmployee.firstName = name_array[0];
        newEmployee.lastName = name_array[1];
        newEmployee.username = location.state.username;
        newEmployee.gender = location.state.gender;
        newEmployee.phoneNumber = location.state.phoneNumber;
        newEmployee.email = location.state.email;
        newEmployee.street = location.state.street;
        newEmployee.town = location.state.town;
        newEmployee.city = location.state.city;
        newEmployee.zipcode = location.state.zipcode;
        newEmployee.dateOfBirth = location.state.dateOfBirth;
        newEmployee.previousOrganisation = location.state.previousOrganisation;
        newEmployee.previousDesignation = location.state.previousDesignation;
    }
    else if(location.state != null && location.state.type === "UpdateSelf")
    {
        setFormHeading("Update Profile");
        setSubmitButtonValue("Update Self");
        const name_array = location.state.fullName.split(" ");
        setUpdatedEmployeeId(location.state.id); 
        newEmployee.firstName = name_array[0];
        newEmployee.lastName = name_array[1];
        newEmployee.username = location.state.username;
        newEmployee.gender = location.state.gender;
        newEmployee.phoneNumber = location.state.phoneNumber;
        newEmployee.email = location.state.email;
        newEmployee.street = location.state.street;
        newEmployee.town = location.state.town;
        newEmployee.city = location.state.city;
        newEmployee.zipcode = location.state.zipcode;
        newEmployee.dateOfBirth = location.state.dateOfBirth;
        newEmployee.previousOrganisation = location.state.previousOrganisation;
        newEmployee.previousDesignation = location.state.previousDesignation;
    }
    getGenders();
    },[location.state])
   
    return (
      <>
        {loading ? <Loader /> : ""}
        <div className="my-container shadow">
            <h3>{formHeading}</h3>
            <hr></hr>
            <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center card shadow-2-strong card-registration col-md-10 pt-3'>
                    <form onSubmit={handleSubmit}>

                        <div className="row g-3 input-row">

                            <label className="col-md-2">
                                First Name
                            </label>
                            <input type="text" name="firstName" value={newEmployee.firstName}
                            placeholder="Enter First Name"
                            className="input-item-details col-md-4" onChange={HandleChange} />

                            <label className="col-md-2">
                                Last Name
                            </label>
                            <input type="text" name="lastName" value={newEmployee.lastName}
                            placeholder="Enter Last Name"
                            className="input-item-details col-md-4" onChange={HandleChange} />
                        </div>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-3'>
                                {validFirstNameFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                            <div className='col-md-3'></div>
                            <div className='col-md-3'>
                                {validLastNameFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                        </div>
                        {
                        submitButtonValue === 'Submit' &&
                        <div className="row g-3 input-row">
                            <label className="col-md-2">
                                Username
                            </label>
                            <input type="text" name="username" value={newEmployee.username}
                            placeholder="Enter Username" 
                            className="input-item-details col-md-4" onChange={HandleChange} />
                            
                            <label className="col-md-2">
                                Password
                            </label>
                            <input type="password" name="password" value={newEmployee.password}
                            placeholder="Enter Password"
                            className="input-item-details col-md-4" onChange={HandleChange} />
                        </div> 
                        }
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-3'>
                                {validUsernameFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-4'>
                                {validPasswordFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                        </div>
                        <div className="row g-3 input-row">
                            <label className="col-md-2">
                                Phone
                            </label>
                            <input type="text" name="phoneNumber" value={newEmployee.phoneNumber}
                            placeholder="Enter Phone No."
                            className="input-item-details col-md-4" onChange={HandleChange} />

                            <label className="col-md-2">
                                Email
                            </label>
                            <input type="text" name="email" value={newEmployee.email}
                            placeholder="Enter Email"
                            className="input-item-details col-md-4" onChange={HandleChange} />
                        </div>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-3'>
                                {validPhoneFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-4'>
                                {validEmailFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                        </div>
                        <div className="row g-3 input-row">
                            <label className="col-md-2">
                                Street
                            </label>
                            <input type="text" name="street" value={newEmployee.street}
                            placeholder="Enter Street"
                            className="input-item-details col-md-4" onChange={HandleChange} />
                            <label className="col-md-2">
                                Town
                            </label>
                            <input type="text" name="town" value={newEmployee.town}
                            placeholder="Enter Town"
                            className="input-item-details col-md-4" onChange={HandleChange} />
                        </div>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-3'>
                                {validStreetFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-4'>
                                {validTownFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                        </div>
                        <div className="row g-3 input-row">
                            <label className="col-md-2">
                                City
                            </label>
                            <input type="text" name="city" value={newEmployee.city}
                            placeholder="Enter City"
                            className="input-item-details col-md-4" onChange={HandleChange} />
                            <label className="col-md-2">
                                Zipcode
                            </label>
                            <input type="text" name="zipcode" value={newEmployee.zipcode}
                            placeholder="Enter Zipcode"
                            className="input-item-details col-md-4" onChange={HandleChange} />
                        </div>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-3'>
                                {validCityFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-4'>
                                {validZipcodeFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                        </div>
                        {submitButtonValue === 'Submit' && 
                        <div className="row g-3 input-row">
                            <label className="col-md-2">
                                Date of Birth
                            </label>
                            <input type="date" name="dateOfBirth" value={newEmployee.dateOfBirth}
                                className="input-item-details col-md-4" onChange={HandleChange} />
                            <label className="col-md-2">
                                Gender
                            </label>
                            <select required id = "gender-dropdown" className="input-item-details col-md-4" name="gender"
                                    defaultValue="Select-Gender" onChange={HandleChange} >
                                <option value= "Select-Gender" disabled>Select Gender</option>
                                {genders.map((gender, index) => { 
                                return (<option key= {index} value={ gender }>
                                            {gender}
                                        </option>);
                                })}
                            </select>
                        </div>}
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-3'>
                                {validDateFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                        </div>
                        {
                        submitButtonValue === 'Submit' &&
                        <div className="row g-3 input-row">
                            <label className="col-md-2">
                                Previous Organisation
                            </label>
                            <input type="text" name="previousOrganisation" value={newEmployee.previousOrganisation}
                            placeholder="Enter Previous Organisation" 
                            className="input-item-details col-md-4" onChange={HandleChange} />
                            <label className="col-md-2">
                                Previous Designation
                            </label>
                            <input type="text" name="previousDesignation" value={newEmployee.previousDesignation}
                            placeholder="Enter Previous Designation" 
                            className="input-item-details col-md-4" onChange={HandleChange}/>
                        </div>
                        }
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-3'>
                                {validOrgNameFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-4'>
                                {validDesignationFlag ? <p className="text-danger font-weight-bold text-sm">
                                Invalid Entry. Please Try Again</p> : null}
                            </div>
                        </div>
                        <button className="btn btn-danger mt-4 mb-4 m-2" onClick={handleCancelButton}>
                            <i className="bi bi-x-circle-fill mx-1"></i> Cancel
                        </button>
                        {submitButtonValue === 'Submit' &&
                        <button type="submit" className="btn add-new-btn mt-4 m-2 mb-4">
                            <i className="bi bi-check-circle-fill mx-1"></i> {submitButtonValue}
                        </button>}
                        {submitButtonValue === 'Update' &&
                        <button type="submit" className="btn update-btn btn-warning mt-4 m-2 mb-4">
                            <i className="bi bi-pencil-square px-1"></i> {submitButtonValue}
                        </button>}
                        {submitButtonValue === 'Update Self' &&
                        <button type="submit" className="btn update-btn btn-warning mt-4 m-2 mb-4">
                            <i className="bi bi-pencil-square px-1"></i> {submitButtonValue}
                        </button>}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
      </>
    );
}
export default AddEmployee