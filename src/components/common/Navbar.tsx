import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import AvatarImage from '../../assets/images/img_avatar.png';
import IXBanner from '../../assets/images/IX-banner.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from "../../config/https";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUser, logout } from "../../features/user/userSlice";

interface IProfile {
    userFullName: string,
}

const Navbar: React.FC<IProfile> = ({userFullName}) => {

    const [signIn, setSignIn] = useState<string>("Sign In"); 
    const userProps = JSON.parse(localStorage.getItem("User") || '{}');
    const [profileImage, setProfileImage] = useState<string>();
    const { axiosInstance } = useHttp();
    const navigate = useNavigate();

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const getUser = () => {
        const url = userProps.role === "Admin" ? `Admin` : `Employee`;
        axiosInstance.get(`${url}/${userProps.userId}`).then((response) =>
        {
            setProfileImage(response.data.data.profilePictureUrl);
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
    }

    const profileNavigator = () => {
        if (userFullName === "Anonymous")
            navigate("/");
        else
            navigate("profile");
    }
    
    useEffect( () => {
        if(localStorage.getItem("User") != null)
        {
            setSignIn("Sign Out");
            // getUser();
            dispatch(fetchUser());
        }
    },[]);

    const handleSignOut = () => {
        localStorage.clear();
        dispatch(logout());
        navigate("/");
    }

    return (
        <>
        <header className="mt-3 mb-1 border-bottom">
            <div className="container-fluid">
                <div className="d-flex flex-wrap justify-content-between">
                    <a className="d-flex align-items-center text-dark text-decoration-none">
                        <img className="ix-banner" src={IXBanner} alt="IX-banner-image"></img>
                    </a>

                    <a className="d-block link-dark text-decoration-none dropdown-toggle mx-2" id="dropdownUser1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        {/* <img src={profileImage? `https://localhost:7247/${profileImage}`: AvatarImage }
                                width="32" height="32" className="rounded-circle" alt="user-image"> */}
                        <img src={user.user.profilePictureUrl? `https://localhost:7247/${user.user.profilePictureUrl}`: AvatarImage }
                                width="32" height="32" className="rounded-circle" alt="user-image">
                            {/* `https://employee-skill-manager2.azurewebsites.net/${profileImage} */}
                        </img>
                    </a>
                    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                        <li>
                            <a className="dropdown-item" onClick={profileNavigator}>
                                <i className="bi bi-person-fill"></i> {userFullName}
                                {/* <i className="bi bi-person-fill"></i> {user.user.fullName} */}
                            </a>
                        </li>
                        <li><hr className="dropdown-divider"></hr></li>
                        <li><a className="dropdown-item" onClick={handleSignOut}>
                            <i className="bi bi-box-arrow-right"></i> {signIn}</a>
                        </li>
                    </ul>
                </div>
            </div>
            {user.error ? <ToastContainer /> : null}
            {/* <ToastContainer /> */}
        </header></>
    );
};
export default Navbar;
