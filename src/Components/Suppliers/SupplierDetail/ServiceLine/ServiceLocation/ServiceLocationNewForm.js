import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useHttp from "../../../../../Hooks/use-http";
import BasicContext from "../../../../../Store/enviroment-context";
import InputText from "../../../../UI/FormElement/InputText";
import Moment from "moment";
import Modal from "../../../../UI/Modal";
import DatePicker from "../../../../UI/FormElement/DatePicker";
const ServiceLocationForm = (props) => {
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
  const [formIsValid, setformIsValid] = useState();
  const basicContext = useContext(BasicContext);
  const params = useParams();

  const [requestData, setRequestData] = useState({
    Title: { data: "" },
    Address: { data: "" },
    Location: { data: "" },
    maxAcceptDate: { data: [] },
  });

  const { sendRequest: fetchAccount } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/ServiceLocation`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    UpdateList
  );
  const updateForm = (data, Id, valid) => {
    formData[Id] = { data: data, isValid: valid };

    setFormData(formData);
    checkForm();
  };

  const updateMAxDateForm = (data, Id, valid) => {
    formData[Id] = { data: data, isValid: true };
    setFormData(formData);
    checkForm();
  };

  const checkForm = () => {
    if (
      formData.Address &&
      formData.Title &&
      formData.Location &&
      formData.Address.isValid === true &&
      formData.Title.isValid === true &&
      formData.Location.isValid === true
    ) {
      if (formData.maxAcceptDate) {
        setformIsValid(true);

        setRequestData({
          Title: formData.Title.data,
          Address: formData.Address.data,
          Location: formData.Location.data,
          maxAcceptDate: formData.maxAcceptDate,
          Account: {
            id: `${params.AccountId}`,
            title: " ",
          },
        });
      }
    } else {
      setformIsValid(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(Moment(requestData.maxAcceptDate).format("YYYY-MM-DD"));
    requestData.maxAcceptDate = Moment(requestData.maxAcceptDate).format(
      "YYYY-MM-DD"
    );
    fetchAccount();
  };
  return (
    <Modal cntx={props}>
      <div className="col-lg-12 layout-spacing">
        <form onSubmit={submitForm}>
          <div className="form-group mb-4">
            <InputText
              textAlign={styles.textAlign}
              title={t("ServiceLocation.FormElement.Title")}
              type="text"
              id="Title"
              IsRequired={true}
              MinLength={3}
              RegexFormat=""
              valueCallback={updateForm}
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
              id="Address"
              IsRequired={true}
              MinLength={3}
              RegexFormat=""
              valueCallback={updateForm}
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
              id="Location"
              IsRequired={true}
              MinLength={3}
              RegexFormat=""
              valueCallback={updateForm}
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
    </Modal>
  );
};

export default ServiceLocationForm;
