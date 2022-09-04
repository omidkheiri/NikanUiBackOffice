import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PassengerForm from "./ServiceForms/Passenger/PassengerForm";
import { group } from "core-js/actual/array/group";
import TransferNewForm from "./ServiceForms/Transfer/TransferNewForm";
import AttendeeFrom from "./ServiceForms/Attendee/AttendeeFrom";
import { useParams } from "react-router-dom";
import ReserveContext from "../../../Store/ReserveContext";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
import Moment from "moment";
import PriceListService from "../../../Hooks/Prices/PriceListService";
const Opreations = () => {
  const pricesServiceRef = useRef(null);
  const params = useParams();
  const [serviceList, setserviceList] = useState();
  const [serviceListItem, setserviceListItem] = useState();
  const [shownDrawer, setshownDrawer] = useState("none");
  const [reserveContext] = useContext(ReserveContext);

  useEffect(() => {
    console.log("sfsfsdf");
    console.log(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightinfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var data = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightinfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    if (data) {
      setserviceListItem(data);
      let items = data.group((d) => {
        return d.serviceTypeName;
      });
      setserviceList(Object.keys(items));
    } else {
      pricesServiceRef.current.AddPriceRecord(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          ),
        ""
      );
    }

    if (data) {
      setserviceListItem(data);
      let items = data.group((d) => {
        return d.serviceTypeName;
      });
      setserviceList(Object.keys(items));
    } else {
      console.log("Cant get the prices");
    }
  }, [params.locationId, reserveContext.flightinfo.flightDate]);

  const cancelModal = () => {
    setshownDrawer(0);
  };
  const addService = (event) => {
    setshownDrawer(event.currentTarget.id);
  };
  const UpdateReserve = () => {
    setshownDrawer("none");
  };

  const resetReserve = () => {
    localStorage.removeItem(params.LocationId);
    window.location.reload();
  };

  return (
    <Fragment>
      <PriceListService ref={pricesServiceRef} />
      <div
        id="navSection"
        data-spy="affix"
        className="nav sidenav"
        style={{ top: "95px", width: "280px", direction: "rtl" }}
      >
        <button className="btn btn-danger m-3" onClick={resetReserve}>
          reset
        </button>
        <button className="btn btn-primary m-3">Save</button>
        {serviceList &&
          serviceList.map((service) => {
            return (
              <div key={service} className="list-group">
                <div
                  className="nav-link active"
                  style={{ borderBottom: "1px solid #edeaea" }}
                >
                  <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">{service}</div>
                    <div className="col-md-12 pr-5 pl-5">
                      {service === "Passenger" &&
                        reserveContext.passenger.length}
                      {service === "Transfer" && reserveContext.transfer.length}
                      {service === "Attendee" && reserveContext.attendee.length}
                    </div>
                    <hr
                      style={{
                        display: "block",
                        width: "100%",
                        margin: "5px",
                      }}
                    />

                    {shownDrawer === "Passenger" && (
                      <PassengerForm
                        UpdateReserve={UpdateReserve}
                        cancelCallBack={cancelModal}
                        formIsShown={shownDrawer}
                        scheme={serviceListItem.find((s) => {
                          return s.serviceTypeName === "Passenger";
                        })}
                      />
                    )}
                    {shownDrawer === "Transfer" && (
                      <TransferNewForm
                        UpdateReserve={UpdateReserve}
                        cancelCallBack={cancelModal}
                        formIsShown={shownDrawer}
                      />
                    )}
                    {shownDrawer === "Attendee" && (
                      <AttendeeFrom
                        UpdateReserve={UpdateReserve}
                        cancelCallBack={cancelModal}
                        formIsShown={shownDrawer}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

// <div className="col-md-10" style={{ direction: "ltr" }}>
// 0 X
// {service.serviceLinePrices[0].price.toLocaleString(
//   undefined,
//   { maximumFractionDigits: 0 }
// )}
// </div>

export default Opreations;
