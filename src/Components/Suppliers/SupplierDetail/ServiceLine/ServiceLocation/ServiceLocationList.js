import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../../../Hooks/use-http";
import BasicContext from "../../../../../Store/enviroment-context";
import ServiceLocationUpdateForm from "./ServiceLocationUpdateForm";
import Moment from "moment";
import { useTranslation } from "react-i18next";
const ServiceLocationList = (props) => {
  const [t] = useTranslation("common");
  const basicContext = useContext(BasicContext);

  const params = useParams();
  const [locationList, setLocationList] = useState([]);
  const [deletingId, setDeletingLocation] = useState();
  const [updateLocation, setUpdateLocation] = useState();
  const [formIsShown, setFormIsShown] = useState(false);
  useEffect(() => {
    props.UpdateListFunc.current = updateList;

    if (deletingId) {
      deleteLocation().then(() => {
        fetchLocation();
      });
    } else {
      fetchLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletingId]);
  const fillList = (data) => {
    setLocationList(data);
  };
  const updateList = () => {
    fetchLocation();
  };
  const onDeleteItem = (event) => {
    setDeletingLocation(event.currentTarget.id);
    fetchLocation();
  };
  const onUpdateLocation = (event) => {
    setFormIsShown(!formIsShown);
    setUpdateLocation(event.currentTarget.id);
  };
  const cancelModal = () => {
    setFormIsShown(!formIsShown);
  };
  const UpdateList = () => {
    fetchLocation();
    setDeletingLocation(false);
    cancelModal();
  };
  const { sendRequest: fetchLocation } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/ServiceLocation?AccountId=${params.AccountId}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillList
  );

  const { sendRequest: deleteLocation } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/Account/${params.AccountId}/ServiceLocation/${deletingId}`,
      method: "delete",
      headers: { "Content-Type": "" },
      body: null,
    },
    fillList
  );

  return (
    <Fragment>
      <table className="table table-bordered table-hover mb-4">
        <thead>
          <tr>
            <th style={{ textAlign: "right" }}>
              {t("ServiceLocation.FormElement.Title")}
            </th>
            <th style={{ textAlign: "right" }}>
              {t("ServiceLocation.FormElement.MaxAllowtedDate")}
            </th>
            <th style={{ textAlign: "right", width: "50px" }}>State</th>

            <th style={{ width: "100px" }}></th>
          </tr>
        </thead>
        <tbody>
          {locationList.map((data) => {
            return (
              <tr key={data.id}>
                <td style={{ textAlign: "right" }}>{data.title}</td>
                <td style={{ textAlign: "right" }}>
                  {Moment(new Date(data.maxAcceptDate)).format("YYYY-MM-DD")}
                </td>
                <td style={{ textAlign: "center" }}>
                  {data.status && (
                    <div className="icon-container">
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
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                  )}
                </td>
                <td style={{ textAlign: "center" }} className="text-center">
                  <div
                    id={data.id}
                    onClick={onUpdateLocation}
                    style={{ float: "right", padding: "0 5px" }}
                    className="icon-container"
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
                      className="feather feather-edit"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span className="icon-name"></span>
                  </div>
                  <div
                    style={{ float: "right", padding: "0 5px" }}
                    onClick={onDeleteItem}
                    id={data.id}
                    className="icon-container"
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
                      className="feather feather-trash-2"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ServiceLocationUpdateForm
        cancelCallBack={cancelModal}
        formIsShown={formIsShown}
        UpdateList={UpdateList}
        LocationId={updateLocation}
      ></ServiceLocationUpdateForm>
    </Fragment>
  );
};

export default ServiceLocationList;
