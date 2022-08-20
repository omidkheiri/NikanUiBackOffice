import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
import InputText from "../../UI/FormElement/InputText";
import classes from "./AccountNewForm.module.css";

const AccountNewForm = () => {
  const GoToAccountPanel = (data) => {
    history.push("/account/" + data.id);
  };
  const [t] = useTranslation("common");
  const [formData, setFormData] = useState({});
  const [formIsValid, setformIsValid] = useState();

  const basicContext = useContext(BasicContext);
  const history = useHistory();
  const [requestData, setRequestData] = useState({
    PostalAddress: { data: "" },
    Phone: { data: "" },
    EmailAddress: { data: "" },
    PostallAddress: { data: "" },
  });

  const {
    isLoading,
    error,
    sendRequest: fetchAccount,
  } = useHttp(
    {
      url: basicContext.baseAddress + "/account",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    GoToAccountPanel
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
      setRequestData({
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
    fetchAccount();
  };

  return (
    <div className={(classes.container, classes.singlFormContent)}>
      <div className="row">
        <div id="flFormsGrid" className="col-lg-12 layout-spacing">
          <div className="statbox widget box box-shadow">
            <div className="widget-header">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                  <h4 className="invalid-feedback" style={{ display: "block" }}>
                    {t("Account.FormElement.FormTitle")}
                  </h4>
                  {isLoading && <h1>Loading ...</h1>}
                  {error && (
                    <h3
                      className="invalid-feedback"
                      style={{ display: "block", textAlign: "center" }}
                    >
                      {t("Account.FormElement.ErrorResponse_" + error.message)}
                    </h3>
                  )}
                </div>
              </div>
            </div>
            <div className="widget-content widget-content-area">
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
                    valueCallback={updateForm}
                    requiredMassage={t(
                      "Account.FormElement.TitleRequiredMessage"
                    )}
                  />
                </div>

                <div className="form-row mb-4">
                  <div className="form-group col-md-6">
                    <InputText
                      innerTextAlign="left"
                      textAlign={styles.textAlign}
                      title={t("Account.FormElement.EmailAddress")}
                      type="text"
                      dir="ltr"
                      id="EmailAddress"
                      IsRequired={true}
                      MinLength={3}
                      RegexFormat="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
                      formatMassage={t(
                        "Account.FormElement.EmailFormatMessage"
                      )}
                      requiredMassage={t(
                        "Account.FormElement.EmailRequiredMessage"
                      )}
                      valueCallback={updateForm}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("Account.FormElement.Phone")}
                      type="text"
                      id="Phone"
                      dir="ltr"
                      innerTextAlign="left"
                      IsRequired={true}
                      MinLength={3}
                      RegexFormat="^[0-9]{8,13}$"
                      valueCallback={updateForm}
                      requiredMassage={t(
                        "Account.FormElement.PhoneRequiredMessage"
                      )}
                      formatMassage={t(
                        "Account.FormElement.PhoneFormatMessage"
                      )}
                    />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <InputText
                    textAlign={styles.textAlign}
                    title={t("Account.FormElement.PostalAddress")}
                    type="text"
                    id="PostalAddress"
                    IsRequired={false}
                    MinLength={3}
                    valueCallback={updateForm}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formIsValid}
                  className="btn btn-primary mt-3"
                >
                  {t("Account.FormElement.SaveAccount")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountNewForm;
