import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import LandingNavbar from "./LandingNavbar";

const LandingPage = () => {
    return (
        <>
        <LandingNavbar />
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto card-body"> 
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row">
                                <img src="https://i.imgur.com/CXQmsmF.png" className="logo"></img>
                            </div>
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                <img src="https://i.imgur.com/uNGdWHi.png" className="image"></img>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 login-flex">
                        <div className="card2 card border-0 px-4 py-5">
                            <div className="row">
                                <label className="mb-2"><h6 className="mb-0 text-md">Username</h6></label>
                                <input className="mb-4" type="text" name="username" placeholder="Enter a valid Username"></input>
                            </div>
                            <div className="row">
                                <label className="mb-2"><h6 className="mb-0 text-md">Password</h6></label>
                                <input type="password" name="password" placeholder="Enter password"></input>
                            </div>
                            <div className="row mt-3 mb-3">
                                <button type="submit" className="btn btn-blue text-center">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue py-4">
                    <div className="row px-3">
                        <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
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
        </>
    )
}
export default LandingPage