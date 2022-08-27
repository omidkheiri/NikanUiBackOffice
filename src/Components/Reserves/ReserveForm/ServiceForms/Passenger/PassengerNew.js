import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "../../../../UI/FormElement/DatePicker";
import DropDown from "../../../../UI/FormElement/DropDown";
import InputText from "../../../../UI/FormElement/InputText";

const PassengerNew = () => {
  const [t] = useTranslation("common");
  const [nationality, setnationality] = useState("");
  const Name = useRef();
  const LastName = useRef();
  const NationalCode = useRef();
  const PassportNumber = useRef();
  const MobileNumber = useRef();
  const EmailAddress = useRef();
  const BirthDate = useRef();

  const [formData, updateFormData] = useState({
    name: "",
    lastName: "",
    gender: {},
    nationalCode: "",
    passportNumber: "",
    passportExpireDate: "",
    mobileNumber: "",
    emailAddress: "",
    birthDate: "",
    age: "",
    nationality: "",
  });
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
  const [genderTypes] = useState([
    { value: "0", label: t("ReservePage.Passenger.Genders.Female") },
    { value: "1", label: t("ReservePage.Passenger.Genders.Male") },
  ]);
  const [nationalityTypes] = useState([
    { value: "0", label: t("ReservePage.Passenger.Nationality.Iranian") },
    { value: "1", label: t("ReservePage.Passenger.Nationality.Foreigner") },
  ]);
  const updateForm = (data) => {};
  const nationalityUpdate = (data) => {
    console.log(data);
    setnationality(data.value);
  };
  const handleInputChange = (data) => {};
  const submitForm = (event) => {
    event.preventDefault();

    return;
  };

  return (
    <div className="row">
      <div id="flFormsGrid" className="col-lg-12 layout-spacing">
        <form id="passengerForm" onSubmit={submitForm}>
          <div className="form-row">
            <div className="form-group col-md-2">
              <DropDown
                textAlign={styles.textAlign}
                title={t("ReservePage.Passenger.FormElement.Gender")}
                type="text"
                id="gender"
                IsRequired={true}
                MinLength={0}
                value={formData.gender}
                RegexFormat=""
                options={genderTypes}
                valueCallback={updateForm}
                handleInputChange={handleInputChange}
                requiredMassage={t(
                  "ReservePage.Passenger.FormElement.GenderRequired"
                )}
              />
            </div>

            <div className="form-group col">
              <InputText
                ref={Name}
                textAlign={styles.textAlign}
                title={t("ReservePage.Passenger.FormElement.Name")}
                type="text"
                id="name"
                IsRequired={true}
                MinLength={3}
                value={formData.name}
                RegexFormat=""
                valueCallback={updateForm}
                requiredMassage={t(
                  "ReservePage.Passenger.FormElement.NameRequired"
                )}
              />
            </div>
            <div className="form-group col">
              <InputText
                ref={LastName}
                textAlign={styles.textAlign}
                title={t("ReservePage.Passenger.FormElement.LastName")}
                type="text"
                id="lastName"
                IsRequired={true}
                MinLength={3}
                value={formData.lastName}
                RegexFormat=""
                valueCallback={updateForm}
                requiredMassage={t(
                  "ReservePage.Passenger.FormElement.LastNameRequired"
                )}
              />
            </div>

            <div className="form-group col">
              <InputText
                ref={MobileNumber}
                textAlign={styles.textAlign}
                title={t("ReservePage.Passenger.FormElement.MobileNumber")}
                type="text"
                id="mobileNumber"
                IsRequired={true}
                MinLength={3}
                value={formData.mobileNumber}
                RegexFormat=""
                valueCallback={updateForm}
                requiredMassage={t(
                  "ReservePage.Passenger.FormElement.MobileNumberRequired"
                )}
              />
            </div>
            <div className="form-group col">
              <InputText
                ref={EmailAddress}
                textAlign={styles.textAlign}
                title={t("ReservePage.Passenger.FormElement.EmailAddress")}
                type="text"
                id="emailAddress"
                IsRequired={true}
                MinLength={3}
                value={formData.emailAddress}
                RegexFormat=""
                valueCallback={updateForm}
                requiredMassage={t(
                  "ReservePage.Passenger.FormElement.EmailAddressRequired"
                )}
              />
            </div>
            <hr className="col-md-12" />

            <div className="form-group col">
              <DropDown
                textAlign={styles.textAlign}
                title={t("ReservePage.Passenger.FormElement.Nationality")}
                type="text"
                id="nationality"
                IsRequired={true}
                MinLength={0}
                RegexFormat=""
                value={formData.nationality}
                options={nationalityTypes}
                valueCallback={nationalityUpdate}
                handleInputChange={handleInputChange}
                requiredMassage={t(
                  "ReservePage.Passenger.FormElement.NationalityRequired"
                )}
              />
            </div>

            {nationality === "0" && (
              <div className="form-group col">
                <InputText
                  textAlign={styles.textAlign}
                  title={t("ReservePage.Passenger.FormElement.NationalCode")}
                  type="text"
                  id="nationalCode"
                  ref={NationalCode}
                  value={formData.nationalCode}
                  IsRequired={true}
                  MinLength={3}
                  RegexFormat=""
                  valueCallback={updateForm}
                  requiredMassage={t(
                    "ReservePage.Passenger.FormElement.NationalCodeRequired"
                  )}
                />
              </div>
            )}
            <div className="form-group col">
              <InputText
                textAlign={styles.textAlign}
                title={t("ReservePage.Passenger.FormElement.PassportNumber")}
                type="text"
                id="passportNumber"
                ref={PassportNumber}
                IsRequired={true}
                MinLength={3}
                value={formData.passportNumber}
                RegexFormat=""
                valueCallback={updateForm}
                requiredMassage={t(
                  "ReservePage.Passenger.FormElement.PassportNumberRequired"
                )}
              />
            </div>

            <div className="form-group col">
              <label htmlFor="from">
                {t("ReservePage.Passenger.FormElement.PassportExpireDate")}
              </label>
              <DatePicker
                textAlign={styles.textAlign}
                title={t(
                  "ReservePage.Passenger.FormElement.PassportExpireDate"
                )}
                type="text"
                id="passportExpireDate"
                minDate={Date.now()}
                IsRequired={true}
                MinLength={3}
                RegexFormat=""
                valueCallback={updateForm}
                value={formData.passportExpireDate}
                requiredMassage={t(
                  "FlightNumber.FormElement.PassportExpireDate"
                )}
              />
            </div>

            <div className="form-group col">
              <label>&nbsp;</label>
              <div className="">
                <input
                  style={{ height: "35px", width: "35px" }}
                  type="checkbox"
                  className=""
                  id="Age"
                />
                <label
                  style={{ textAlign: t("textAlign"), float: "left" }}
                  className=""
                  htmlFor="Age"
                >
                  {t("ReservePage.Passenger.FormElement.Age")}
                </label>
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="from">
                {t("ReservePage.Passenger.FormElement.BirthDate")}
              </label>
              <DatePicker
                textAlign={styles.textAlign}
                title={t("ReservePage.Passenger.FormElement.BirthDate")}
                type="text"
                id="birthDate"
                IsRequired={true}
                MinLength={3}
                minDate={Date.now()}
                RegexFormat=""
                valueCallback={updateForm}
                value={formData.birthDate}
                requiredMassage={t("FlightNumber.FormElement.birthDate")}
              />
            </div>
            <hr className="col-md-12" />
            <div className="form-group col-md-4">
              <label>&nbsp;</label>
              <div className="">
                <input
                  style={{ height: "35px", width: "35px" }}
                  type="checkbox"
                  className=""
                  id="Wheelchair"
                />
                <label
                  style={{ textAlign: t("textAlign"), float: "left" }}
                  className=""
                  htmlFor="Wheelchair"
                >
                  {t("ReservePage.Passenger.FormElement.Wheelchair")}
                </label>
              </div>
            </div>

            {nationality !== "0" && (
              <div className="form-group col-md-4">
                <label>&nbsp;</label>
                <div className="">
                  <input
                    style={{ height: "35px", width: "35px" }}
                    type="checkbox"
                    className=""
                    id="Visa"
                  />
                  <label
                    style={{ textAlign: t("textAlign"), float: "left" }}
                    className=""
                    htmlFor="Visa"
                  >
                    {t("ReservePage.Passenger.FormElement.Visa")}
                  </label>
                </div>
              </div>
            )}

            <div className="form-group col-md-4">
              <label>&nbsp;</label>
              <div className="">
                <input
                  style={{ height: "35px", width: "35px" }}
                  type="checkbox"
                  className=""
                  id="Visa"
                />
                <label
                  style={{ textAlign: t("textAlign"), float: "left" }}
                  className=""
                  htmlFor="Visa"
                >
                  {t("ReservePage.Passenger.FormElement.SaveThis")}
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {t("FlightNumber.FormElement.SaveFlightNumber")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PassengerNew;
