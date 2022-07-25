import React from "react";
import Breadcrumb from "../UI/Breadcrumb";
import classes from "./List.module.css";

const AccountList = () => {
  return (
    <div className="layout-px-spacing">
      <Breadcrumb title="Accounts"></Breadcrumb>
      <div className="row layout-top-spacing">
        <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          <div className="widget-content widget-content-area br-6">
            <table id="default-ordering" className={classes.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Phone</th>
                  <th>Email</th>

                  <th className="text-center dt-no-sorting">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>

                  <td className="text-center">
                    <button className="btn btn-primary btn-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>

                  <td className="text-center">
                    <button className="btn btn-primary btn-sm">View</button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>

                  <th className="invisible"></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
