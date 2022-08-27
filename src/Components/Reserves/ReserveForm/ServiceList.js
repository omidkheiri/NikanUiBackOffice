import React, { Fragment, useEffect, useState } from "react";
import PassengerForm from "./ServiceForms/Passenger/PassengerForm";
import { group } from "core-js/actual/array/group";
import TransferForm from "./ServiceForms/Transfer/TransferForm";
import AttendeeFrom from "./ServiceForms/Attendee/AttendeeFrom";
const ServiceList = (props) => {
  console.log(props);
  const [serviceList, setserviceList] = useState();
  const [shownDrawer, setshownDrawer] = useState("none");
  const cancelModal = () => {
    setshownDrawer(0);
  };
  const addService = (event) => {
    console.log(event.currentTarget.id);
    setshownDrawer(event.currentTarget.id);
  };

  useEffect(() => {
    setserviceList(props.serviceList);
    if (props.serviceList) {
      console.log(props.serviceList);
      let items = props.serviceList.group((data) => {
        return data.serviceTypeName;
      });
      console.log(items);
      setserviceList(Object.keys(items));

      // console.log(
      //   props.serviceList.group((data) => {
      //     return data.serviceTypeName;
      //   })
      // );
    }
  }, [props]);

  return (
    <Fragment>
      <div
        id="navSection"
        data-spy="affix"
        className="nav sidenav"
        style={{ top: "95px", width: "280px", direction: "rtl" }}
      >
        {serviceList &&
          serviceList.map((service) => {
            return (
              <div key={service} className="list-group">
                <div
                  className="nav-link active"
                  style={{ borderBottom: "1px solid #edeaea" }}
                >
                  <div className="row">
                    <div className="col-md-2">
                      <span
                        id={service}
                        onClick={addService}
                        style={{
                          height: "23px",
                          width: "23px",
                          display: "block",
                          float: "right",
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="feather feather-plus-circle"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </span>
                    </div>
                    <div className="col-md-8">{service}</div>
                    <hr
                      style={{
                        display: "block",
                        width: "100%",
                        margin: "5px",
                      }}
                    />

                    {shownDrawer === "Passenger" && (
                      <PassengerForm
                        cancelCallBack={cancelModal}
                        formIsShown={shownDrawer}
                      />
                    )}
                    {shownDrawer === "Transfer" && (
                      <TransferForm
                        cancelCallBack={cancelModal}
                        formIsShown={shownDrawer}
                      />
                    )}
                    {shownDrawer === "Attendee" && (
                      <AttendeeFrom
                        cancelCallBack={cancelModal}
                        formIsShown={shownDrawer}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}{" "}
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

export default ServiceList;
