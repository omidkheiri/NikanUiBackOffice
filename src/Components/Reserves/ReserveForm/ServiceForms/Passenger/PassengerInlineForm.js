import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { v4 as uuid } from "uuid";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";

import Moment from "moment";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
import DropDown from "../../../../UI/FormElement/DropDown";
import InputText from "../../../../UI/FormElement/InputText";
import DatePicker from "../../../../UI/FormElement/DatePicker";
const PassengerInlineForm = (props) => {
  console.log(props);
  const [, setReserve] = useState({});
  const getReserve = (reserve) => {
    setReserve(reserve);
  };

  useEffect(() => {
    if (props.passengerid) {
      fillForm(props.passengerid);
    }
  }, [props.passengerid]);

  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const params = useParams();
  const [t] = useTranslation("common");
  const [Gender, setGender] = useState({});

  const [Visa, setVisa] = useState(false);
  const [Wheelchair, setWheelchair] = useState(false);

  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Nationality, setNationality] = useState({});
  const [NationalCode, setNationalCode] = useState("");

  const [BirthDate, setBirthDate] = useState("");

  const [unique_id, setunique_id] = useState(uuid());

  const [passengerTypes, setpassengerTypes] = useState();
  const [PassengerType, setPassengerType] = useState();
  const [formSchema, setformSchema] = useState({});

  const reserveServiceRef = useRef(null);

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
    if (params.LocationId && reserveContext) {
      let prices = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      if (prices) {
        var item = prices.filter((data) => {
          return data.serviceTypeId === 1;
        });

        item = item.map((data) => {
          return { value: data.id, label: data.title };
        });

        setpassengerTypes(item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveContext]);
  console.log(reserveContext);
  useEffect(() => {
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFff");
    console.log(PassengerType);
    if (PassengerType) {
      var priceData = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );

      var item = priceData.find((data) => {
        return data.id == PassengerType.value;
      });

      if (item) {
        var scheme = JSON.parse(item.serviceLineScheme);
        console.log(scheme);

        setformSchema(scheme);
        setNationality(scheme.nationality.value);
      }
    }
  }, [PassengerType]);

  const [genderTypes] = useState([
    { value: "0", label: t("ReservePage.Passenger.Genders.Female") },
    { value: "1", label: t("ReservePage.Passenger.Genders.Male") },
  ]);

  const updateGender = (data) => {
    setGender(data);
  };

  const updateName = (data) => {
    setName(data);
  };
  const updateLastName = (data) => {
    setLastName(data);
  };
  const updateNationalCode = (data) => {
    setNationalCode(data);
  };

  const updatePassengerType = (data) => {
    setPassengerType(data);
  };

  const updateBirthDate = (data) => {
    setBirthDate(data);
  };
  const updateWheelchair = (event) => {
    setWheelchair(event.currentTarget.checked);
  };
  const updateVisa = (event) => {
    setVisa(event.currentTarget.checked);
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

    if (formSchema.birthDate && BirthDate === "") {
      isvalid = false;
      validationMessage.push(t("ReservePage.Passenger.FormElement.BirthDate"));
    }

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
              element.nationality = formSchema.nationality.value;

              element.birthDate = BirthDate;

              element.scheme = formSchema;

              element.visa = Visa;
              element.wheelchair = Wheelchair;
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

            birthDate: BirthDate,

            scheme: formSchema,

            visa: Visa,
            wheelchair: Wheelchair,
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

          birthDate: BirthDate,

          scheme: formSchema,

          visa: Visa,
          wheelchair: Wheelchair,
        };

        reserveStorage.passenger.push(record);
      }
      resetForm();
      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );
      setReserveContext(reserveStorage);
      props.UpdateReserve();
    }
  };
  const resetForm = () => {
    setunique_id(uuid());
    setPassengerType({});
    setWheelchair(false);
    setBirthDate(null);
    setNationality(null);
    setNationalCode("");
    setName("");
    setLastName("");
    setVisa(false);
  };
  const fillForm = (passengerid) => {
    var passenger = reserveContext.passenger.find((data) => {
      return data.id === passengerid;
    });
    if (passenger) {
      console.log(passenger);
      setPassengerType(passenger.typeId);
      setName(passenger.name);

      setGender(
        genderTypes.find((d) => {
          return d.value === passenger.gender;
        })
      );
      setLastName(passenger.lastName);
      setVisa(passenger.visa);
      setWheelchair(passenger.wheelchair);
      setBirthDate(Moment(new Date(passenger.birthDate)).format("YYYY-MM-DD"));
    }
  };
  const pricesServiceRef = useRef();
  const reserveUpdated = () => {};
  return (
    <Fragment key={unique_id}>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <div className="row">
        <div id="flFormsGrid" className="col-lg-12 layout-spacing">
          <div className="row">
            <div className="col"></div>
          </div>
          <form id="passenger-form" onSubmit={submitForm}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <DropDown
                  textAlign={styles.textAlign}
                  title={t("ReservePage.Passenger.FormElement.PassengerType")}
                  type="text"
                  id="passengerType"
                  IsRequired={true}
                  options={passengerTypes}
                  value={PassengerType}
                  valueCallback={updatePassengerType}
                  handleInputChange={handleInputChange}
                  requiredMassage={t(
                    "ReservePage.Passenger.FormElement.PassengerType"
                  )}
                />
              </div>

              {PassengerType && PassengerType.value && (
                <Fragment>
                  <div className="form-group col-md-2">
                    <DropDown
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Passenger.FormElement.Gender")}
                      type="text"
                      id="gender"
                      IsRequired={true}
                      MinLength={0}
                      RegexFormat=""
                      value={Gender}
                      options={genderTypes}
                      valueCallback={updateGender}
                      handleInputChange={handleInputChange}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.GenderRequired"
                      )}
                    />
                  </div>

                  <input
                    type="hidden"
                    id="nationality"
                    value={
                      formSchema && formSchema.nationality
                        ? formSchema.nationality.value
                        : ""
                    }
                  />

                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Passenger.FormElement.Name")}
                      type="text"
                      id="name"
                      value={Name}
                      IsRequired={true}
                      MinLength={3}
                      RegexFormat=""
                      valueCallback={updateName}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.NameRequired"
                      )}
                    />
                  </div>

                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Passenger.FormElement.LastName")}
                      type="text"
                      id="lastName"
                      IsRequired={true}
                      MinLength={3}
                      value={LastName}
                      RegexFormat=""
                      valueCallback={updateLastName}
                      requiredMassage={t(
                        "ReservePage.Passenger.FormElement.LastNameRequired"
                      )}
                    />
                  </div>

                  {formSchema &&
                    formSchema.nationality &&
                    formSchema.nationality.value === 0 && (
                      <div className="form-group col">
                        <InputText
                          textAlign={styles.textAlign}
                          title={t(
                            "ReservePage.Passenger.FormElement.NationalCode"
                          )}
                          type="text"
                          id="nationalCode"
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

                  <div className="form-group col">
                    <label htmlFor="from">
                      {t("ReservePage.Passenger.FormElement.BirthDate")}
                    </label>
                    <DatePicker
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Passenger.FormElement.BirthDate")}
                      type="text"
                      id="birthDate"
                      value={BirthDate}
                      valueCallback={updateBirthDate}
                      requiredMassage={t("FlightNumber.FormElement.birthDate")}
                    />
                  </div>

                  <hr style={{ margin: "0" }} className="col-md-12" />

                  <div className="form-group col-md-3">
                    <label>&nbsp;</label>
                    <div className="">
                      <input
                        style={{ height: "25px", width: "25px" }}
                        type="checkbox"
                        className=""
                        checked={Wheelchair}
                        id="wheelchair"
                        onChange={updateWheelchair}
                      />
                      <label
                        style={{
                          textAlign: t("textAlign"),
                          float: "left",
                          margin: "0 10px",
                        }}
                        className="pt-1"
                        htmlFor="wheelchair"
                      >
                        {t("ReservePage.Passenger.FormElement.Wheelchair")}
                      </label>
                    </div>
                  </div>

                  {reserveContext &&
                    formSchema &&
                    formSchema.nationality &&
                    formSchema.nationality.value === 1 &&
                    reserveContext.flightinfo.flightType === 0 && (
                      <div className="form-group col-md-3">
                        <label>&nbsp;</label>
                        <div className="">
                          <input
                            style={{ height: "25px", width: "25px" }}
                            type="checkbox"
                            className=""
                            checked={Visa}
                            id="visa"
                            onChange={updateVisa}
                          />
                          <label
                            style={{
                              textAlign: t("textAlign"),
                              float: "left",
                              margin: "0 10px",
                            }}
                            className="pt-1"
                            htmlFor="visa"
                          >
                            {t("ReservePage.Passenger.FormElement.Visa")}
                          </label>
                        </div>
                      </div>
                    )}

                  <div className="col">
                    <button type="submit" className="btn btn-primary mt-3">
                      {t("FlightNumber.FormElement.SaveFlightNumber")}
                    </button>
                    <button
                      onClick={resetForm}
                      type="button"
                      className="btn btn-info mt-3"
                    >
                      جدید
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default PassengerInlineForm;
