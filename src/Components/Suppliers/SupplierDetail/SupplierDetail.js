import React, { Fragment, useState } from "react";
import ServiceLocation from "./ServiceLine/ServiceLocation/ServiceLocation";
import SupplierDetailMenu from "../SupplierDetail/SupplierDetailMenu";
import SupplierHome from "./SupplierHome";
import ServiceLine from "./ServiceLine/ServiceLine";
const SupplierDetail = () => {
  const [pageTitle, setPageTitle] = useState("home");

  const updateCurrntPage = (data) => {
    setPageTitle(data);
  };
  return (
    <Fragment>
      <SupplierDetailMenu
        updateCurrntPage={updateCurrntPage}
        currntPage={pageTitle}
      />

      <div className="tab-content" id="simpletabContent">
        <div className="tab-pane fade show active">
          {pageTitle === "serviceLocation" && <ServiceLocation />}
          {pageTitle === "serviceLine" && <ServiceLine />}
          {pageTitle === "home" && <SupplierHome />}
        </div>
      </div>
    </Fragment>
  );
};

export default SupplierDetail;
