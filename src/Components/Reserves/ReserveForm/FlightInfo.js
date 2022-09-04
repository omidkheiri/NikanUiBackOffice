import React, { Fragment, useContext, useEffect } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

import ReserveContext from "../../../Store/ReserveContext";
const FlightInfo = () => {
  const [reserveContext] = useContext(ReserveContext);

  const [t] = useTranslation("common");

  return (
    <Fragment>
      {reserveContext &&
        reserveContext.flightinfo &&
        reserveContext.flightinfo.flightInfo && (
          <div className="row layout-top-spacing " style={{ direction: "rtl" }}>
            <div className="col-lg-12 col-12 layout-spacing">
              <div className="row">
                <div className="col">
                  <span>
                    Airline: <b>{reserveContext.flightinfo.airlineName}</b>
                  </span>
                </div>
                <div className="col">
                  <span>
                    Flight Name: <b>{reserveContext.flightinfo.flightName}</b>
                  </span>
                </div>

                <div className="col">
                  <span>
                    Flight Date:
                    <b>
                      {moment(
                        new Date(reserveContext.flightinfo.flightDate)
                      ).format("YYYY-MM-DD")}
                    </b>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <blockquote
                    className="blockquote"
                    style={{ padding: "5px", margin: 0 }}
                  >
                    <p style={{ textAlign: "center" }}>
                      {t("ReservePage.FlightInfoForm.DepartureInfo")}
                    </p>
                    <p className="d-inline">
                      {reserveContext.flightinfo.flightInfo.departureCity}
                    </p>
                    <small>
                      {reserveContext.flightinfo.flightInfo.departureAirport}
                      <span>
                        <code> time </code>
                      </span>
                      <b>
                        {reserveContext.flightinfo.flightInfo.departureTime}
                      </b>
                    </small>
                  </blockquote>
                </div>
                <div className="col" style={{ alignSelf: "center" }}>
                  <svg
                    style={{
                      margin: "auto",
                      display: "block",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="55"
                    height="55"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#cccccc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevrons-left"
                  >
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </div>
                <div className="col">
                  <blockquote
                    className="blockquote"
                    style={{ padding: "5px", margin: 0 }}
                  >
                    <p style={{ textAlign: "center" }}>
                      {t("ReservePage.FlightInfoForm.َArrivalInfo")}
                    </p>
                    <p className="d-inline">
                      {reserveContext.flightinfo.flightInfo.arrivalCity}
                    </p>
                    <small>
                      {reserveContext.flightinfo.flightInfo.arrivalAirport}
                      <span>
                        <code> time </code>
                      </span>
                      <b>{reserveContext.flightinfo.flightInfo.arrivalTime}</b>
                    </small>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        )}
    </Fragment>
  );
};

export default FlightInfo;
