import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useHttp from "../../../../../Hooks/use-http";
import BasicContext from "../../../../../Store/enviroment-context";
import InputText from "../../../../UI/FormElement/InputText";

import Modal from "../../../../UI/Modal";
const ServiceLocationForm = (props) => {
  const UpdateList = (data) => {
    // history.push("/account/" + data.id);
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

  const checkForm = () => {
    if (
      formData.Address &&
      formData.Title &&
      formData.Location &&
      formData.Address.isValid === true &&
      formData.Title.isValid === true &&
      formData.Location.isValid === true
    ) {
      setformIsValid(true);

      setRequestData({
        Title: formData.Title.data,
        Address: formData.Address.data,
        Location: formData.Location.data,
        Account: {
          id: `${params.AccountId}`,
          title: " ",
        },
      });
    } else {
      setformIsValid(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
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
