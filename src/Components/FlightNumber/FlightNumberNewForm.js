import React, { useContext, useRef, useState } from "react";
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
const FlightNumberNewForm = (props) => {
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
  const [scheduledChecked, setScheduledChecked] = useState(false);
  const scheduledElement = useRef();
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

  const [flightTypes] = useState([
    { value: "0", label: "Arrival" },
    { value: "1", label: "Departure" },
  ]);
  const [airlineNamesList, setAirlineNamesList] = useState([]);
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

  const submitForm = (event) => {
    event.preventDefault();

    postFlightNumber();
    return;
  };
  const GoToFlightList = () => {
    props.UpdateList();
  };
  const { sendRequest: postFlightNumber } = useHttp(
    {
      url: basicContext.flightAddress + "/FlightNumber",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    },
    GoToFlightList
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
      if (id === "airlineName") {
        formData[id] = data.label;
      } else if (id === "flightType") {
        formData[id] = data.value;
      } else if (id === "flightDate") {
        formData["flightDate"] = Moment(new Date(data)).format("YYYY-MM-DD");
        scheduledElement.current.enabled = false;
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
  const handleInputChange = (data) => {
    console.log(data);
  };
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
                    handleInputChange={handleInputChange}
                    IsRequired={true}
                    MinLength={0}
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
                      ref={scheduledElement}
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
                    IsRequired={true}
                    handleInputChange={handleInputChange}
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
                    innerTextAlign="left"
                    IsRequired={true}
                    id="departureTime"
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
                    IsRequired={true}
                    MinLength={3}
                    RegexFormat=""
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.ArrivalCityRequiredMessage"
                    )}
                    formatMassage=""
                  />
                </div>

                <div className="form-group col-md-4">
                  <InputText
                    textAlign={styles.ltr}
                    title={t("FlightNumber.FormElement.ArrivalTime")}
                    type="text"
                    id="arrivalTime"
                    innerTextAlign="left"
                    RegexFormat="^[0-2]{1}[0-9]{1}[:][0-5]{1}[0-9]{1}$"
                    formatMassage={t(
                      "FlightNumber.FormElement.DepartureTimeFromatMessage"
                    )}
                    IsRequired={true}
                    MinLength={3}
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "FlightNumber.FormElement.ArrivalTimeRequiredMessage"
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

export default FlightNumberNewForm;
