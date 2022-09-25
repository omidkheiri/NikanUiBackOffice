import moment from "moment";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";
import Moment from "moment";
import "./SuiteSection.css";
const SuiteSection = (props) => {
  const [reserveContext, setReserveContext] = useContext(ReserveContext);

  const reserveServiceRef = useRef(null);
  const pricesServiceRef = useRef();
  const [Counter, setCounter] = useState(0);
  const params = useParams();
  const [, setReserve] = useState({});
  useEffect(() => {
    if (
      reserveContext &&
      reserveContext.reserveItem &&
      reserveContext.reserveItem.find((data) => {
        return data.serviceLineId === props.priceType.id;
      })
    ) {
      var item = reserveContext.reserveItem.find((data) => {
        return data.serviceLineId === props.priceType.id;
      });
      if (!item) {
        return;
      }
      if (item.serviceQty === Counter) {
      } else {
        setCounter(item.serviceQty);
      }
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

  useEffect(() => {
    if (Counter || Counter === 0) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );

      var priceDatas = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightInfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      if (!priceDatas) {
        return;
      }
      var pricedata = priceDatas.find((d) => {
        return d.id === props.priceType.id;
      });

      var item = reserveStorage.reserveItem.filter((data) => {
        return data.serviceLineId == props.priceType.id;
      });

      if (item) {
        if (item.length < 1) {
          item = {
            serviceLineId: pricedata.id,
            serviceLineTitle: pricedata.title,
            serviceTypeId: 6,
            unitPrice: pricedata.serviceLinePrices[0].price,
            serviceQty: Counter,
          };

          reserveStorage["reserveItem"].push(item);
        } else {
          reserveStorage["reserveItem"].forEach((data) => {
            if (data.serviceLineId === props.priceType.id) {
              data.serviceTypeId = 6;
              data.serviceQty = Counter;
            }
          });
        }
      } else {
        if (!reserveStorage["reserveItem"]) {
          reserveStorage["reserveItem"] = [];
        }
        reserveStorage["reserveItem"].push({
          serviceLineId: pricedata.id,
          serviceLineTitle: pricedata.title,
          serviceTypeId: 6,
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

  const updateSuiteCounter = (event) => {
    if (event.currentTarget.value < 0) {
      setCounter(event.currentTarget.value);
    }
  };
  const reserveUpdated = () => {};
  return (
    <Fragment>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <div className="row row-background" style={{ padding: "3px" }}>
        <div className="col-md-4 align-self-center">
          <p style={{ textAlign: "right" }}>{props.priceType.title}</p>
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
                onChange={updateSuiteCounter}
                value={Counter}
                min={0}
                className="p-0 m-0 form-control "
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
      <hr style={{ margin: "3px" }}></hr>
    </Fragment>
  );
};

export default SuiteSection;
