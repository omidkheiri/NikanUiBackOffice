import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { group } from "core-js/actual/array/group";

import { useParams } from "react-router-dom";
import ReserveContext from "../../../Store/ReserveContext";
import Moment from "moment";
import PriceListService from "../../../Hooks/Prices/PriceListService";
import { useTranslation } from "react-i18next";
import SelectContact from "./SelectContact";
import ReserveService from "../../../Hooks/Reserve/ReserveService";

const ReserveSummery = () => {
  const [t] = useTranslation("common");
  const pricesServiceRef = useRef(null);
  const params = useParams();
  const [serviceList, setserviceList] = useState();
  const [, setserviceListItem] = useState();
  const [gettotal, setgettotal] = useState();
  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const [psassengersTotal, setpsassengersTotal] = useState(0);
  const [attendesssTotal, setattendeesTotal] = useState(0);
  const [transferTotal, settransferTotal] = useState(0);
  const [petTotal, setpetTotal] = useState(0);
  const [wheelchairTotal, setwheelchareTotal] = useState(0);
  const [visaTotal, setvisaTotal] = useState(0);
  const [suiteTotal, setsuiteTotal] = useState(0);
  const reserveServiceRef = useRef();
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
  }, [reserveContext, visaTotal, wheelchairTotal]);
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
    var priceList = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightInfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var sum = 0;
    var pet = reserveContext.reserveItem.filter((data) => {
      return data.serviceTypeId === 4;
    });
    if (pet) {
      pet.forEach((element) => {
        var price = priceList.find((d) => {
          return d.id === element.serviceLineId;
        });

        sum = element.serviceQty * price.serviceLinePrices[0].price;
      });
    }
    setpetTotal(sum);
    return sum;
  };

  const sumSuite = () => {
    var priceList = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightInfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var sum = 0;
    var suiteSum = reserveContext.reserveItem.filter((data) => {
      return data.serviceTypeId === 6 && data.serviceQty > 0;
    });
    if (suiteSum) {
      suiteSum.forEach((element) => {
        var price = priceList.find((d) => {
          return d.id === element.serviceLineId;
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
        Moment(new Date(reserveContext.flightInfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var sum = 0;
    var attendeeSum = reserveContext.reserveItem.filter((data) => {
      return data.attendee;
    });

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
        Moment(new Date(reserveContext.flightInfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    var sum = 0;
    var transferSum = reserveContext.reserveItem.filter((data) => {
      return data.serviceTypeId === 3;
    });

    transferSum.forEach((element) => {
      var price = priceList.find((d) => {
        return d.id === element.serviceLineId;
      });

      sum = sum + price.serviceLinePrices[0].price;
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
  const selectedIdChanged = (data) => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    if (data === "") {
      reserveContext["customerId"] = data;

      reserveStorage["customerId"] = data;
      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );
    } else {
      if (data[0]) {
        reserveContext["customerId"] = data[0];
        setReserveContext(reserveContext);
        reserveStorage["customerId"] = data[0];

        reserveServiceRef.current.UpdateReserve(
          params.LocationId,
          reserveStorage
        );
      }
    }
  };
  const reserveUpdated = () => {};
  return (
    <Fragment>
      <ReserveService reserveUpdated={reserveUpdated} ref={reserveServiceRef} />
      <PriceListService ref={pricesServiceRef} />
      <div id="content" className="container" style={{ marginTop: "10px" }}>
        <div
          id="navSection"
          data-spy="affix"
          className="nav sidenav"
          style={{ top: "95px", width: "280px", direction: "rtl" }}
        >
          {reserveContext &&
            reserveContext.reserveItem &&
            serviceList &&
            serviceList.map((service) => {
              return (
                <div key={service} className="list-group">
                  <div
                    className="nav-link active"
                    style={{
                      borderBottom: "1px solid #edeaea",
                      padding: "0px",
                    }}
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
        <div
          className="container"
          style={{
            maxWidth: "78.333333% !important",
            marginRight: "14px",
            padding: "0 32px !important",
            minHeight: "400px",
          }}
        >
          <div
            className="row layout-top-spacing "
            style={{ direction: "rtl", width: "100%" }}
          >
            <div className="col-lg-12 col-12 layout-spacing">
              <div className="form-group col-md-12">
                <SelectContact selectedIdChanged={selectedIdChanged} />
              </div>
            </div>

            <div className="col-lg-12 col-12 layout-spacing">
              <div className="table-responsive">
                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th className="text-center">
                        {t("SummeryPage.List.Type")}
                      </th>
                      <th> {t("SummeryPage.List.UnitPrice")}</th>
                      <th> {t("SummeryPage.List.QTY")}</th>
                      <th className="">{t("SummeryPage.List.Description")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reserveContext.reserveItem.map((data) => {
                      return (
                        <tr key={data.serviceLineId}>
                          <td className="text-center">
                            {data.serviceLineTitle}
                          </td>
                          <td className="text-primary">
                            {data.unitPrice.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </td>
                          <td>{data.serviceQty}</td>
                          <td className="">
                            <span className=" shadow-none badge outline-badge-primary">
                              {data.passenger &&
                                data.passenger.name +
                                  " " +
                                  data.passenger.lastName}
                              {data.attendee &&
                                data.attendee.name +
                                  " " +
                                  data.attendee.lastName}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReserveSummery;
