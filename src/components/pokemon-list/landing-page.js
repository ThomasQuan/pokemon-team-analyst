import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="landing-page-container">
        <div className="start-container">
          <div className="dialog-container">
            <h2>Would you like to build your dream team ?</h2>
          </div>
          <div className="options-container">
            <div>
              <i className="far fa-hand-point-right"></i>
              <Link
                className="option-link"
                to={{
                  pathname: "/main",
                }}
              >
                <p>Yes</p>
              </Link>
            </div>
            <div>
              <i className="far fa-hand-point-right"></i>
              <Link
                className="option-link"
                to={{
                  pathname: "/",
                }}
              >
                <p>No</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
