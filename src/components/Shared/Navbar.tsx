import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import AvatarImage from '../../res/img_avatar.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IXBanner from '../../res/IX-banner.png';

interface IProfile {
    userFullName: string,
}

const adminBaseURL = "https://localhost:7247/api/Admin";
const employeeBaseURL = "https://localhost:7247/api/Employee";


const Navbar: React.FC<IProfile> = ({userFullName}) => {

    const [signIn, setSignIn] = useState<string>("Sign In"); 
    const userProps = JSON.parse(localStorage.getItem("User") || '{}');
    const [profileImage, setProfileImage] = useState<string>(); 
    const navigate = useNavigate();

    const getUser = () => {
        const url = userProps.role=="Admin"? adminBaseURL : employeeBaseURL;
        axios.get(`${url}/${userProps.userId}`).then((response) => 
        {
            console.log(response.data.data);
            setProfileImage(response.data.data.profilePictureUrl);
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

    const profileNavigator = ()=> {
        if(userFullName === "Anonymous")
            navigate("/");
        else
            navigate("profile");
    }
    
    useEffect( () => {
        if(localStorage.getItem("User") != null)
        {
            setSignIn("Sign Out");
            getUser();
        }
    },[]);

    const HandleSignOut = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
        <header className="mt-3 mb-1 border-bottom">
            <div className="container-fluid">
                <div className="d-flex flex-wrap justify-content-between">
                    <a className="d-flex align-items-center text-dark text-decoration-none">
                        <img className="ix-banner" src={IXBanner}></img>
                    </a>

                    <a className="d-block link-dark text-decoration-none dropdown-toggle mx-2" id="dropdownUser1"
                                data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={profileImage? profileImage:AvatarImage } width="32" height="32" className="rounded-circle"></img>
                    </a>
                    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" onClick={profileNavigator}>
                            {userFullName}</a>
                        </li>
                        <li><hr className="dropdown-divider"></hr></li>
                        <li><a className="dropdown-item" onClick={HandleSignOut}>{signIn}</a></li>
                    </ul>
                </div>
            </div>
        </header></>
    );
};
export default Navbar;