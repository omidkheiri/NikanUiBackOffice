import React, { useRef, useState } from "react";
import ServiceLineNewFome from "./ServiceLineNewFome";
import ServiceLineList from "./ServiceLineList";
import ServiceLineUpdateFome from "./ServiceLineUpdateFome";
import ServiceLinePrice from "./ServiceLinePrice";
import ServiceLineSchema from "./ServiceLineSchema";

const ServiceLine = () => {
  const [refreshList, setrefreshList] = useState();
  const [updateingServiceLineId, setupdateingServiceLineId] = useState();
  // const [t, i18n] = useTranslation("common");
  const [formIsShown, setFormIsShown] = useState("none");
  const ShowFormOnClick = () => {
    setFormIsShown("new");
  };
  const UpdateListFunc = useRef(null);
  const cancelModal = () => {
    setFormIsShown("none");
  };

  const UpdateList = () => {
    setFormIsShown("none");
    setrefreshList(!refreshList);
    UpdateListFunc.current();
  };

  const openUpdateForm = (data) => {
    setUpdatingRecord(data).then(setFormIsShown("update"));
  };
  const openPricesForm = (data) => {
    setUpdatingRecord(data).then(setFormIsShown("price"));
  };

  const openSchemaForm = (data) => {
    setUpdatingRecord(data).then(setFormIsShown("schema"));
  };

  const setUpdatingRecord = async (data) => {
    setupdateingServiceLineId(data);
  };
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
          {formIsShown === "new" && (
            <ServiceLineNewFome
              cancelCallBack={cancelModal}
              formIsShown={formIsShown}
              UpdateList={UpdateList}
            ></ServiceLineNewFome>
          )}
          {formIsShown === "update" && (
            <ServiceLineUpdateFome
              UpdatingRecordId={updateingServiceLineId}
              cancelCallBack={cancelModal}
              formIsShown={formIsShown}
              UpdateList={UpdateList}
            ></ServiceLineUpdateFome>
          )}
          {formIsShown === "price" && (
            <ServiceLinePrice
              updatingRecordId={updateingServiceLineId}
              cancelCallBack={cancelModal}
              formIsShown={formIsShown}
              UpdateList={UpdateList}
            ></ServiceLinePrice>
          )}

          {formIsShown === "schema" && (
            <ServiceLineSchema
              updatingRecordId={updateingServiceLineId}
              cancelCallBack={cancelModal}
              formIsShown={formIsShown}
              UpdateList={UpdateList}
            ></ServiceLineSchema>
          )}
        </div>

        <ServiceLineList
          openUpdateForm={openUpdateForm}
          UpdateListFunc={UpdateListFunc}
          openPricesForm={openPricesForm}
          openSchemaForm={openSchemaForm}
        />
      </div>
    </div>
  );
};

export default ServiceLine;
