import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Modal } from "react-bootstrap";
import AvatarImage from '../../res/img_avatar.png';
import {User} from '../Data/Entities';
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const baseURL = "https://localhost:7247/api/Admin";

const Profile = () => {

    const [user, setUser] = useState<User>({id: "", userName: "", fullName: "", gender: "", phoneNumber: "", email: "",
                                                    profilePictureUrl: "", isActive: 0, street: "", town: "", city: "", zipcode: "", 
                                                    dateOfBirth: "", previousOrganisation: "", previousDesignation: ""});
    const navigate = useNavigate();
    const userProps = JSON.parse(localStorage.getItem("User") || '{}');
 
    const getUser = () => {
        axios.get(`${baseURL}/${userProps.userId}`).then((response) => 
        {
            console.log(response.data.data);
            setUser(response.data.data);
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

    React.useEffect( () => {
        getUser();
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
        <div className="my-container shadow ">
            <div className="row">
                {/* <div className="d-flex justify-content-end">
                    <button type="submit" className="btn submit-btn new-emp-btn" onClick={()=>navigate("../employees/add-new")}>
                        Add New
                    </button>
                </div> */}
            </div>
            <div className="row">
                <div className="d-flex col justify-content-center">
                    <h3>Profile</h3>
                </div>
            </div>
            <hr></hr>
            <div className="container d-flex justify-content-center">
                <div className="card shadow-2-strong card-registration col-md-10">
                    <img className="card-img-top card-profile-image mt-2" alt="Profile Image"
                        src={user.profilePictureUrl? user.profilePictureUrl:AvatarImage }>
                    </img>
                    <div className="card-body">
                        <h5 className="card-title">{user.fullName}</h5>
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div className="card-body">
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    );
}
export default Profile;