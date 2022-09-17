import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "../../UI/FormElement/DatePicker";
import InputText from "../../UI/FormElement/InputText";
import Moment from "moment";
import DropDown from "../../UI/FormElement/DropDown";
import FlightInfo from "./FlightInfo";
import ReserveService from "../../../Hooks/Reserve/ReserveService";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
import { useParams } from "react-router-dom";
import PriceListService from "../../../Hooks/Prices/PriceListService";
import ReserveContext from "../../../Store/ReserveContext";
const FlightInfoForm = (props) => {
  const pricesServiceRef = useRef(null);
  const params = useParams();
  const basicContext = useContext(BasicContext);
  const reserveServiceRef = useRef(null);
  const [flightDataSource, setFlightDataSource] = useState();
  const [mindate] = useState(Moment(Date.now()).format("YYYY-MM-DD"));
  const [selectedFlightType, setselectedFlightType] = useState();
  const [selectedFlightNumber, setselectedFlightNumber] = useState();
  const [selectedDate, setselectedDate] = useState();
  const [searchTerm, setsearchterm] = useState();
  const [flightId, setflightId] = useState();

  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  useEffect(() => {
    if (flightId) {
      fetchFlightNumber();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flightId]);
  const getReserve = (reserve) => {
    setReserveContext(reserve);
  };
  const [t] = useTranslation("common");

  const [flightTypes] = useState([
    { value: "0", label: "Arrival" },
    { value: "1", label: "Departure" },
  ]);
  const updateFlightDateForm = (data) => {
    setselectedFlightType({});
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );

    reserveStorage.flightInfo.flightDate = data;
    reserveServiceRef.current.UpdateReserve(params.LocationId, reserveStorage);
    setselectedDate(data);
    if (data) {
      props.flightInfo(true, data);
    } else {
      props.flightInfo(false, data);
    }

    setReserveContext(reserveStorage);
  };
  useEffect(() => {
    if (selectedDate) {
      fetchLocationServiceWithPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const updateFlightTimeForm = () => {};
  const updateFlightType = useCallback((data) => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    reserveStorage.flightInfo.flightType = data.value;
    reserveServiceRef.current.UpdateReserve(params.LocationId, reserveStorage);
    setReserveContext(reserveStorage);

    setselectedFlightNumber({});
  });
  const updateFlightNumber = useCallback(
    (data) => {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );
      var str = JSON.stringify(data);
      if (str === "{}") {
        reserveStorage.flightInfo = {};
      } else if (data === { value: undefined, label: undefined }) {
        reserveStorage.flightInfo = {};
      } else {
        reserveStorage.flightInfo.flightName = data.label;
        reserveStorage.flightInfo.id = data.value;

        setflightId(data.value);

        reserveServiceRef.current.UpdateReserve(
          params.LocationId,
          reserveStorage
        );
      }

      setReserveContext(reserveStorage);
      setselectedFlightNumber(data);
    },
    [params.LocationId, setReserveContext]
  );
  const GetServiceListData = (data) => {
    localStorage.setItem(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightInfo.flightDate)).format(
          "YYYY-MM-DD"
        ),
      JSON.stringify(data)
    );
  };

  const { sendRequest: fetchLocationServiceWithPrice } = useHttp(
    {
      url:
        basicContext.serviceLineAddress +
        "/ServiceLine/Location/" +
        params.LocationId +
        "?DateTime=" +
        Moment(new Date(selectedDate)).format("YYYY-MM-DD"),
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    GetServiceListData
  );
  const handleInputChange = () => {
    return;
  };
  const fillFlightNumber = (data) => {
    setFlightDataSource(
      data.map((d) => {
        return { value: d.id, label: d.flightName };
      })
    );
  };

  const fillFilghtInfo = (data) => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );

    let flightDate = reserveStorage.flightInfo.flightDate;
    reserveStorage.flightInfo = data;
    reserveStorage.flightInfo.flightDate = flightDate;

    reserveStorage.flightInfo["arrivalTime"] = data.flightInfo.arrivalTime;
    reserveStorage.flightInfo["departureTime"] = data.flightInfo.departureTime;
    reserveStorage.flightInfo["arrivalCity"] = data.flightInfo.arrivalCity;
    reserveStorage.flightInfo["departureCity"] = data.flightInfo.departureCity;
    reserveStorage.flightInfo["departureAirport"] =
      data.flightInfo.departureAirport;
    reserveStorage.flightInfo["arrivalAirport"] =
      data.flightInfo.arrivalAirport;

    reserveServiceRef.current.UpdateReserve(params.LocationId, reserveStorage);
    setReserveContext(reserveStorage);
  };

  const { sendRequest: fetchFlightNumber } = useHttp(
    {
      url: selectedFlightNumber
        ? `${basicContext.flightAddress}/FlightNumber/${flightId}`
        : ``,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillFilghtInfo
  );

  const { sendRequest: fetchFlightNumbers } = useHttp(
    {
      url: `${
        basicContext.flightAddress
      }/FlightNumber/SelectList?SearchTerm=${searchTerm}&FlightDate=${
        selectedDate
          ? Moment(new Date(selectedDate)).format("YYYY-MM-DD")
          : null
      }`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillFlightNumber
  );

  const handleFlightnumberInputChange = (data) => {
    setsearchterm(data);
  };
  useEffect(() => {
    if (searchTerm && searchTerm >= 3 && selectedDate) fetchFlightNumbers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedDate]);

  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
    ltr: {
      textAlign: "left",
      direction: "ltr",
      width: "100%",
    },
  };

  useEffect(() => {
    if (params.LocationId) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );
      if (reserveStorage) {
        try {
          var ft = flightTypes.find((d) => {
            return d.value === `${reserveStorage.flightInfo.flightType}`;
          });
          setselectedFlightType(ft);

          setselectedFlightNumber({
            value: reserveStorage.flightInfo.id,
            label: reserveStorage.flightInfo.flightName,
          });
          setselectedDate(
            Moment(new Date(reserveStorage.flightInfo.flightDate)).format(
              "YYYY-MM-DD"
            )
          );
          props.flightInfo(true, reserveStorage.flightInfo.flightDate);

          setReserveContext(reserveStorage);
        } catch (e) {
          console.log(e);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const reserveUpdated = () => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    setReserveContext(reserveStorage);
  };
  return (
    <Fragment>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />

      {selectedFlightNumber && selectedFlightNumber.value && <FlightInfo />}

      <div className="row">
        <div className="col">
          <label>{t("ReservePage.FlightInfoForm.FlightDate")} </label>

          <DatePicker
            minDate={mindate}
            innerTextAlign="left"
            id="FlightDate"
            type="text"
            dir="ltr"
            value={selectedDate}
            IsRequired={true}
            valueCallback={updateFlightDateForm}
          />
        </div>
        <div className="col">
          <DropDown
            title={t("ReservePage.FlightInfoForm.FlightType")}
            type="text"
            id="flightType"
            IsRequired={true}
            handleInputChange={handleInputChange}
            MinLength={0}
            value={selectedFlightType}
            options={flightTypes}
            valueCallback={updateFlightType}
            requiredMassage={t(
              "ReservePage.FlightInfoForm.FlightTypeRequiredMessage"
            )}
          />
        </div>
        <div className="col">
          <DropDown
            title={t("ReservePage.FlightInfoForm.FlightNumber")}
            type="text"
            id="flightNumber"
            IsRequired={true}
            handleInputChange={handleFlightnumberInputChange}
            MinLength={0}
            value={selectedFlightNumber}
            options={flightDataSource}
            valueCallback={updateFlightNumber}
            requiredMassage={t(
              "ReservePage.FlightInfoForm.FlightNumberRequiredMessage"
            )}
          />
        </div>

        {reserveContext && reserveContext.flightInfo && (
          <div className="col">
            <InputText
              textAlign={styles.textAlign}
              title={
                reserveContext.flightInfo.flightType === 1
                  ? t("ReservePage.FlightInfoForm.DepartureFlightTime")
                  : t("ReservePage.FlightInfoForm.ArrivalFlightTime")
              }
              type="text"
              id="flightType"
              IsRequired={true}
              RegexFormat="^[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$"
              value={
                reserveContext.flightInfo.flightType === 1
                  ? reserveContext.flightInfo.departureTime
                  : reserveContext.flightInfo.arrivalTime
              }
              valueCallback={updateFlightTimeForm}
              requiredMassage={t(
                "ReservePage.FlightInfoForm.FlightTimeMessage"
              )}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default FlightInfoForm;
