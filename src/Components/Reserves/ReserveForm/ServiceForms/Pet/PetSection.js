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

  useEffect(() => {
    if (reserveContext && reserveContext.pet) {
      var type = typeof reserveContext.pet;
      if (type === "number") {
        reserveContext.pet = [{ priceId: "priceId", qty: 0 }];
      }
      var priceData = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      var pricedata = priceData.find((d) => {
        return d.serviceTypeId === 4;
      });
      setCounter(reserveContext.pet[0].qty);
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
    if (Counter && Counter >= 0) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );

      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );
      setReserveContext(reserveStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Counter]);

  useEffect(() => {
    if (Counter && Counter >= 0) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );

      if (reserveStorage.pet !== []) {
        reserveStorage["pet"] = [];
      }

      var priceData = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      var pricedata = priceData.find((d) => {
        return d.serviceTypeId === 4;
      });
      var item = reserveStorage.pet[0];

      if (item) {
        item.qty = Counter;
      } else {
        reserveStorage["pet"].push({
          priceId: pricedata.id,

          qty: Counter,
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
                value={Counter}
                onChange={updatePetCounter}
                min={0}
                className="p-0 m-0"
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
