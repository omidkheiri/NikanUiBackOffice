import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
import FlightInfoForm from "./FlightInfoForm";
import HeaderLocationInfo from "./HeaderLocationInfo";
import "./ReserveNewForm.css";
import Moment from "moment";
import Opreations from "./Opreations";

import PassengerList from "./ServiceForms/Passenger/PassengerList";
import ReserveService from "../../../Hooks/Reserve/ReserveService";
import AttendeeList from "./ServiceForms/Attendee/AttendeeList";
import TransferList from "./ServiceForms/Transfer/TransferList";
import ReserveContext from "../../../Store/ReserveContext";

const ReserveNewForm = () => {
  const reserveServiceRef = useRef(null);

  const [reserve, setReserve] = useState({});
  const basicContext = useContext(BasicContext);
  const params = useParams();
  const [location, setlocation] = useState();
  const [flightDate, setflightDate] = useState();
  const [serviceList, setserviceList] = useState();
  const [showServiceList, setShowServiceList] = useState();
  const getReserve = (reserve) => {
    setReserve(reserve);
  };
  useEffect(() => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    if (
      reserveStorage &&
      reserveStorage.locationId &&
      reserveStorage.locationId.id
    ) {
      setlocation(reserveStorage.locationId);
    } else {
      reserveServiceRef.current.AddReserveTemp(params.LocationId);
      fetchLocation();
    }
    setReserve(reserveStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const GetData = (data) => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );

    reserveStorage.locationId = data;
    setReserve(reserveStorage);
    setlocation(reserveStorage.locationId);
    reserveServiceRef.current.UpdateReserve(params.LocationId, reserveStorage);
  };

  const setFlightNumber = (show, value) => {
    setflightDate(value);
    setShowServiceList(show);
  };

  const { sendRequest: fetchLocation } = useHttp(
    {
      url:
        basicContext.serviceLocationAddress +
        "/ServiceLocation/" +
        params.LocationId,
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    GetData
  );

  const reserveUpdated = () => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    setReserve(reserveStorage);
  };
  return (
    <ReserveContext.Provider value={[reserve, setReserve]}>
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <div id="content" className="main-content">
        <div className="page-header page-header-scrollspy">
          {location && <HeaderLocationInfo location={location} />}
        </div>

        <div className="container">
          <div className="container">
            {showServiceList && <Opreations serviceList={serviceList} />}
            <div className="statbox widget box ">
              <div className="widget-content widget-content-area">
                <FlightInfoForm
                  locationId={params.LocationId}
                  flightInfo={setFlightNumber}
                />
              </div>
            </div>

            {reserve && reserve.passenger && (
              <div className="statbox widget box mt-3">
                <div className="widget-content widget-content-area">
                  <PassengerList></PassengerList>
                </div>
              </div>
            )}
            {reserve && reserve.attendee && (
              <div className="statbox widget box mt-3">
                <div className="widget-content widget-content-area">
                  <AttendeeList></AttendeeList>
                </div>
              </div>
            )}
            {reserve && reserve.transfer && (
              <div className="statbox widget box mt-3">
                <div className="widget-content widget-content-area">
                  <TransferList></TransferList>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ReserveContext.Provider>
  );
};

export default ReserveNewForm;
