import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";
import "./PetSection.css";
import Moment from "moment";
const PetSection = () => {
  const [reserveContext, setReserveContext] = useContext(ReserveContext);

  const reserveServiceRef = useRef(null);
  const pricesServiceRef = useRef();
  const [Counter, setCounter] = useState(0);
  const params = useParams();
  const [t] = useTranslation("common");
  const [, setReserve] = useState({});
  const [Countervalue, setCountervalue] = useState(0);
  useEffect(() => {
    if (
      reserveContext &&
      reserveContext.reserveItem &&
      reserveContext.reserveItem.find((data) => {
        return data.serviceTypeId === 4;
      })
    ) {
      var priceDatas = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightInfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      var pricedata = priceDatas.find((d) => {
        return d.serviceTypeId === 4;
      });
      var item = reserveContext.reserveItem.find((data) => {
        return data.serviceLineId === pricedata.id;
      });
      setCountervalue(item.serviceQty);
    } else {
      setCountervalue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveContext]);

  const Add = () => {
    setCounter(Counter + 1);
  };
  const Remove = () => {
    if (Counter > 0) {
      setCounter(Counter - 1);
    }
  };
  const getReserve = (reserve) => {
    setReserve(reserve);
  };

  // useEffect(() => {
  //   if (Counter || Counter === 0) {
  //     let reserveStorage = reserveServiceRef.current.GetReserve(
  //       params.LocationId
  //     );

  //     reserveServiceRef.current.UpdateReserve(
  //       params.LocationId,
  //       reserveStorage
  //     );
  //     setReserveContext(reserveStorage);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Counter]);

  useEffect(() => {
    if (Counter || Counter === 0) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );
      setReserveContext(reserveStorage);
      var context = reserveStorage;
      if (!context || !context.flightInfo || !context.flightInfo.flightName) {
        return;
      }
      if (!reserveStorage["reserveItem"]) {
        reserveStorage["reserveItem"] = [];
      }
      var priceData = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(context.flightInfo.flightDate)).format("YYYY-MM-DD")
      );
      var pricedata = priceData.find((d) => {
        return d.serviceTypeId === 4;
      });
      var item = reserveStorage.reserveItem.filter((data) => {
        return data.serviceLineId === pricedata.id;
      });

      if (item) {
        if (item.length < 1) {
          item = {
            serviceLineId: pricedata.id,
            serviceLineTitle: pricedata.title,
            serviceTypeId: 4,
            unitPrice: pricedata.serviceLinePrices[0].price,
            serviceQty: Counter,
          };

          reserveStorage["reserveItem"].push(item);
        } else {
          reserveStorage["reserveItem"].forEach((data) => {
            if (data.serviceLineId === pricedata.id) {
              data.serviceQty = Counter;
            }
          });
        }
      } else {
        reserveStorage["reserveItem"].push({
          serviceLineId: pricedata.id,
          serviceLineTitle: pricedata.title,
          serviceTypeId: 4,
          unitPrice: pricedata.serviceLinePrices[0].price,
          serviceQty: Counter,
        });
      }

      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );
      setReserveContext(reserveStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Counter]);

  const reserveUpdated = () => {};
  const updatePetCounter = (event) => {
    if (event.currentTarget.value < 0) {
      setCounter(event.currentTarget.value);
    }
  };

  return (
    <Fragment>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <div className="row">
        <div className="col-md-2 align-self-center">
          <p>{t("ReservePage.Pet")}</p>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-2">
              <button
                type="button"
                onClick={Remove}
                className="btn btn-primary"
                style={{ padding: "5px" }}
              >
                <div className="icon-container">
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
                    className="feather feather-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
            </div>
            <div className="col-md-5" style={{ padding: "0px" }}>
              <input
                value={Countervalue}
                onChange={updatePetCounter}
                min={0}
                className="p-0 m-0 form-control"
                style={{
                  height: "32px",
                  width: "100%",
                  fontSize: "24px",
                  textAlign: "center",
                }}
                type="number"
              />
            </div>
            <div className="col-md-1">
              <button
                type="button"
                onClick={Add}
                className="btn btn-primary"
                style={{ padding: "5px" }}
              >
                <div className="icon-container">
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
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PetSection;
