import React from "react";
import classes from "./CreateAccount.module.css";
const CreateAccount = () => {
  return (
    <div className={(classes.container, classes.singlFormContent)}>
      <div className="row">
        <div id="flFormsGrid" className="col-lg-12 layout-spacing">
          <div className="statbox widget box box-shadow">
            <div className="widget-header">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                  <h4>فرم ثبت سازمان جدید</h4>
                </div>
              </div>
            </div>
            <div className="widget-content widget-content-area">
              <form>
                <div className="form-row mb-4">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputAddress">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="inputAddress2">Address 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div className="form-row mb-4">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check pl-0">
                    <div className="custom-control custom-checkbox checkbox-info">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="gridCheck"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="gridCheck"
                      >
                        Check me out
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Sign in
                </button>
              </form>

              <div className="code-section-container">
                <button className="btn toggle-code-snippet">
                  <span>Code</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
