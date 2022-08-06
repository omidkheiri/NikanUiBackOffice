import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceLocation from "./ServiceLine/ServiceLocation/ServiceLocation";
import SupplierDetailMenu from "../SupplierDetail/SupplierDetailMenu";
import SupplierHome from "./SupplierHome";
import ServiceLine from "./ServiceLine/ServiceLine";
const SupplierDetail = () => {
  const params = useParams();
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
