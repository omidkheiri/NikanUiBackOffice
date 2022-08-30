import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";
import PassengerUpdateForm from "./PassengerUpdateForm";
const PassengerList = () => {
  const [shownDrawer, setshownDrawer] = useState("none");
  const cancelModal = () => {
    setshownDrawer(0);
  };
  const UpdateReserve = () => {
    setshownDrawer(0);
  };
  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const [currentscheme, setcurrentscheme] = useState();
  const [currentPassenger, setcurrentPassenger] = useState();
  const [t] = useTranslation("common");
  const reserveServiceRef = useRef();
  const params = useParams();
  const [reserve, setReserve] = useState();
  useEffect(() => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    console.log(reserveStorage);
    setReserve(reserveStorage);
  }, []);

  const reserveUpdated = () => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    console.log(reserveStorage);
    setReserve(reserveStorage);
  };

  const getReserve = (reserve) => {
    alert();
    console.log(reserve);
    setReserve(reserve);
  };
  const onDeleteItem = (event) => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );

    reserveStorage.passenger = reserveStorage.passenger.filter((data) => {
      return data.id !== event.currentTarget.id;
    });

    reserveServiceRef.current.UpdateReserve(params.LocationId, reserveStorage);
    setReserveContext(reserveStorage);
  };
  const openUpdateing = (event) => {
    setcurrentscheme(
      reserveContext.passenger.find((data) => {
        return data.id == event.currentTarget.id;
      }).scheme
    );
    setcurrentPassenger(
      reserveContext.passenger.find((data) => {
        return data.id == event.currentTarget.id;
      })
    );
    setshownDrawer("Passenger");
  };
  return (
    <Fragment>
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <div className="widget-header">
        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12 col-12">
            <h4>Passenger</h4>
          </div>
        </div>
      </div>
      <div className="widget-content widget-content-area">
        <div className="table-responsive">
          <table className="table table-bordered mb-4">
            <thead>
              <tr>
                <th className="text-center">
                  {t("ReservePage.Passenger.List.Gender")}
                </th>

                <th className="text-center">
                  {t("ReservePage.Passenger.List.FullName")}
                </th>
                <th className="text-center">
                  {t("ReservePage.Passenger.List.Visa")}
                </th>
                <th className="text-center">
                  {t("ReservePage.Passenger.List.Wheelchair")}
                </th>

                <th
                  style={{
                    maxWidth: "150px!important",
                    width: "100px",
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {reserveContext &&
                reserveContext.passenger.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>
                        {data.gender && data.gender === "0"
                          ? t("ReservePage.Passenger.List.GenderType.Female")
                          : t("ReservePage.Passenger.List.GenderType.Male")}
                      </td>
                      <td className="text-center">
                        {data.name} {data.lastName}
                      </td>
                      <td className="text-center">
                        {data.visa && data.visa === "0" ? "X" : "✔️"}
                      </td>
                      <td className="text-center">
                        {data.wheelchair && data.wheelchair === "0"
                          ? "X"
                          : "✔️"}
                      </td>
                      <td className="text-center">
                        <div
                          onClick={openUpdateing}
                          id={data.id}
                          style={{
                            float: "right",
                            padding: "0 5px",
                            cursor: "pointer",
                          }}
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
          {shownDrawer === "Passenger" && (
            <PassengerUpdateForm
              cancelCallBack={cancelModal}
              formIsShown={shownDrawer}
              passenger={currentPassenger}
              scheme={currentscheme}
              UpdateReserve={UpdateReserve}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default PassengerList;
