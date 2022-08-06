import React, { Fragment, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DropDown from "../../../UI/FormElement/DropDown";
import ServiceLineFome from "./ServiceLineFome";
import ServiceLineList from "./ServiceLineList";

const ServiceLine = () => {
  const [refreshList, setrefreshList] = useState();
  const ShowFormOnClick = () => {
    setFormIsShown(!formIsShown);
  };
  const UpdateListFunc = useRef(null);
  const cancelModal = () => {
    setFormIsShown(!formIsShown);
  };
  const UpdateList = () => {
    setFormIsShown(!formIsShown);
    setrefreshList(!refreshList);
    UpdateListFunc.current();
  };
  const [t, i18n] = useTranslation("common");
  const [formIsShown, setFormIsShown] = useState(false);

  return (
    <div className="widget-content widget-content-area">
      <div className="table-responsive">
        <div className="icon-container">
          <div
            style={{ float: "left", cursor: "pointer" }}
            onClick={ShowFormOnClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus-circle"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <ServiceLineFome
            cancelCallBack={cancelModal}
            formIsShown={formIsShown}
            UpdateList={UpdateList}
          ></ServiceLineFome>
        </div>

        <ServiceLineList UpdateListFunc={UpdateListFunc} />
      </div>
    </div>
  );
};

export default ServiceLine;
