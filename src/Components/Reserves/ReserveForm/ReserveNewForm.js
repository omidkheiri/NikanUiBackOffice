import React, { Fragment } from "react";
import FlightInfo from "./FlightInfo";
import HeaderLocationInfo from "./HeaderLocationInfo";
import "./ReserveNewForm.css";
const ReserveNewForm = () => {
  return (
    <Fragment>
      <div id="content" className="main-content">
        <div className="page-header page-header-scrollspy">
          <HeaderLocationInfo />
        </div>

        <div className="container">
          <div className="container">
            <div
              id="navSection"
              data-spy="affix"
              className="nav  sidenav"
              style={{ top: "95px", width: "280px" }}
            >
              <div className="list-group">
                <div
                  className="nav-link active"
                  style={{ borderBottom: "1px solid #edeaea" }}
                >
                  <div className="row">
                    <div className="col-md-2">
                      <span
                        style={{
                          height: "23px",
                          width: "23px",
                          display: "block",
                          float: "right",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="feather feather-plus-circle"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </span>
                    </div>
                    <div className="col-md-8">Passengers</div>
                    <hr
                      style={{ display: "block", width: "100%", margin: "5px" }}
                    />
                    <div className="col-md-10" style={{ direction: "ltr" }}>
                      1 X 120,000,000
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FlightInfo />

            <div className="row layout-top-spacing ">
              <div className="col-lg-12 col-12 layout-spacing">
                <div className="statbox widget box ">
                  <div className="widget-header">
                    <div className="row">
                      <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                        <h4>Form controls</h4>
                      </div>
                    </div>
                  </div>
                  <div className="widget-content widget-content-area"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReserveNewForm;
