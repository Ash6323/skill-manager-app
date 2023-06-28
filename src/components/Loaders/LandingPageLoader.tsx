import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const LandingPageLoader: React.FC = () => {
    return (
        <div className="landing-page-spinner">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );
};
export default LandingPageLoader;