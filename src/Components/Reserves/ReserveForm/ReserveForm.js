import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
import FlightInfoForm from "./FlightInfoForm";
import HeaderLocationInfo from "./HeaderLocationInfo";
import "./ReserveForm.css";
import Opreations from "./Opreations";
import Moment from "moment";
import PassengerList from "./ServiceForms/Passenger/PassengerList";
import ReserveService from "../../../Hooks/Reserve/ReserveService";
import AttendeeList from "./ServiceForms/Attendee/AttendeeList";
import TransferList from "./ServiceForms/Transfer/TransferList";
import ReserveContext from "../../../Store/ReserveContext";
import PetSection from "./ServiceForms/Pet/PetSection";
import SuiteList from "./ServiceForms/Suite/SuiteList";
import { v4 as uuid } from "uuid";
import PriceListService from "../../../Hooks/Prices/PriceListService";
const ReserveForm = () => {
  const reserveServiceRef = useRef(null);
  const pricesServiceRef = useRef(null);
  const [unique_id, setunique_id] = useState(uuid());
  const [reserve, setReserve] = useState();
  const basicContext = useContext(BasicContext);
  const params = useParams();
  const [location, setlocation] = useState();
  const [, setflightDate] = useState();
  const [serviceList] = useState();
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
      if (params.ReserveId !== "null") {
        reserveServiceRef.current.AddReserveTemp(
          params.LocationId,
          params.ReserveId
        );
      } else {
        reserveServiceRef.current.AddReserveTemp(params.LocationId, unique_id);
      }

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
      <PriceListService ref={pricesServiceRef} />

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

            {reserve && (
              <div className="statbox widget box mt-3">
                <div className="widget-content widget-content-area">
                  <PassengerList></PassengerList>
                </div>
              </div>
            )}
            {reserve && (
              <div className="statbox widget box mt-3">
                <div className="widget-content widget-content-area">
                  <AttendeeList></AttendeeList>
                </div>
              </div>
            )}
            {reserve && (
              <div className="statbox widget box mt-3">
                <div className="widget-content widget-content-area">
                  <TransferList></TransferList>
                </div>
              </div>
            )}
            {reserve && (
              <div className="statbox widget box mt-3">
                <div className="widget-content widget-content-area">
                  <PetSection></PetSection>
                </div>
              </div>
            )}
            {reserve && (
              <div className="statbox widget box mt-3">
                <div className="widget-content widget-content-area">
                  <SuiteList></SuiteList>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ReserveContext.Provider>
  );
};

export default ReserveForm;
