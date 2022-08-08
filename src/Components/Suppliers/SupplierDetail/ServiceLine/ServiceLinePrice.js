import React from "react";
import Modal from "../../../UI/Modal";

const ServiceLinePrice = (props) => {
  return (
    <Modal cntx={props}>
      <div className="col-lg-12 layout-spacing">
        <div>Service Line Price {props.UpdatingRecordId}</div>
      </div>
    </Modal>
  );
};

export default ServiceLinePrice;
