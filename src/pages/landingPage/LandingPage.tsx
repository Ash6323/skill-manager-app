import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/common/Navbar";
import Logo from "../../assets/images/IX-logo-2.png";
import { LoginDTO } from "../../data/Entities";
import useHttp from "../../config/https";
import Loader from "../../components/loaders/LandingPageLoader";

const LandingPage = () => {

  const navigate = useNavigate();
  const {axiosInstance, loading} = useHttp();
  const [userDetails, setUserDetails] = useState<LoginDTO>({
    Username: "",
    Password: "",
  });
  const [invalidFlag, setInvalidFlag] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const setAuthToken = (token: string) => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } 
    else 
      delete axiosInstance.defaults.headers.common["Authorization"];
  };

  const login = async () => {
    axiosInstance.post(`Auth/login`, userDetails)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("accessToken", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);

          setAuthToken(response.data.token);

          localStorage.setItem("User", JSON.stringify(response.data));
          const user = JSON.parse(localStorage.getItem("User") || "{}");

          if (user.role === "Admin") {
            navigate("admin/home");
          } 
          else if (user.role === "Employee") {
            navigate("employee/home");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          setInvalidFlag(true);
        } else if (error.request) {
          toast.error("Server Inactive or Busy", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  return (
    <>
      <Navbar userFullName="Anonymous" />
      {loading ? <Loader /> : ""}
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto login-card-body">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                  <img src={Logo} className="logo" alt="incubxperts-logo"></img>
                </div>
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <img
                    src="https://i.imgur.com/uNGdWHi.png" className="image" alt="landing-page-image">
                  </img>
                </div>
              </div>
            </div>
            <div className="col-lg-6 login-flex">
              <div className="card2 card border-0 px-4 py-5">
                <div className="row">
                  {invalidFlag ? (
                    <div className="alert alert-danger" role="alert">
                      Invalid Credentials. Try Again
                    </div>
                  ) : <div className="alert alert-danger invisible">hi</div>}
                </div>
                <div className="row">
                  <label className="mb-2">
                    <h6 className="mb-0 text-md">Username</h6>
                  </label>
                  <input
                    type="text"
                    name="Username"
                    placeholder="Enter Username"
                    value={userDetails.Username}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="row">
                  <label className="mt-2 mb-2">
                    <h6 className="mb-0 text-md">Password</h6>
                  </label>
                  <input
                    type="password"
                    name="Password"
                    placeholder="Enter password"
                    value={userDetails.Password}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="row mt-3 mb-3">
                  <button
                    type="submit" className="btn btn-blue text-center"
                    disabled={userDetails.Username === "" || userDetails.Password === ""}
                    onClick={login}>
                      Login
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue py-4">
            <div className="row px-3">
              <small className="ml-4 ml-sm-5 mb-2">
                Copyright &copy; 2019. All rights reserved.
              </small>
              <div className="social-contact ml-4 ml-sm-auto">
                <span className="fa fa-facebook mr-4 text-sm"></span>
                <span className="fa fa-google-plus mr-4 text-sm"></span>
                <span className="fa fa-linkedin mr-4 text-sm"></span>
                <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default LandingPage;
