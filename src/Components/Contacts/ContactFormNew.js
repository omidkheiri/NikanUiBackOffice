import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useHttp from "../../Hooks/use-http";
import BasicContext from "../../Store/enviroment-context";
import InputText from "../UI/FormElement/InputText";
import classes from "./ContactFormNew.module.css";
import DatePicker from "../UI/FormElement/DatePicker";
import Moment from "moment";
import DropDown from "../UI/FormElement/DropDown";
import { formatDate } from "devextreme/localization";

const ContactFormNew = () => {
  const [accountOption, setAccountOption] = useState([]);
  const [formISSubmitted, setformISSubmitted] = useState(false);
  const GoToContactPanel = (data) => {
    history.push("/Contacts/" + data.id);
  };
  const [t] = useTranslation("common");
  const [formData, setFormData] = useState({});
  const [formIsValid, setformIsValid] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const history = useHistory();
  const [accountId, setAccountIdValue] = useState("");

  const basicContext = useContext(BasicContext);
  const [requestData, setRequestData] = useState({
    Name: { data: "" },
    LastName: { data: "" },
    BirthDate: { data: {} },
    Phone: { data: "" },
    EmailAddress: { data: "" },
  });

  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
  };
  const updateForm = (data, Id, valid) => {
    if (Id === "birthDate") {
      formData["BirthDate"] = {
        data: Moment(new Date(data)).format("YYYY-MM-DD"),
        isValid: true,
      };
    } else {
      formData[Id] = { data: data, isValid: valid };
    }
    setFormData(formData);
    checkForm();
  };

  const checkForm = () => {
    if (
      formData.Name &&
      formData.LastName &&
      formData.Phone &&
      accountId &&
      formData.Name.isValid &&
      formData.LastName.isValid &&
      formData.Phone.isValid &&
      accountId !== ""
    ) {
      setformIsValid(true);
    } else {
      setformIsValid(false);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();

    setRequestData({
      Name: formData["Name"].data,
      LastName: formData["LastName"].data,
      BirthDate: formData["BirthDate"].data,
      Phone: formData["Phone"].data,
      EmailAddress: formData["EmailAddress"].data,
    });
    setformISSubmitted(true);
  };
  useEffect(() => {
    if (formISSubmitted) {
      fetchContact();
      setformISSubmitted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatDate, formISSubmitted]);
  const fillAccountOption = (data) => {
    let items = data.map((data) => {
      return { value: data.id, label: data.title };
    });
    setAccountOption(items);
  };

  const {
    isLocationLoading,
    errorLocation,
    sendRequest: fetchAccount,
  } = useHttp(
    {
      url: `${basicContext.baseAddress}/Account?SearchTerm=${searchTerm}&PageNumber=1&PageSize=500&OrderBy=title`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillAccountOption
  );

  const handleInputChange = (data) => {
    if (data.length < 3) {
    } else {
      setSearchTerm(data);
    }
  };
  const {
    isLoading,
    error,
    sendRequest: fetchContact,
  } = useHttp(
    {
      url: `${basicContext.baseAddress}/account/${accountId}/contact`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    GoToContactPanel
  );
  const setAccoutnId = (data) => {
    if (data) {
      setAccountIdValue(data.value);
      formData["accountId"] = data.value;
      setFormData(formData);
    }
  };

  useEffect(() => {
    if (searchTerm && searchTerm.length > 2) {
      fetchAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
  useEffect(() => {
    return;
  }, [isLocationLoading, errorLocation]);
  return (
    <div className={(classes.container, classes.singlFormContent)}>
      <div className="row">
        <div id="flFormsGrid" className="col-lg-12 layout-spacing">
          <div className="statbox widget box box-shadow">
            <div className="widget-header">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                  <h4 className="invalid-feedback" style={{ display: "block" }}>
                    {t("Contact.FormElement.FormTitle")}
                  </h4>
                  {isLoading && <h1>Loading ...</h1>}
                  {error && (
                    <h3
                      className="invalid-feedback"
                      style={{ display: "block", textAlign: "center" }}
                    >
                      {t("Contact.FormElement.ErrorResponse_" + error.message)}
                    </h3>
                  )}
                </div>
              </div>
            </div>
            <div className="widget-content widget-content-area">
              <form onSubmit={submitForm}>
                <div className="form-row mb-4">
                  <div className="form-group col-md-12">
                    <DropDown
                      textAlign={styles.textAlign}
                      title={t("Contact.FormElement.AccountId")}
                      type="text"
                      handleInputChange={handleInputChange}
                      id="AccountId"
                      IsRequired={true}
                      MinLength={3}
                      options={accountOption}
                      valueCallback={setAccoutnId}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <InputText
                      innerTextAlign="left"
                      textAlign={styles.textAlign}
                      title={t("Contact.FormElement.Name")}
                      type="text"
                      dir="ltr"
                      id="Name"
                      IsRequired={true}
                      MinLength={3}
                      requiredMassage={t(
                        "Contact.FormElement.NameRequiredMessage"
                      )}
                      valueCallback={updateForm}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("Contact.FormElement.LastName")}
                      type="text"
                      id="LastName"
                      dir="ltr"
                      innerTextAlign="left"
                      IsRequired={true}
                      MinLength={3}
                      valueCallback={updateForm}
                      requiredMassage={t(
                        "Contact.FormElement.LastNameRequiredMessage"
                      )}
                    />
                  </div>
                </div>

                <div className="form-row mb-4">
                  <div className="form-group col-md-12">
                    <label htmlFor="AccountId" style={styles.textAlign}>
                      {t("Contact.FormElement.BirthDate")}
                    </label>
                    <DatePicker
                      innerTextAlign="left"
                      textAlign={styles.textAlign}
                      title={t("Contact.FormElement.BirthDate")}
                      type="text"
                      dir="ltr"
                      id="birthDate"
                      IsRequired={false}
                      MinLength={3}
                      valueCallback={updateForm}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <InputText
                      innerTextAlign="left"
                      textAlign={styles.textAlign}
                      title={t("Contact.FormElement.EmailAddress")}
                      type="text"
                      dir="ltr"
                      id="EmailAddress"
                      IsRequired={false}
                      MinLength={3}
                      RegexFormat="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
                      formatMassage={t(
                        "Contact.FormElement.EmailFormatMessage"
                      )}
                      valueCallback={updateForm}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("Contact.FormElement.Phone")}
                      type="text"
                      id="Phone"
                      dir="ltr"
                      innerTextAlign="left"
                      IsRequired={true}
                      MinLength={3}
                      RegexFormat="^[0-9]{8,13}$"
                      valueCallback={updateForm}
                      requiredMassage={t(
                        "Contact.FormElement.PhoneRequiredMessage"
                      )}
                      formatMassage={t(
                        "Contact.FormElement.PhoneFormatMessage"
                      )}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!formIsValid}
                  className="btn btn-primary mt-3"
                >
                  {t("Contact.FormElement.SaveContact")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormNew;
