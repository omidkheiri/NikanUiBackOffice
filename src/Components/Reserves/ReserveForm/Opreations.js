import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { group } from "core-js/actual/array/group";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { useHistory, useParams } from "react-router-dom";
import ReserveContext from "../../../Store/ReserveContext";
import Moment from "moment";
import PriceListService from "../../../Hooks/Prices/PriceListService";
import ReserveSummery from "./ReserveSummery";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
const Opreations = () => {
  const pricesServiceRef = useRef(null);
  const params = useParams();
  const [serviceList, setserviceList] = useState();
  const [, setserviceListItem] = useState();
  const [gettotal, setgettotal] = useState();
  const [reserveContext] = useContext(ReserveContext);
  const [psassengersTotal, setpsassengersTotal] = useState(0);
  const [attendesssTotal, setattendeesTotal] = useState(0);
  const [transferTotal, settransferTotal] = useState(0);
  const [petTotal, setpetTotal] = useState(0);
  const [wheelchairTotal, setwheelchareTotal] = useState(0);
  const [visaTotal, setvisaTotal] = useState(0);
  const [suiteTotal, setsuiteTotal] = useState(0);
  const [popupVisible, setpopupVisible] = useState(false);
  const basicContext = useContext(BasicContext);
  const [reserveRecord, setreserveRecord] = useState();
  const history = useHistory();
  const [ReserveServerId, setReserveServerId] = useState();
  const GoToPanel = () => {
    history.push("/Reserves/");
  };
  const { sendRequest: sendreserve } = useHttp(
    {
      url: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320/Reserve`, //basicContext.ReserveAddress + "/Reserve",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reserveRecord,
    },
    GoToPanel
  );

  const { sendRequest: putReserve } = useHttp(
    {
      url: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320/Reserve/${ReserveServerId}`, //basicContext.ReserveAddress + "/Reserve",
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: reserveRecord,
    },
    GoToPanel
  );

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v.serviceTypeId === val ? a + 1 : a), 0);

  const getWheelchair = () => {
    var wheelchair = 0;

    var wheelchairs = reserveContext.reserveItem.filter((data) => {
      return data.wheelchair;
    });
    wheelchairs.forEach((wheelchair1) => {
      wheelchair = wheelchair + wheelchair1.unitPrice;
    });

    setwheelchareTotal(wheelchair);
    return wheelchair;
  };

  const getVisa = () => {
    var visa = 0;

    var visas = reserveContext.reserveItem.filter((data) => {
      return data.visa;
    });
    visas.forEach((visa1) => {
      visa = visa + visa1.unitPrice;
    });

    setvisaTotal(visa);
    return visa;
  };

  useEffect(() => {
    var data = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightInfo.flightDate)).format(
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
          Moment(new Date(reserveContext.flightInfo.flightDate)).format(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.locationId, reserveContext.flightInfo.flightDate]);
  useEffect(() => {
    if (
      pricesServiceRef &&
      pricesServiceRef.current &&
      reserveContext.reserveItem.length > 0
    ) {
      reserveContext.reserveItem = reserveContext.reserveItem.filter((data) => {
        return data.serviceQty > 0;
      });
      var passengers = sumPassenger();
      var visas = getVisa();
      var wheelchairs = getWheelchair();
      var attendees = sumAttendee();
      var transfer = sumTransfer();
      var pet = sumPet();
      var suite = sumSuite();

      setgettotal(
        (
          wheelchairs +
          visas +
          passengers +
          attendees +
          transfer +
          pet +
          suite
        ).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveContext.reserveItem]);
  const resetReserve = () => {
    localStorage.removeItem(params.LocationId);
    window.location.reload();
  };
  const getVisaqty = () => {
    var a = reserveContext.reserveItem.filter((data) => {
      return data.visa;
    });

    return a.length;
  };
  const getWheelchairqty = () => {
    var a = reserveContext.reserveItem.filter((data) => {
      return data.wheelchair;
    });

    return a.length;
  };
  const getSuiteQty = () => {
    var count = 0;
    var items = reserveContext.reserveItem.filter((data) => {
      return data.serviceTypeId === 6;
    });

    for (var i = 0; i < items.length; ++i) {
      count = items[i].serviceQty + count;
    }

    return count;
  };
  const sendReserve = () => {
    reserveContext.flightInfo.flightInfo = null;

    delete reserveContext.flightInfo["flightInfo"];
    console.log(reserveContext);

    setpopupVisible(true);
  };

  const hideInfo = () => {
    setpopupVisible(false);
  };
  const getPetQty = () => {
    var i = reserveContext.reserveItem.find((data) => {
      return data.serviceTypeId === 4;
    });
    if (i) {
      return i.serviceQty;
    } else {
      return 0;
    }
  };

  const sumPet = () => {
    var sum = 0;
    var pet = reserveContext.reserveItem.filter((data) => {
      return data.serviceTypeId === 4;
    });
    if (pet) {
      pet.forEach((element) => {
        sum = element.unitPrice * element.serviceQty;
      });
    }
    setpetTotal(sum);
    return sum;
  };

  const sumSuite = () => {
    var sum = 0;
    var suiteSum = reserveContext.reserveItem.filter((data) => {
      return data.serviceTypeId === 6 && data.serviceQty > 0;
    });
    if (suiteSum) {
      suiteSum.forEach((element) => {
        sum = sum + element.unitPrice * element.serviceQty;
      });
    }

    setsuiteTotal(sum);
    return sum;
  };

  const sumAttendee = () => {
    var sum = 0;
    var attendeeSum = reserveContext.reserveItem.filter((data) => {
      return data.attendee;
    });

    attendeeSum.forEach((element) => {
      sum = sum + element.unitPrice * element.serviceQty;
    });
    setattendeesTotal(sum);
    return sum;
  };

  const sumTransfer = () => {
    var sum = 0;
    var transferSum = reserveContext.reserveItem.filter((data) => {
      return data.serviceTypeId === 3;
    });

    transferSum.forEach((element) => {
      sum = sum + element.unitPrice * element.serviceQty;
    });
    settransferTotal(sum);
    return sum;
  };

  const sumPassenger = () => {
    var sum = 0;
    if (!reserveContext.reserveItem) {
      return 0;
    }

    var PassengerSum = reserveContext.reserveItem.filter((data) => {
      return data.passenger;
    });

    PassengerSum.forEach((element) => {
      sum = sum + element.unitPrice;
    });

    setpsassengersTotal(sum);
    return sum;
  };
  const closeButtonOptions = {
    text: "Close",
    onClick: hideInfo,
  };
  const sendReserveToList = async () => {
    if (reserveContext.customerId) {
      createReserveRecord();
    } else {
      alert("select a contact");
    }
  };

  useEffect(() => {
    if (reserveRecord) {
      if (reserveRecord.id) {
        putReserve();
      } else {
        sendreserve();
      }
    }
  }, [reserveRecord]);

  async function createReserveRecord() {
    var reserveRecordtemp = reserveContext;
    reserveRecordtemp.flightInfo.flightDate = Moment(
      new Date(reserveContext.flightInfo.flightDate)
    ).format("YYYY-MM-DD");
    reserveRecordtemp.reserveItem.forEach((data) => {
      if (data.passenger) {
        data.passenger.birthDate = Moment(
          new Date(data.passenger.birthDate)
        ).format("YYYY-MM-DD");
      }
      if (data.transfer) {
        data.transfer.time = Moment(new Date(data.transfer.time)).format(
          "HH:mm"
        );
      }
    });
    setReserveServerId(reserveContext.id);
    setreserveRecord(reserveRecordtemp);
  }

  const sendButtonOptions = {
    text: "ارسال",
    onClick: sendReserveToList,
  };

  return (
    <Fragment>
      <PriceListService ref={pricesServiceRef} />

      <Popup
        visible={popupVisible}
        onHiding={hideInfo}
        dragEnabled={false}
        hideOnOutsideClick={true}
        showCloseButton={false}
        showTitle={true}
        title="Reserve"
        container=".dx-viewport"
        fullScreen={true}
      >
        <ScrollView width="100%" height="100%">
          <div id="textBlock">
            <ReserveSummery></ReserveSummery>
          </div>
        </ScrollView>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={closeButtonOptions}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="before"
          options={sendButtonOptions}
        />
      </Popup>

      <div
        id="navSection"
        data-spy="affix"
        className="nav sidenav"
        style={{ top: "95px", width: "280px", direction: "rtl" }}
      >
        <button className="btn btn-danger m-3" onClick={resetReserve}>
          reset
        </button>
        <button className="btn btn-primary m-3" onClick={sendReserve}>
          Save
        </button>
        {reserveContext &&
          reserveContext.reserveItem &&
          serviceList &&
          serviceList.map((service) => {
            return (
              <div key={service} className="list-group">
                <div
                  className="nav-link active"
                  style={{ borderBottom: "1px solid #edeaea", padding: "0px" }}
                >
                  <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">{service}</div>
                    <div className="col-md-2"></div>
                    <div className="col-md-8 " style={{ direction: "ltr" }}>
                      {service === "Passenger" &&
                        `${countOccurrences(
                          reserveContext.reserveItem,
                          1
                        )}  →   ${psassengersTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}`}
                      {service === "Transfer" &&
                        `${countOccurrences(
                          reserveContext.reserveItem,
                          3
                        )}  →   ${transferTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}`}
                      {service === "Attendee" &&
                        `${countOccurrences(
                          reserveContext.reserveItem,
                          2
                        )}  →   ${attendesssTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}`}
                      {service === "Pet" &&
                        `${getPetQty()}  →   ${petTotal.toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 0,
                          }
                        )}`}

                      {service === "Visa" &&
                        `${getVisaqty()}  →   ${visaTotal.toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 0,
                          }
                        )}`}
                      {service === "Wheelchair" &&
                        `${getWheelchairqty()}  →   ${wheelchairTotal.toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 0,
                          }
                        )}`}
                      {service === "Suite" &&
                        `${getSuiteQty()}  →   ${suiteTotal.toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 0,
                          }
                        )}`}
                    </div>
                    <hr
                      style={{
                        display: "block",
                        width: "100%",
                        margin: "1px 5px ",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        <div className="list-group">
          <div
            className="nav-link active"
            style={{ borderBottom: "1px solid #edeaea" }}
          >
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <small style={{ fontSize: "10px" }}>
                  جمع کل بدون مالیات و تخفیف
                </small>
              </div>
              <div
                className="col-md-12 pr-5 pl-5"
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  marginTop: "10px",
                }}
              >
                {gettotal}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Opreations;
