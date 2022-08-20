import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AirlineNameService from "../../Hooks/AirlineName/AirlineNameService";
import DatePicker from "../UI/FormElement/DatePicker";
import DropDown from "../UI/FormElement/DropDown";
import InputText from "../UI/FormElement/InputText";
import Modal from "../UI/Modal";
import Moment from "moment";
import classes from "./FlightNumberNewForm.module.css";
import useHttp from "../../Hooks/use-http";

import BasicContext from "../../Store/enviroment-context";
const FlightNumberEditForm = (props) => {
  const basicContext = useContext(BasicContext);
  const [formData, updateFormData] = useState({
    flightInfo: {
      departureAirport: "",
      departureCity: "",
      arrivalAirport: "",
      arrivalCity: "",
      arrivalTime: "",
      departureTime: "",
    },
    flightName: "",
    flightDate: "",
    flightTimeOnly: {
      hour: 0,
      minute: 0,
    },
    airlineName: "",
    status: false,
    scheduled: false,
    flightType: 0,
  });
  const [flightDate, setFlightDate] = useState(Date.now);

  const [flightTypes] = useState([
    { value: "0", label: "Arrival" },
    { value: "1", label: "Departure" },
  ]);
  const [airlineNamesList, setAirlineNamesList] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState({
    value: "",
    label: "",
  });
  const [selectedFlightType, setSelectedFlightType] = useState({
    value: "",
    label: "",
  });
  const [formIsValid] = useState({});
  const [t] = useTranslation("common");
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
  const [scheduledChecked, setScheduledChecked] = useState(false);

  const updatescheduled = (event) => {
    setScheduledChecked(event.currentTarget.checked);
    formData["scheduled"] = event.currentTarget.checked;
    updateFormData(formData);
  };
  const [statusChecked, setStatusChecked] = useState(false);

  const updateStatus = (event) => {
    setStatusChecked(event.currentTarget.checked);
    formData["status"] = event.currentTarget.checked;
    updateFormData(formData);
  };

  const submitForm = (event) => {
    event.preventDefault();

    postFlightNumber();
    return;
  };
  const GoToFlightList = (data) => {
    //  setformIsSumited(false);
    props.UpdateList();
  };
  const FillForm = (data) => {
    updateFormData(data);
    // formData.flightInfo.arrivalTime=data.flightInfo.arrivalTime.
  };
  useEffect(() => {
    setSelectedAirline(
      airlineNamesList.find((data) => {
        return data.label === formData.airlineName;
      })
    );

    setSelectedFlightType(
      flightTypes.find((data) => {
        return data.value === `${formData.flightType}`;
      })
    );
    setFlightDate(formData.flightDate);

    setStatusChecked(formData.status);
    setScheduledChecked(formData.scheduled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, scheduledChecked, statusChecked]);
  const { sendRequest: postFlightNumber } = useHttp(
    {
      url: `${basicContext.flightAddress}/FlightNumber/${props.FlightId}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: formData,
    },
    GoToFlightList
  );
  const { sendRequest: getFlightNumber } = useHttp(
    {
      url: `${basicContext.flightAddress}/FlightNumber/${props.FlightId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    FillForm
  );

  const updateForm = (data, id) => {
    if (
      id !== "departureAirport" &&
      id !== "departureCity" &&
      id !== "departureTime" &&
      id !== "arrivalAirport" &&
      id !== "arrivalCity" &&
      id !== "arrivalTime"
    ) {
      if (id === "flightType" || id === "airlineName") {
        formData[id] = data.label;
      } else if (id === "flightDate") {
        formData["flightDate"] = Moment(new Date(data)).format("YYYY-MM-DD");
      } else {
        formData[id] = data;
      }
    } else {
      formData.flightInfo[id] = data;
    }
    updateFormData(formData);

    return;
  };
  const getStore = (data) => {
    data.load().then((data) => {
      setAirlineNamesList(
        data.data.map((d) => {
          return { value: d.id, label: d.name };
        })
      );
    });
  };
  useEffect(() => {
    getFlightNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airlineNamesList]);

  return (
    <Modal cntx={props}>
      <AirlineNameService getStore={getStore} />
      <div className={(classes.container, classes.singlFormContent)}>
        <div className="row">
          <div id="flFormsGrid" className="col-lg-12 layout-spacing">
            <form onSubmit={submitForm}>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <DropDown
                    textAlign={styles.textAlign}
                    title={t("FlightNumber.FormElement.AirlineName")}
                    type="text"
                    id="airlineName"
                    IsRequired={true}
                    MinLength={0}
                    RegexFormat=""
                    value={selectedAirline}
                    options={airlineNamesList}
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.AirlineNameRequiredMessage"
                    )}
                  />
                </div>

                <div className="form-group col-md-4">
                  <InputText
                    textAlign={styles.textAlign}
                    title={t("FlightNumber.FormElement.FlightNumber")}
                    type="text"
                    id="flightName"
                    IsRequired={true}
                    MinLength={3}
                    value={formData.flightName}
                    RegexFormat=""
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.FlightNumberRequiredMessage"
                    )}
                  />
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="from">
                    {t("FlightNumber.FormElement.FlightDate")}
                  </label>
                  <DatePicker
                    textAlign={styles.textAlign}
                    title={t("FlightNumber.FormElement.FlightDate")}
                    type="text"
                    id="flightDate"
                    IsRequired={true}
                    value={flightDate}
                    MinLength={3}
                    RegexFormat=""
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.FlightNumberRequiredMessage"
                    )}
                  />
                </div>
              </div>
              <div className="form-row mb-4">
                <div className="form-group col-md-4">
                  <label>&nbsp;</label>
                  <div className="">
                    <input
                      style={{ height: "35px", width: "35px" }}
                      type="checkbox"
                      className=""
                      id="scheduled"
                      checked={scheduledChecked}
                      onChange={updatescheduled}
                    />
                    <label
                      style={{ textAlign: t("textAlign"), float: "right" }}
                      className=""
                      htmlFor="Scheduled"
                    >
                      {t("FlightNumber.FormElement.Scheduled")}
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label>&nbsp;</label>
                  <div className="">
                    <input
                      style={{ height: "35px", width: "35px" }}
                      type="checkbox"
                      className=""
                      checked={statusChecked}
                      onChange={updateStatus}
                      id="status"
                    />
                    <label
                      style={{ textAlign: t("textAlign"), float: "right" }}
                      className=""
                      htmlFor="status"
                    >
                      {t("FlightNumber.FormElement.Status")}
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <DropDown
                    textAlign={styles.textAlign}
                    title={t("FlightNumber.FormElement.FlightType")}
                    type="text"
                    id="flightType"
                    value={selectedFlightType}
                    IsRequired={true}
                    MinLength={0}
                    RegexFormat=""
                    options={flightTypes}
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.FlightTypeRequiredMessage"
                    )}
                  />
                </div>
              </div>
              <hr />
              <div className="form-row mb-4">
                <div className="form-group col-md-4">
                  <InputText
                    innerTextAlign="left"
                    textAlign={styles.textAlign}
                    title={t("FlightNumber.FormElement.DepartureAirport")}
                    type="text"
                    dir="ltr"
                    id="departureAirport"
                    IsRequired={true}
                    MinLength={3}
                    RegexFormat=""
                    value={formData.flightInfo.departureAirport}
                    requiredMassage={t(
                      "FlightNumber.FormElement.DepartureAirportRequiredMessage"
                    )}
                    valueCallback={updateForm}
                  />
                </div>
                <div className="form-group col-md-4">
                  <InputText
                    textAlign={styles.textAlign}
                    title={t("FlightNumber.FormElement.DepartureCity")}
                    type="text"
                    id="departureCity"
                    dir="ltr"
                    innerTextAlign="left"
                    IsRequired={true}
                    MinLength={3}
                    RegexFormat=""
                    value={formData.flightInfo.departureCity}
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.DepartureCityRequiredMessage"
                    )}
                    formatMassage=""
                  />
                </div>
                <div className="form-group col-md-4">
                  <InputText
                    textAlign={styles.ltr}
                    title={t("FlightNumber.FormElement.DepartureTime")}
                    type="text"
                    IsRequired={true}
                    id="departureTime"
                    value={formData.flightInfo.departureTime}
                    MinLength={3}
                    RegexFormat="^[0-2]{1}[0-9]{1}[:][0-5]{1}[0-9]{1}$"
                    formatMassage={t(
                      "FlightNumber.FormElement.DepartureTimeFromatMessage"
                    )}
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.DepartureTimeRequiredMessage"
                    )}
                  />
                </div>
              </div>

              <div className="form-row mb-4">
                <div className="form-group col-md-4">
                  <InputText
                    innerTextAlign="left"
                    textAlign={styles.textAlign}
                    title={t("FlightNumber.FormElement.ArrivalAirport")}
                    type="text"
                    dir="ltr"
                    id="arrivalAirport"
                    IsRequired={true}
                    MinLength={3}
                    value={formData.flightInfo.arrivalAirport}
                    RegexFormat=""
                    formatMassage=""
                    requiredMassage={t(
                      "FlightNumber.FormElement.ArrivalAirportRequiredMessage"
                    )}
                    valueCallback={updateForm}
                  />
                </div>
                <div className="form-group col-md-4">
                  <InputText
                    textAlign={styles.textAlign}
                    title={t("FlightNumber.FormElement.ArrivalCity")}
                    type="text"
                    id="arrivalCity"
                    dir="ltr"
                    innerTextAlign="left"
                    IsRequired={true}
                    MinLength={3}
                    RegexFormat=""
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.ArrivalCityRequiredMessage"
                    )}
                    value={formData.flightInfo.arrivalCity}
                    formatMassage=""
                  />
                </div>

                <div className="form-group col-md-4">
                  <InputText
                    textAlign={styles.ltr}
                    title={t("FlightNumber.FormElement.ArrivalTime")}
                    value={formData.flightInfo.arrivalTime}
                    type="text"
                    id="arrivalTime"
                    IsRequired={true}
                    MinLength={3}
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.ArrivalTimeRequiredMessage"
                    )}
                    RegexFormat="^[0-2]{1}[0-9]{1}[:][0-5]{1}[0-9]{1}$$"
                    formatMassage={t(
                      "FlightNumber.FormElement.ArrivalTimeFromatMessage"
                    )}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!formIsValid}
                className="btn btn-primary mt-3"
              >
                {t("FlightNumber.FormElement.SaveFlightNumber")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FlightNumberEditForm;
