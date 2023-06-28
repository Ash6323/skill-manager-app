import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Modal} from 'react-bootstrap';
import AvatarImage from '../../res/img_avatar.png';
import {User} from '../Data/Entities';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import useHttp from "../../Config/https";
import PictureUploadModal from '../Admin/Modals/PictureUploadModal';
import PictureRemoveModal from '../Admin/Modals/PictureRemoveModal';
import Loader from '../Loaders/Loader';

const Profile = () => {
    
    const [user, setUser] = useState<User>({id: "", userName: "", fullName: "", gender: "", phoneNumber: "", email: "",
                                                    profilePictureUrl: "", isActive: 0, street: "", town: "", city: "", zipcode: "", 
                                                    dateOfBirth: "", previousOrganisation: "", previousDesignation: ""});
    const [profileImageShow, setProfileImageShow] = useState(false);
    const [imageRemoveShow, setImageRemoveShow] = useState(false);
    const {axiosInstance, loading} = useHttp();
    const navigate = useNavigate();
    const userProps = JSON.parse(localStorage.getItem("User") || '{}');

    const closeProfileModal = (showValue : boolean) =>
    {
        setProfileImageShow(showValue);
    }
    const closePhotoRemoveModal = (showValue : boolean) =>
    {
        setImageRemoveShow(showValue);
    }

    const handlePhotoEditClick = () => {
        setProfileImageShow(true);
    }
    const handlePhotoRemoveClick = () => {
        setImageRemoveShow(true);
    }
 
    const getUser = () => {
        const url = userProps.role === "Admin"? `Admin` : `Employee`;
        axiosInstance.get(`${url}/${userProps.userId}`).then((response) => 
        {
            setUser(response.data.data);
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

    const handleUpdateClick = (sendId:string,fullName: string,username:string,phoneNumber:string,email:string,
                                gender:string,street:string,town:string,city:string,zipcode:string,dateOfBirth:string,
                                previousOrganisation:string,previousDesignation:string) => { 
        navigate("../profile/update",
        {state:
            {
                type: "UpdateSelf",
                id: sendId, fullName: fullName,username: username,phoneNumber: phoneNumber,email: email,gender: gender,street: street,town: town,
                city: city,zipcode: zipcode,dateOfBirth: dateOfBirth,previousOrganisation: previousOrganisation,
                previousDesignation: previousDesignation
            }
        });
    }

    React.useEffect( () => {
        getUser();
    }, [profileImageShow, imageRemoveShow]);
    
    return (
        <>
        <div className="my-container shadow">
            {loading ? <Loader /> : ""}
            <div className="container d-flex justify-content-center mt-4">
                <div className="card shadow-2-strong card-registration col-md-9">
                    <div className="container row mt-5">
                        <div className='col-md-6'>
                            <img id="photo" className="card-img-top card-profile-image mx-5 col-md-6" alt="Profile-Image"
                                // src={user.profilePictureUrl? `https://employee-skill-manager2.azurewebsites.net/${user.profilePictureUrl}`: AvatarImage}/>
                                src={user.profilePictureUrl? `https://localhost:7247/${user.profilePictureUrl}`: AvatarImage}/>
                            <label className="-label" onClick={handlePhotoEditClick}>
                                <span className="text-warning"><i className="bi bi-camera-fill text-warning"></i> Edit Photo</span>
                            </label>
                            <label className="-label" onClick={handlePhotoRemoveClick}>
                                /<span className="text-danger"><i className="bi bi-trash-fill text-danger"></i> Remove</span>
                            </label>
                        </div>
                        <div className="col-md-6 text-start">
                        <ul className="list-unstyled mt-5">
                            <li className="mb-2 mb-xl-3 display-28">
                                <span className="display-26 text-secondary me-2 font-weight-600">Name:</span> {user.fullName}
                            </li>
                            <li className="mb-2 mb-xl-3 display-28">
                                <span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {user.email}
                            </li>
                            <li className="mb-2 mb-xl-3 display-28">
                                <span className="display-26 text-secondary me-2 font-weight-600">Phone:</span> {user.phoneNumber}
                            </li>
                            <li className="display-28">
                                <span className="display-26 text-secondary me-2 font-weight-600">Username:</span> {user.userName}
                            </li>
                        </ul>
                        </div>
                    </div>
                    <hr className='mt-4'></hr>
                    <div className="container row">
                        <div className='col-md-6'>
                            <ul className="list-group list-group-flush text-start mx-3">
                                <li className="mb-2 display-28 list-group-item">
                                    <span className="display-26 text-secondary me-2 font-weight-600">DOB:</span> 
                                        {new Date(user.dateOfBirth).toLocaleDateString()}
                                </li>
                                <li className="mb-2 display-28 list-group-item">
                                    <span className="display-26 text-secondary me-2 font-weight-600">Street:</span> {user.street}
                                </li>
                                <li className="mb-2 display-28 list-group-item">
                                    <span className="display-26 text-secondary me-2 font-weight-600">City:</span> {user.city}
                                </li>
                                <li className="mb-2 display-28 list-group-item">
                                    <span className="display-26 text-secondary me-2 font-weight-600">Previous Organisation:</span> 
                                        {user.previousOrganisation}
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            <ul className="list-group list-group-flush text-start mb-4">
                                <li className="mb-2 display-28 list-group-item">
                                    <span className="display-26 text-secondary me-2 font-weight-600">Gender:</span> {user.gender}
                                </li>
                                <li className="mb-2 display-28 list-group-item">
                                    <span className="display-26 text-secondary me-2 font-weight-600">Town:</span> {user.town}
                                </li>
                                <li className="mb-2 display-28 list-group-item">
                                    <span className="display-26 text-secondary me-2 font-weight-600">Zipcode:</span> {user.zipcode}
                                </li>
                                <li className="mb-2 display-28 list-group-item">
                                    <span className="display-26 text-secondary me-2 font-weight-600">Previous Designation:</span> 
                                        {user.previousDesignation}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="d-flex justify-content-center">
                        <button type="submit" className="btn update-btn btn-warning" 
                                onClick={() => handleUpdateClick(user.id, user.fullName,user.userName,user.phoneNumber,
                                                user.email,user.gender,user.street,user.town,user.city,user.zipcode,
                                                user.dateOfBirth,user.previousOrganisation,user.previousDesignation)}>
                                <i className="bi bi-pencil-square px-1"></i> Update Profile
                        </button>
                    </div>
                </div>
                </div>
                <Modal show={profileImageShow} onHide={() => setProfileImageShow(false)} contentClassName="modal-container">
                    <PictureUploadModal ShowProfileModal={closeProfileModal}/>
                </Modal>
                <Modal show={imageRemoveShow} onHide={() => setImageRemoveShow(false)} contentClassName="modal-container">
                    <PictureRemoveModal ShowPhotoRemoveModal={closePhotoRemoveModal}/>
                </Modal>
            </div>
            <ToastContainer />
        </div>
        </>
    );
}
export default Profile;