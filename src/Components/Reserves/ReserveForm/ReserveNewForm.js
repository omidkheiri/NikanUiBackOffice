import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
import FlightInfoForm from "./FlightInfoForm";
import HeaderLocationInfo from "./HeaderLocationInfo";
import "./ReserveNewForm.css";
import Moment from "moment";
import ServiceList from "./ServiceList";
import ReserveService from "../../../Hooks/Reserve/ReserveService";

const ReserveNewForm = () => {
  const reserveServiceRef = useRef(null);
  const [reserve, setReserve] = useState({});
  const basicContext = useContext(BasicContext);
  const params = useParams();
  const [location, setlocation] = useState();
  const [flightDate, setflightDate] = useState();
  const [flightnumber, setflightnumber] = useState();
  const [serviceList, setserviceList] = useState();
  const [showServiceList, setShowServiceList] = useState();
  const getReserve = (reserve) => {
    setReserve(reserve);
  };
  useEffect(() => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    if (!reserveStorage) {
      reserveServiceRef.current.AddReserveTemp(params.LocationId);
      fetchLocation();
    } else {
      setlocation(reserveStorage.locationId);
    }
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
  const GetServiceListData = (data) => {
    setserviceList(data);
  };

  const setFlightNumber = (show, value) => {
    console.log("HHHHHHHHHHHHHHHHHHHHHh");
    console.log(show);
    console.log(value);
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
  const { sendRequest: fetchLocationServiceWithPrice } = useHttp(
    {
      url:
        basicContext.serviceLineAddress +
        "/ServiceLine/Location/" +
        params.LocationId +
        "?DateTime=" +
        Moment(new Date(flightDate)).format("YYYY-MM-DD"),
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    GetServiceListData
  );

  useEffect(() => {
    fetchLocationServiceWithPrice();
    console.log("vvvvvvvvvvvvvvvvvvvv");
    console.log(
      basicContext.serviceLineAddress +
        "/ServiceLine/Location/" +
        params.LocationId +
        "?DateTime=" +
        Moment(new Date(flightDate)).format("YYYY-MM-DD")
    );
  }, [showServiceList]);

  return (
    <Fragment>
      <ReserveService getReserve={getReserve} ref={reserveServiceRef} />
      <div id="content" className="main-content">
        <div className="page-header page-header-scrollspy">
          {location && <HeaderLocationInfo location={location} />}
        </div>

        <div className="container">
          <div className="container">
            {showServiceList && <ServiceList serviceList={serviceList} />}
            <div className="statbox widget box ">
              <div className="widget-content widget-content-area">
                <FlightInfoForm
                  locationId={params.LocationId}
                  flightInfo={setFlightNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReserveNewForm;
