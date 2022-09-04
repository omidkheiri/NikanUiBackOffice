import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import DatePicker from "../../../../UI/FormElement/DatePicker";
import DropDown from "../../../../UI/FormElement/DropDown";
import InputText from "../../../../UI/FormElement/InputText";

import Moment from "moment";
import ReserveContext from "../../../../../Store/ReserveContext";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
const PassengerUpdate = (props) => {
  const [t] = useTranslation("common");
  const [genderTypes] = useState([
    { value: "0", label: t("ReservePage.Passenger.Genders.Female") },
    { value: "1", label: t("ReservePage.Passenger.Genders.Male") },
  ]);
  const [nationalityTypes] = useState([
    { value: "0", label: t("ReservePage.Passenger.Nationality.Iranian") },
    { value: "1", label: t("ReservePage.Passenger.Nationality.Foreigner") },
  ]);
  const ageElement = useRef();
  const params = useParams();

  const [Gender, setGender] = useState(
    genderTypes
      ? genderTypes.find((data) => {
          return data.value === props.passenger.gender;
        })
      : {}
  );

  const [PassengerType, setPassengerType] = useState(props.passenger.typeId);
  const pricesServiceRef = useRef();
  const [Age, setAge] = useState("");
  const [Visa, setVisa] = useState("");
  const [Wheelchair, setWheelchair] = useState("");
  const [SaveThis, setSaveThis] = useState("");
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [passengerTypes, setpassengerTypes] = useState();
  const [Nationality, setNationality] = useState(
    nationalityTypes
      ? nationalityTypes.find((data) => {
          return data.label === props.passenger.nationality.label;
        })
      : {}
  );
  const [NationalCode, setNationalCode] = useState("");
  const [PassportNumber, setPassportNumber] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [PassportExpireDate, setPassportExpireDate] = useState("");
  const [ValidationMessage, setValidationMessage] = useState([]);
  const [formSchema] = useState(props.passenger.scheme);
  const reserveServiceRef = useRef(null);
  const [reserveContext, setReserveContext] = useContext(ReserveContext);
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

  useEffect(() => {
    if (props.passenger) {
      let pass = reserveContext.passenger.find((data) => {
        return data.id === props.passenger.id;
      });

      setPassportExpireDate(
        Moment(pass.passportPassportExpireDate).format("YYYY-MM-DD")
      );
      setBirthDate(Moment(pass.birthDate).format("YYYY-MM-DD"));

      setNationality(
        nationalityTypes
          ? nationalityTypes.find((data) => {
              return (data.value = pass.nationality);
            })
          : {}
      );

      setAge(pass.age === "0" ? false : true);
      setVisa(pass.visa === "0" ? false : true);
      setWheelchair(pass.wheelchair === "0" ? false : true);
      setSaveThis(pass.saveThis === "0" ? false : true);
    }
  }, [props.passenger]);

  useEffect(() => {
    if (params.LocationId) {
      let prices = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      var item = prices.filter((data) => {
        return data.serviceTypeId === 1;
      });
      item = item.map((data) => {
        return { value: data.id, label: data.title };
      });

      setpassengerTypes(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateGender = (data) => {
    setGender(data);
    setValidationMessage([]);
  };

  const updateName = (data) => {
    setName(data);
    setValidationMessage([]);
  };
  const updateLastName = (data) => {
    setLastName(data);
    setValidationMessage([]);
  };
  const updateNationalCode = (data) => {
    setNationalCode(data);
    setValidationMessage([]);
  };
  const updatePassportNumber = (data) => {
    setPassportNumber(data);
    setValidationMessage([]);
  };
  const updateEmailAddress = (data) => {
    setEmailAddress(data);
    setValidationMessage([]);
  };
  const updateMobileNumber = (data) => {
    setMobileNumber(data);
    setValidationMessage([]);
  };
  const updateNationality = (data) => {
    setNationality(data);
    setValidationMessage([]);
  };

  const updatePassportExpireDate = (data) => {
    setPassportExpireDate(data);
    setValidationMessage([]);
  };
  const updateBirthDate = (data) => {
    setBirthDate(data);
    setValidationMessage([]);
  };
  const updateAge = (event) => {
    setAge(event.currentTarget.checked);
  };
  const updateWheelchair = (event) => {
    setWheelchair(event.currentTarget.checked);
  };
  const updateVisa = (event) => {
    setVisa(event.currentTarget.checked);
  };
  const updateSaveThis = (event) => {
    setSaveThis(event.currentTarget.checked);
  };
  const updatePassengerType = (data) => {
    setPassengerType(data);
  };
  const handleInputChange = (data) => {};
  const checkForm = () => {
    let isvalid = true;
    let validationMessage = [];

    if (formSchema.gender && JSON.stringify(Gender) === "{}") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Passenger.FormElement.GenderRequired")
      );
    }
    if (formSchema.name && Name === "") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Passenger.FormElement.NameRequired")
      );
    }
    if (formSchema.lastName && LastName === "") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Passenger.FormElement.LastNameRequired")
      );
    }
    if (formSchema.nationalCode && NationalCode === "") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Passenger.FormElement.NationalCode")
      );
    }
    if (formSchema.passportNumber && PassportNumber === "") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Passenger.FormElement.PassportNumber")
      );
    }
    if (formSchema.emailAddress && EmailAddress === "") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Passenger.FormElement.EmailAddress")
      );
    }
    if (formSchema.mobileNumber && MobileNumber === "") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Passenger.FormElement.MobileNumber")
      );
    }
    if (formSchema.birthDate && BirthDate === "") {
      isvalid = false;
      validationMessage.push(t("ReservePage.Passenger.FormElement.BirthDate"));
    }
    if (formSchema.passportExpireDate && PassportExpireDate === "") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Passenger.FormElement.PassportExpireDate")
      );
    }

    setValidationMessage(validationMessage);
    return isvalid;
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (checkForm()) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );

      if (reserveStorage.passenger.length > 0 && reserveStorage.passenger[0]) {
        var item = reserveStorage.passenger.find((data) => {
          return data.id === props.passenger.id;
        });
        if (item) {
          reserveStorage.passenger.forEach((element) => {
            if (element.id === props.passenger.id) {
              element.typeId = PassengerType;
              element.gender = Gender.value;
              element.name = Name;
              element.lastName = LastName;
              element.nationality = Nationality;
              element.nationalCode = NationalCode;
              element.passportNumber = PassportNumber;
              element.emailAddress = EmailAddress;
              element.mobileNumber = MobileNumber;
              element.birthDate = BirthDate;
              element.passportExpireDate = PassportExpireDate;
              element.age = Age ? "1" : "0";
              element.visa = Visa ? "1" : "0";
              element.wheelchair = Wheelchair ? "1" : "0";
              element.saveThis = SaveThis ? "1" : "0";
            }
          });
        }
      }

      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );

      setReserveContext(reserveStorage);
      props.UpdateReserve();
    }
  };
  const reserveUpdated = () => {};
  const getReserve = () => {};
  return (
    <Fragment>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />

      {formSchema && (
        <div className="row">
          <div id="flFormsGrid" className="col-lg-12 layout-spacing">
            <div className="row">
              <div className="col">
                {ValidationMessage && (
                  <ul className="list-icon">
                    {ValidationMessage.map((data) => {
                      return (
                        <li
                          key={data}
                          style={{ textAlign: t("textAlign") }}
                          className="   text-danger"
                        >
                          {data}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
            <form id="passengerForm" onSubmit={submitForm}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <DropDown
                    textAlign={styles.textAlign}
                    title={t("ReservePage.Passenger.FormElement.PassengerType")}
                    type="text"
                    id="passengerType"
                    IsRequired={true}
                    options={passengerTypes}
                    valueCallback={updatePassengerType}
                    handleInputChange={handleInputChange}
                    value={PassengerType}
                    requiredMassage={t(
                      "ReservePage.Passenger.FormElement.PassengerType"
                    )}
                  />
                </div>
                {formSchema.gender && (
                  <div className="form-group col-md-2">
                    <DropDown
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Passenger.FormElement.Gender")}
                      type="text"
                      id="gender"
                      IsRequired={true}
                      options={genderTypes}
                      valueCallback={updateGender}
                      handleInputChange={handleInputChange}
                      value={Gender}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.GenderRequired"
                      )}
                    />
                  </div>
                )}

                {formSchema.name.required && (
                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Passenger.FormElement.Name")}
                      type="text"
                      id="name"
                      IsRequired={true}
                      MinLength={3}
                      value={props.passenger.name}
                      RegexFormat=""
                      valueCallback={updateName}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.NameRequired"
                      )}
                    />
                  </div>
                )}
                {formSchema.lastName.required && (
                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Passenger.FormElement.LastName")}
                      type="text"
                      id="lastName"
                      IsRequired={true}
                      MinLength={3}
                      value={props.passenger.lastName}
                      RegexFormat=""
                      valueCallback={updateLastName}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.LastNameRequired"
                      )}
                    />
                  </div>
                )}

                {formSchema.mobileNumber && (
                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t(
                        "ReservePage.Passenger.FormElement.MobileNumber"
                      )}
                      type="text"
                      id="mobileNumber"
                      IsRequired={true}
                      MinLength={3}
                      value={props.passenger.mobileNumber}
                      RegexFormat=""
                      valueCallback={updateMobileNumber}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.MobileNumberRequired"
                      )}
                    />
                  </div>
                )}
                {formSchema.emailAddress && (
                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t(
                        "ReservePage.Passenger.FormElement.EmailAddress"
                      )}
                      type="text"
                      id="emailAddress"
                      IsRequired={true}
                      MinLength={3}
                      value={props.passenger.emailAddress}
                      RegexFormat=""
                      valueCallback={updateEmailAddress}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.EmailAddressRequired"
                      )}
                    />
                  </div>
                )}
                <hr className="col-md-12" />

                {formSchema.nationality && (
                  <div className="form-group col">
                    <DropDown
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Passenger.FormElement.Nationality")}
                      type="text"
                      id="nationality"
                      IsRequired={true}
                      RegexFormat=""
                      value={props.passenger.nationality}
                      options={nationalityTypes}
                      valueCallback={updateNationality}
                      handleInputChange={handleInputChange}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.NationalityRequired"
                      )}
                    />
                  </div>
                )}

                {formSchema.nationalCode && (
                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t(
                        "ReservePage.Passenger.FormElement.NationalCode"
                      )}
                      type="text"
                      id="nationalCode"
                      value={props.passenger.nationalCode}
                      IsRequired={true}
                      MinLength={3}
                      RegexFormat=""
                      valueCallback={updateNationalCode}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.NationalCodeRequired"
                      )}
                    />
                  </div>
                )}
                {formSchema.passportNumber && (
                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t(
                        "ReservePage.Passenger.FormElement.PassportNumber"
                      )}
                      type="text"
                      id="passportNumber"
                      IsRequired={true}
                      MinLength={3}
                      value={props.passenger.passportNumber}
                      RegexFormat=""
                      valueCallback={updatePassportNumber}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.PassportNumberRequired"
                      )}
                    />
                  </div>
                )}

                {formSchema.passportExpireDate && (
                  <div className="form-group col">
                    <label htmlFor="from">
                      {t(
                        "ReservePage.Passenger.FormElement.PassportExpireDate"
                      )}
                    </label>
                    <DatePicker
                      textAlign={styles.textAlign}
                      title={t(
                        "ReservePage.Passenger.FormElement.PassportExpireDate"
                      )}
                      type="text"
                      id="passportExpireDate"
                      IsRequired={true}
                      MinLength={3}
                      RegexFormat=""
                      valueCallback={updatePassportExpireDate}
                      value={Moment(
                        props.passenger.passportPassportExpireDate
                      ).format("YYYY-MM-DD")}
                      requiredMassage={t(
                        "FlightNumber.FormElement.PassportExpireDate"
                      )}
                    />
                  </div>
                )}

                {formSchema.age && Age !== null && (
                  <div className="form-group col">
                    <label>&nbsp;</label>
                    <div className="">
                      <input
                        style={{ height: "25px", width: "25px" }}
                        type="checkbox"
                        className=""
                        id="age"
                        onChange={updateAge}
                        checked={Age}
                        ref={ageElement}
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
                )}
                {formSchema.birthDate && (
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
                      RegexFormat=""
                      valueCallback={updateBirthDate}
                      value={Moment(props.passenger.birthDate).format(
                        "YYYY-MM-DD"
                      )}
                      requiredMassage={t("FlightNumber.FormElement.birthDate")}
                    />
                  </div>
                )}
                <hr className="col-md-12" />
                {formSchema.wheelchair && (
                  <div className="form-group col-md-4">
                    <label>&nbsp;</label>
                    <div className="">
                      <input
                        style={{ height: "25px", width: "25px" }}
                        type="checkbox"
                        className=""
                        id="wheelchair"
                        onChange={updateWheelchair}
                        checked={Wheelchair}
                      />
                      <label
                        style={{ textAlign: t("textAlign"), float: "left" }}
                        className=""
                        htmlFor="wheelchair"
                      >
                        {t("ReservePage.Passenger.FormElement.Wheelchair")}
                      </label>
                    </div>
                  </div>
                )}

                {formSchema.visa && Nationality !== "0" && (
                  <div className="form-group col-md-4">
                    <label>&nbsp;</label>
                    <div className="">
                      <input
                        style={{ height: "25px", width: "25px" }}
                        type="checkbox"
                        className=""
                        id="visa"
                        onChange={updateVisa}
                        checked={Visa}
                      />
                      <label
                        style={{ textAlign: t("textAlign"), float: "left" }}
                        className=""
                        htmlFor="visa"
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
                      style={{ height: "25px", width: "25px" }}
                      type="checkbox"
                      className=""
                      id="saveThis"
                      onChange={updateSaveThis}
                      checked={SaveThis}
                    />
                    <label
                      style={{ textAlign: t("textAlign"), float: "left" }}
                      className=""
                      htmlFor="saveThis"
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
      )}
    </Fragment>
  );
};

export default PassengerUpdate;
