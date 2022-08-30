import React from "react";
import Breadcrumb from "../UI/Breadcrumb";
import classes from "./SupplierList.module.css";
const SupplierList = () => {
  return (
    <div className="layout-px-spacing">
      <Breadcrumb title="Suppliers"></Breadcrumb>

      <div className="row layout-top-spacing">
        <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          <div className="widget-content widget-content-area br-6"></div>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;
