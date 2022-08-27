import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useHttp from "../../../../../Hooks/use-http";
import BasicContext from "../../../../../Store/enviroment-context";
import InputText from "../../../../UI/FormElement/InputText";
import Moment from "moment";
import Modal from "../../../../UI/Modal";
import DatePicker from "../../../../UI/FormElement/DatePicker";
const ServiceLocationUpdateForm = (props) => {
  const UpdateList = (data) => {
    props.UpdateList();
  };
  const [t] = useTranslation("common");
  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
  };
  const [formData, setFormData] = useState({});
  const [loaded, setloaded] = useState(false);
  const [title, settitle] = useState();
  const [formIsValid, setformIsValid] = useState();
  const basicContext = useContext(BasicContext);
  const params = useParams();

  const [requestData, setRequestData] = useState({});
  const fillList = (data) => {
    //{"title":"dddfgdfg","address":"dfgdfgdfg","location":"ddfgdfg","account":null,"maxAcceptDate":"0001-01-01T00:00:00+00:00","status":true,"id":"6d32c225-f903-4c40-87ec-914dc6f7adad"}

    console.log(data);
    setRequestData(data);

    setloaded(true);
  };
  const { sendRequest: getLocation } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/ServiceLocation/${props.LocationId}`,
      method: "Get",
      headers: { "Content-Type": "" },
      body: null,
    },
    fillList
  );

  useEffect(() => {
    console.log(props.LocationId);
    if (props.LocationId) {
      getLocation();
    }
  }, [props.LocationId]);
  const { sendRequest: fetchAccount } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/ServiceLocation/${props.LocationId}`,
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    UpdateList
  );
  const updateForm = (data, Id, valid) => {
    console.log();
    requestData[Id] = data;

    setRequestData(requestData);
    checkForm();
  };

  const updateMAxDateForm = (data, Id, valid) => {
    requestData[Id] = data;

    checkForm();
  };

  const checkForm = () => {
    console.log(requestData);
    if (
      requestData.address &&
      requestData.title &&
      requestData.location &&
      requestData.maxAcceptDate
    ) {
      setformIsValid(true);
    } else {
      setformIsValid(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    requestData.maxAcceptDate = Moment(
      new Date(requestData.maxAcceptDate)
    ).format("YYYY-MM-DD");
    console.log(requestData);
    fetchAccount();
  };
  return (
    <Modal cntx={props}>
      {requestData && (
        <div className="col-lg-12 layout-spacing">
          <form onSubmit={submitForm}>
            <div className="form-group mb-4">
              <InputText
                textAlign={styles.textAlign}
                title={t("ServiceLocation.FormElement.Title")}
                type="text"
                id="title"
                IsRequired={true}
                MinLength={3}
                RegexFormat=""
                valueCallback={updateForm}
                value={requestData.title}
                requiredMassage={t(
                  "ServiceLocation.FormElement.TitleRequiredMessage"
                )}
              />
            </div>
            <div className="form-group mb-4">
              <InputText
                textAlign={styles.textAlign}
                title={t("ServiceLocation.FormElement.Address")}
                type="text"
                id="address"
                IsRequired={true}
                MinLength={3}
                RegexFormat=""
                valueCallback={updateForm}
                value={requestData.address}
                requiredMassage={t(
                  "ServiceLocation.FormElement.AddressRequiredMessage"
                )}
              />
            </div>
            <div className="form-group mb-4">
              <InputText
                textAlign={styles.textAlign}
                title={t("ServiceLocation.FormElement.Location")}
                type="text"
                id="location"
                IsRequired={true}
                MinLength={3}
                RegexFormat=""
                valueCallback={updateForm}
                value={requestData.location}
                requiredMassage={t(
                  "ServiceLocation.FormElement.LocationRequiredMessage"
                )}
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="from">
                {t("ServiceLocation.FormElement.MaxAllowtedDate")}
              </label>
              <DatePicker
                id="maxAcceptDate"
                minDate={new Date()}
                type="text"
                placeholder="Select Date.."
                IsRequired={true}
                value={
                  requestData.maxAcceptDate
                    ? Moment(new Date(requestData.maxAcceptDate)).format(
                        "YYYY-MM-DD"
                      )
                    : ""
                }
                valueCallback={updateMAxDateForm}
              />
            </div>

            <button
              type="submit"
              disabled={!formIsValid}
              className="btn btn-primary mt-3"
            >
              {t("ServiceLocation.FormElement.SaveAccount")}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default ServiceLocationUpdateForm;
