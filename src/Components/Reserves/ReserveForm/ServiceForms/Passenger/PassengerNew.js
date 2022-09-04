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
import { v4 as uuid } from "uuid";
import ReserveContext from "../../../../../Store/ReserveContext";
import Moment from "moment";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
const PassengerNew = (props) => {
  const [, setReserve] = useState({});
  const getReserve = (reserve) => {
    setReserve(reserve);
  };
  const params = useParams();
  const [t] = useTranslation("common");
  const [Gender, setGender] = useState({});
  const [Age, setAge] = useState({});
  const [Visa, setVisa] = useState({});
  const [Wheelchair, setWheelchair] = useState({});
  const [SaveThis, setSaveThis] = useState({});
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Nationality, setNationality] = useState({});
  const [NationalCode, setNationalCode] = useState("");
  const [PassportNumber, setPassportNumber] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [PassportExpireDate, setPassportExpireDate] = useState("");
  const [unique_id] = useState(uuid());
  const [ValidationMessage, setValidationMessage] = useState([]);
  const [passengerTypes, setpassengerTypes] = useState();
  const [PassengerType, setPassengerType] = useState();
  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const [formSchema] = useState(
    props.scheme ? JSON.parse(props.scheme.serviceLineScheme) : {}
  );
  const reserveUpdated = () => {};
  const reserveServiceRef = useRef(null);
  const [formData] = useState({
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
  const [genderTypes] = useState([
    { value: "0", label: t("ReservePage.Passenger.Genders.Female") },
    { value: "1", label: t("ReservePage.Passenger.Genders.Male") },
  ]);
  const [nationalityTypes] = useState([
    { value: "0", label: t("ReservePage.Passenger.Nationality.Iranian") },
    { value: "1", label: t("ReservePage.Passenger.Nationality.Foreigner") },
  ]);

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

  const updatePassengerType = (data) => {
    setPassengerType(data);
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
          return data.id === unique_id;
        });
        if (item) {
          reserveStorage.passenger.forEach((element) => {
            if (element.id === unique_id) {
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
              element.scheme = formSchema;
              element.age = Age;
              element.visa = Visa;
              element.wheelchair = Wheelchair;
              element.saveThis = SaveThis;
            }
          });
        } else {
          var record = {
            typeId: PassengerType,
            id: unique_id,
            gender: Gender.value,
            name: Name,
            lastName: LastName,
            nationality: Nationality,
            nationalCode: NationalCode,
            passportNumber: PassportNumber,
            emailAddress: EmailAddress,
            mobileNumber: MobileNumber,
            birthDate: BirthDate,
            passportExpireDate: PassportExpireDate,
            scheme: formSchema,
            age: Age,
            visa: Visa,
            wheelchair: Wheelchair,
            saveThis: SaveThis,
          };

          reserveStorage.passenger.push(record);
        }
      } else {
        reserveStorage.passenger = [];
        record = {
          id: unique_id,
          typeId: PassengerType,
          gender: Gender.value,
          name: Name,
          lastName: LastName,
          nationality: Nationality,
          nationalCode: NationalCode,
          passportNumber: PassportNumber,
          emailAddress: EmailAddress,
          mobileNumber: MobileNumber,
          birthDate: BirthDate,
          passportExpireDate: PassportExpireDate,
          scheme: formSchema,
          age: Age,
          visa: Visa,
          wheelchair: Wheelchair,
          saveThis: SaveThis,
        };

        reserveStorage.passenger.push(record);
      }

      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );
      setReserveContext(reserveStorage);
      props.UpdateReserve();
    }
  };
  const pricesServiceRef = useRef();

  return (
    <Fragment>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
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
                  requiredMassage={t(
                    "ReservePage.Passenger.FormElement.PassengerType"
                  )}
                />
              </div>

              {PassengerType && formSchema.gender && (
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
                    valueCallback={updateGender}
                    handleInputChange={handleInputChange}
                    requiredMassage={t(
                      "ReservePage.Passenger.FormElement.GenderRequired"
                    )}
                  />
                </div>
              )}

              {PassengerType && formSchema.name.required && (
                <div className="form-group col">
                  <InputText
                    textAlign={styles.textAlign}
                    title={t("ReservePage.Passenger.FormElement.Name")}
                    type="text"
                    id="name"
                    IsRequired={true}
                    MinLength={3}
                    value={formData.name}
                    RegexFormat=""
                    valueCallback={updateName}
                    requiredMassage={t(
                      "ReservePage.Passenger.FormElement.NameRequired"
                    )}
                  />
                </div>
              )}
              {PassengerType && formSchema.lastName.required && (
                <div className="form-group col">
                  <InputText
                    textAlign={styles.textAlign}
                    title={t("ReservePage.Passenger.FormElement.LastName")}
                    type="text"
                    id="lastName"
                    IsRequired={true}
                    MinLength={3}
                    value={formData.lastName}
                    RegexFormat=""
                    valueCallback={updateLastName}
                    requiredMassage={t(
                      "ReservePage.Passenger.FormElement.LastNameRequired"
                    )}
                  />
                </div>
              )}

              {PassengerType && formSchema.mobileNumber && (
                <div className="form-group col">
                  <InputText
                    textAlign={styles.textAlign}
                    title={t("ReservePage.Passenger.FormElement.MobileNumber")}
                    type="text"
                    id="mobileNumber"
                    IsRequired={true}
                    MinLength={3}
                    value={formData.mobileNumber}
                    RegexFormat=""
                    valueCallback={updateMobileNumber}
                    requiredMassage={t(
                      "ReservePage.Passenger.FormElement.MobileNumberRequired"
                    )}
                  />
                </div>
              )}
              {PassengerType && formSchema.emailAddress && (
                <div className="form-group col">
                  <InputText
                    textAlign={styles.textAlign}
                    title={t("ReservePage.Passenger.FormElement.EmailAddress")}
                    type="text"
                    id="emailAddress"
                    IsRequired={true}
                    MinLength={3}
                    value={formData.emailAddress}
                    RegexFormat=""
                    valueCallback={updateEmailAddress}
                    requiredMassage={t(
                      "ReservePage.Passenger.FormElement.EmailAddressRequired"
                    )}
                  />
                </div>
              )}
              <hr className="col-md-12" />

              {PassengerType && formSchema.nationality && (
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
                    valueCallback={updateNationality}
                    handleInputChange={handleInputChange}
                    requiredMassage={t(
                      "ReservePage.Passenger.FormElement.NationalityRequired"
                    )}
                  />
                </div>
              )}

              {PassengerType &&
                formSchema.nationalCode &&
                Nationality.value === "0" && (
                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t(
                        "ReservePage.Passenger.FormElement.NationalCode"
                      )}
                      type="text"
                      id="nationalCode"
                      value={formData.nationalCode}
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
              {PassengerType && formSchema.passportNumber && (
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
                    value={formData.passportNumber}
                    RegexFormat=""
                    valueCallback={updatePassportNumber}
                    requiredMassage={t(
                      "ReservePage.Passenger.FormElement.PassportNumberRequired"
                    )}
                  />
                </div>
              )}

              {PassengerType && formSchema.passportExpireDate && (
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
                    valueCallback={updatePassportExpireDate}
                    requiredMassage={t(
                      "FlightNumber.FormElement.PassportExpireDate"
                    )}
                  />
                </div>
              )}

              {PassengerType && formSchema.age && (
                <div className="form-group col">
                  <label>&nbsp;</label>
                  <div className="">
                    <input
                      style={{ height: "25px", width: "25px" }}
                      type="checkbox"
                      className=""
                      id="age"
                      onChange={updateAge}
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
              {PassengerType && formSchema.birthDate && (
                <div className="form-group col">
                  <label htmlFor="from">
                    {t("ReservePage.Passenger.FormElement.BirthDate")}
                  </label>
                  <DatePicker
                    textAlign={styles.textAlign}
                    title={t("ReservePage.Passenger.FormElement.BirthDate")}
                    type="text"
                    id="birthDate"
                    valueCallback={updateBirthDate}
                    requiredMassage={t("FlightNumber.FormElement.birthDate")}
                  />
                </div>
              )}
              <hr className="col-md-12" />
              {PassengerType && formSchema.wheelchair && (
                <div className="form-group col-md-4">
                  <label>&nbsp;</label>
                  <div className="">
                    <input
                      style={{ height: "25px", width: "25px" }}
                      type="checkbox"
                      className=""
                      id="wheelchair"
                      onChange={updateWheelchair}
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

              {PassengerType && formSchema.visa && Nationality !== "0" && (
                <div className="form-group col-md-4">
                  <label>&nbsp;</label>
                  <div className="">
                    <input
                      style={{ height: "25px", width: "25px" }}
                      type="checkbox"
                      className=""
                      id="visa"
                      onChange={updateVisa}
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

              {PassengerType && (
                <div className="form-group col-md-4">
                  <label>&nbsp;</label>
                  <div className="">
                    <input
                      style={{ height: "25px", width: "25px" }}
                      type="checkbox"
                      className=""
                      id="saveThis"
                      onChange={updateSaveThis}
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
              )}
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              {t("FlightNumber.FormElement.SaveFlightNumber")}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default PassengerNew;
