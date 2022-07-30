import React, { useState, useContext, useEffect } from "react";

import { useTranslation } from "react-i18next";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
import InputText from "../../UI/FormElement/InputText";
import classes from "./UpdateAccount.module.css";

const UpdateAccount = (props) => {
  const FillForm = (data) => {
    setRequestData({
      PostalAddress: { data: data.postalAddress },
      Phone: { data: data.phone },
      EmailAddress: { data: data.emailAddress },
      Title: { data: data.title },
    });
    formData["Title"] = { data: data.title, isValid: true };
    formData["PostalAddress"] = { data: data.postalAddress, isValid: true };
    formData["Phone"] = { data: data.phone, isValid: true };
    formData["EmailAddress"] = { data: data.emailAddress, isValid: true };

    setFormData(formData);
    checkForm();
    console.log(data);
  };
  const [t, i18n] = useTranslation("common");
  const [formData, setFormData] = useState({});
  const [formIsValid, setformIsValid] = useState();

  const basicContext = useContext(BasicContext);

  const [requestData, setRequestData] = useState({
    PostalAddress: { data: "" },
    Phone: { data: "" },
    EmailAddress: { data: "" },
    Title: { data: "" },
  });

  const [updatedRequestData, setUpdatedRequestData] = useState({
    PostalAddress: "",
    Phone: "",
    EmailAddress: "",
    Title: "",
  });

  const {
    isLoadingData,
    errorGettingdata,
    sendRequest: fetchAccountGet,
  } = useHttp(
    {
      url: basicContext.baseAddress + "/account/" + props.Account.AccountId,
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    FillForm
  );

  useEffect(() => {
    fetchAccountGet();
  }, []);

  const {
    isLoading,
    error,
    sendRequest: fetchAccount,
  } = useHttp(
    {
      url: basicContext.baseAddress + "/account/" + props.Account.AccountId,
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: updatedRequestData,
    },
    FillForm
  );
  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
  };
  const updateForm = (data, Id, valid) => {
    formData[Id] = { data: data, isValid: valid };

    setFormData(formData);
    checkForm();
  };

  const checkForm = () => {
    if (
      formData.EmailAddress &&
      formData.Title &&
      formData.Phone &&
      formData.EmailAddress.isValid === true &&
      formData.Title.isValid === true &&
      formData.Phone.isValid === true
    ) {
      setformIsValid(true);
      let PostalAddress = "";
      if (formData.PostalAddress && formData.PostalAddress.data) {
        PostalAddress = formData.PostalAddress.data;
      }
      setUpdatedRequestData({
        Title: formData.Title.data,
        EmailAddress: formData.EmailAddress.data,
        Phone: formData.Phone.data,
        PostalAddress: PostalAddress,
      });
    } else {
      setformIsValid(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log("adasdasd");
    console.log(formData);
    setUpdatedRequestData({
      Title: formData.Title.data,
      EmailAddress: formData.EmailAddress.data,
      Phone: formData.Phone.data,
      PostalAddress: "PostalAddress",
    });
    fetchAccount();
  };

  return (
    <div className={(classes.container, classes.singlFormContent)}>
      <div className="row">
        <div id="flFormsGrid" className="col-lg-12 layout-spacing">
          {isLoadingData && <h1>Is Loading</h1>}
          <form onSubmit={submitForm}>
            <div className="form-group mb-4">
              <InputText
                textAlign={styles.textAlign}
                title={t("Account.FormElement.Title")}
                type="text"
                id="Title"
                IsRequired={true}
                MinLength={3}
                RegexFormat=""
                value={requestData.Title.data}
                valueCallback={updateForm}
                requiredMassage={t("Account.FormElement.TitleRequiredMessage")}
              />
            </div>

            <div className="form-group">
              <InputText
                innerTextAlign="left"
                textAlign={styles.textAlign}
                title={t("Account.FormElement.EmailAddress")}
                type="text"
                id="EmailAddress"
                IsRequired={true}
                dir="ltr"
                value={requestData.EmailAddress.data}
                MinLength={3}
                RegexFormat="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
                formatMassage={t("Account.FormElement.EmailFormatMessage")}
                requiredMassage={t("Account.FormElement.EmailRequiredMessage")}
                valueCallback={updateForm}
              />
            </div>
            <div className="form-group">
              <InputText
                textAlign={styles.textAlign}
                title={t("Account.FormElement.Phone")}
                type="text"
                id="Phone"
                dir="ltr"
                innerTextAlign="left"
                IsRequired={true}
                MinLength={3}
                value={requestData.Phone.data}
                RegexFormat="^[0-9]{8,13}$"
                valueCallback={updateForm}
                requiredMassage={t("Account.FormElement.PhoneRequiredMessage")}
                formatMassage={t("Account.FormElement.PhoneFormatMessage")}
              />
            </div>

            <div className="form-group mb-">
              <InputText
                textAlign={styles.textAlign}
                title={t("Account.FormElement.PostalAddress")}
                type="text"
                value={requestData.PostalAddress.data}
                id="PostalAddress"
                IsRequired={false}
                MinLength={3}
                valueCallback={updateForm}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              {t("Account.FormElement.SaveAccount")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
