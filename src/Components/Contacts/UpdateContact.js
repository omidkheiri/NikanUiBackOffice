import Moment from "moment";
import React, { useState, useContext, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import useHttp from "../../Hooks/use-http";
import BasicContext from "../../Store/enviroment-context";
import DatePicker from "../UI/FormElement/DatePicker";
import DropDown from "../UI/FormElement/DropDown";
import InputText from "../UI/FormElement/InputText";
import classes from "./UpdateContact.module.css";

const UpdateContact = (props) => {
  const basicContext = useContext(BasicContext);
  const [requestData, setRequestData] = useState({
    Name: { data: "" },
    LastName: { data: "" },
    BirthDate: { data: {} },
    Phone: { data: "" },
    EmailAddress: { data: "" },
  });
  const [selectedAccountOption, setselectedAccountOption] = useState({});
  const FillForm = (data) => {
    setRequestData({
      Phone: { data: data.phone },
      EmailAddress: { data: data.emailAddress },
      Name: { data: data.name },
      LastName: { data: data.lastName },
      BirthDate: { data: data.birthDate },
    });
    formData["Name"] = { data: data.title, isValid: true };
    formData["LastName"] = { data: data.title, isValid: true };
    formData["EmailAddress"] = { data: data.emailAddress, isValid: true };
    formData["Phone"] = { data: data.phone, isValid: true };
    formData["BirthDate"] = { data: data.birthDate, isValid: true };
    formData["accountId"] = { data: data.accountId, isValid: true };
    setselectedAccountOption({
      value: data.accountId,
      label: data.accountTitle,
    });
    setFormData(formData);
    checkForm();
    props.FillForm(data);
  };

  const [accountOption, setAccountOption] = useState([]);

  const GoToContactPanel = (data) => {
    history.push("/Contacts/" + data.id);
  };
  const [t] = useTranslation("common");
  const [formData, setFormData] = useState({});
  const [formIsValid, setformIsValid] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [birthDate] = useState(Date.now);
  const [identity] = useState(props);

  useEffect(() => {
    fetchContactGet();
  }, [identity]);
  const {
    isLoading: isLoadingContact,
    errorGettingdata,
    sendRequest: fetchContactGet,
  } = useHttp(
    {
      url:
        basicContext.baseAddress +
        "/account/" +
        identity.accountId +
        "/Contact/" +
        identity.contactId,
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    FillForm
  );
  useEffect(() => {
    if (searchTerm && searchTerm.length > 2) {
      fetchAccount();
    }
  }, [searchTerm]);

  const history = useHistory();
  const [accountId, setAccountIdValue] = useState("");

  const {
    isLoading,
    error,
    sendRequest: fetchContact,
  } = useHttp(
    {
      url: `${basicContext.baseAddress}/account/${identity.accountId}/contact/${identity.contactId}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    GoToContactPanel
  );
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
      accountId != ""
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
  };
  useEffect(() => {
    fetchContact();
  }, [requestData]);
  const fillAccountOption = (data) => {
    let items = data.map((data) => {
      return { value: data.id, label: data.title };
    });
    setAccountOption(items);
  };

  const {
    isLoadingData,
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
  const setAccoutnId = (data) => {
    if (data) {
      setAccountIdValue(data.value);
      formData["accountId"] = data.value;
      setFormData(formData);
    }
  };
  return (
    <div className={(classes.container, classes.singlFormContent)}>
      <div className="row">
        <div id="flFormsGrid" className="col-lg-12 layout-spacing">
          {isLoadingData && <h1>Is Loading</h1>}
          <form onSubmit={submitForm}>
            <div className="form-row mb-4">
              <div className="form-group col-md-12">
                <DropDown
                  textAlign={styles.textAlign}
                  title={t("Contact.FormElement.AccountId")}
                  type="text"
                  value={selectedAccountOption}
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
                  value={requestData.Name.data}
                  IsRequired={true}
                  MinLength={3}
                  requiredMassage={t("Contact.FormElement.NameRequiredMessage")}
                  valueCallback={updateForm}
                />
              </div>
              <div className="form-group col-md-6">
                <InputText
                  textAlign={styles.textAlign}
                  title={t("Contact.FormElement.LastName")}
                  type="text"
                  value={requestData.LastName.data}
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
                  value={requestData.BirthDate.data}
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
                  value={requestData.EmailAddress.data}
                  IsRequired={false}
                  MinLength={3}
                  RegexFormat="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
                  formatMassage={t("Contact.FormElement.EmailFormatMessage")}
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
                  value={requestData.Phone.data}
                  innerTextAlign="left"
                  IsRequired={true}
                  MinLength={3}
                  RegexFormat="^[0-9]{8,13}$"
                  valueCallback={updateForm}
                  requiredMassage={t(
                    "Contact.FormElement.PhoneRequiredMessage"
                  )}
                  formatMassage={t("Contact.FormElement.PhoneFormatMessage")}
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
  );
};

export default UpdateContact;
