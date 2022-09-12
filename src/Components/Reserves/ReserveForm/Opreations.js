import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { group } from "core-js/actual/array/group";
import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import { useParams } from "react-router-dom";
import ReserveContext from "../../../Store/ReserveContext";
import Moment from "moment";
import PriceListService from "../../../Hooks/Prices/PriceListService";
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
  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.locationId, reserveContext.flightinfo.flightDate]);
  useEffect(() => {
    if (pricesServiceRef && pricesServiceRef.current) {
      var passengers = sumPassenger();
      var attendees = sumAttendee();
      var transfer = sumTransfer();
      var pet = sumPet();
      var suite = sumSuite();
      setgettotal(
        (passengers + attendees, transfer + pet + suite).toLocaleString(
          undefined,
          {
            maximumFractionDigits: 0,
          }
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveContext]);
  const resetReserve = () => {
    localStorage.removeItem(params.LocationId);
    window.location.reload();
  };
  const getVisaqty = () => {
    var count = 0;
    for (var i = 0; i < reserveContext.passenger.length; ++i) {
      if (reserveContext.passenger[i].visa === true) count++;
    }

    return count;
  };
  const getWheelchairqty = () => {
    var count = 0;

    for (var i = 0; i < reserveContext.passenger.length; ++i) {
      if (reserveContext.passenger[i].wheelchair === true) count++;
    }

    return count;
  };
  const getSuiteqty = () => {
    var count = 0;
    for (var i = 0; i < reserveContext.suite.length; ++i) {
      count = reserveContext.suite[i].qty + count;
    }

    return count;
  };
  const sendReserve = () => {
    console.log(JSON.stringify(reserveContext));
    setpopupVisible(true);
  };

  const hideInfo = () => {
    setpopupVisible(false);
  };
  const getPetQty = () => {
    if (reserveContext.pet[0]) {
      return reserveContext.pet[0].qty;
    } else {
      return 0;
    }
  };

  const sumPet = () => {
    var priceList = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightinfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var sum = 0;
    var pet = reserveContext.pet;
    if (pet) {
      pet.forEach((element) => {
        console.log(pet);
        var price = priceList.find((d) => {
          return d.id === element.priceId;
        });

        sum = element.qty * price.serviceLinePrices[0].price;
      });
    }
    setpetTotal(sum);
    return sum;
  };

  const sumSuite = () => {
    var priceList = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightinfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var sum = 0;
    var suiteSum = reserveContext.suite;
    if (suiteSum) {
      suiteSum.forEach((element) => {
        console.log(suiteSum);
        var price = priceList.find((d) => {
          return d.id === element.id;
        });

        sum = sum + price.serviceLinePrices[0].price;
      });
    }
    setsuiteTotal(sum);
    return sum;
  };

  const sumAttendee = () => {
    var priceList = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightinfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var sum = 0;
    var attendeeSum = reserveContext.attendee;

    attendeeSum.forEach((element) => {
      if (!priceList) {
        return;
      }
      var price = priceList.find((d) => {
        return d.serviceTypeId === 2;
      });

      sum = sum + price.serviceLinePrices[0].price;
    });
    setattendeesTotal(sum);
    return sum;
  };

  const sumTransfer = () => {
    var priceList = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightinfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var sum = 0;
    var transferSum = reserveContext.transfer;
    console.log("transfer");
    console.log(transferSum);
    transferSum.forEach((element) => {
      var price = priceList.find((d) => {
        return d.id === element.typeId.value;
      });

      sum = sum + price.serviceLinePrices[0].price;
    });
    settransferTotal(sum);
    return sum;
  };

  const sumPassenger = () => {
    var priceList = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightinfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var visa = 0;
    var wheelchair = 0;
    var sum = 0;
    var PassengerSum = reserveContext.passenger;

    PassengerSum.forEach((element) => {
      if (!priceList) {
        return;
      }
      var price = priceList.find((d) => {
        return d.id === element.typeId.value;
      });

      sum = sum + price.serviceLinePrices[0].price;

      if (element.nationality === 1 && element.visa) {
        var price1 = priceList.find((d) => {
          return d.serviceTypeId === 5;
        });

        visa = visa + price1.serviceLinePrices[0].price;
      }
      if (element.nationality === 1 && element.wheelchair) {
        var price2 = priceList.find((d) => {
          return d.serviceTypeId === 8 && d.noneNative;
        });

        wheelchair = wheelchair + price2.serviceLinePrices[0].price;
      }
    });
    setwheelchareTotal(wheelchair);
    setvisaTotal(visa);
    setpsassengersTotal(sum);
    return sum;
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
          <div id="textBlock">View Summery & GEt Customer Information</div>
        </ScrollView>
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
        {serviceList &&
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
                        `${
                          reserveContext.passenger.length
                        }  →   ${psassengersTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}`}
                      {service === "Transfer" &&
                        `${
                          reserveContext.transfer.length
                        }  →   ${transferTotal.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}`}
                      {service === "Attendee" &&
                        `${
                          reserveContext.attendee.length
                        }  →   ${attendesssTotal.toLocaleString(undefined, {
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
                        reserveContext.passenger &&
                        reserveContext.passenger.length > 0 &&
                        `${getVisaqty()}  →   ${visaTotal.toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 0,
                          }
                        )}`}
                      {service === "Wheelchair" &&
                        reserveContext.passenger &&
                        reserveContext.passenger.length > 0 &&
                        `${getWheelchairqty()}  →   ${wheelchairTotal.toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 0,
                          }
                        )}`}
                      {service === "Suite" &&
                        reserveContext.suite &&
                        reserveContext.suite.length > 0 &&
                        `${getSuiteqty()}  →   ${suiteTotal.toLocaleString(
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
