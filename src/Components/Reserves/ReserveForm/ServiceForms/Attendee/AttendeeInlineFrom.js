import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";
import DropDown from "../../../../UI/FormElement/DropDown";
import InputText from "../../../../UI/FormElement/InputText";
import Moment from "moment";
import { v4 as uuid } from "uuid";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
const AttendeeInlineFrom = (props) => {
  const pricesServiceRef = useRef();
  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const [formSchema, setformSchema] = useState({});
  const [t] = useTranslation("common");
  const [genderTypes] = useState([
    { value: "0", label: t("ReservePage.Attendee.Genders.Female") },
    { value: "1", label: t("ReservePage.Attendee.Genders.Male") },
  ]);
  const [Gender, setGender] = useState({});
  const reserveServiceRef = useRef();
  const params = useParams();

  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [unique_id, setunique_id] = useState(uuid());
  const fillForm = (attendeeId) => {
    var attnedee = ReserveContext.attendee.find((data) => {
      return data.id === attendeeId;
    });
    if (attnedee) {
      setName(attnedee.name);
      setName(attnedee.lastName);

      setGender(
        genderTypes.find((d) => {
          return d.value === attnedee.gender;
        })
      );
    }
  };
  useEffect(() => {
    if (props.attendeeId) {
      fillForm(props.attendeeId);
      setunique_id(props.attendeeId);
    }
  }, [props.passengerid]);
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
  const updateName = (data) => {
    setName(data);
  };

  const updateLastName = (data) => {
    setLastName(data);
  };
  const updateGender = (data) => {
    setGender(data);
  };
  const handleInputChange = (data) => {};
  const checkForm = () => {
    let isvalid = true;

    if (formSchema.gender && JSON.stringify(Gender) === "{}") {
      isvalid = false;
    }
    if (formSchema.name && Name === "") {
      isvalid = false;
    }
    if (formSchema.lastName && LastName === "") {
      isvalid = false;
    }

    return isvalid;
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (checkForm()) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );

      if (reserveStorage.attendee.length > 0 && reserveStorage.attendee[0]) {
        var item = reserveStorage.attendee.find((data) => {
          return data.id === unique_id;
        });
        if (item) {
          reserveStorage.attendee.forEach((element) => {
            if (element.id === unique_id) {
              element.gender = Gender.value;
              element.name = Name;
              element.lastName = LastName;
            }
          });
        } else {
          var record = {
            id: unique_id,
            gender: Gender.value,
            name: Name,
            lastName: LastName,
          };

          reserveStorage.attendee.push(record);
        }
      } else {
        reserveStorage.attendee = [];
        record = {
          id: unique_id,

          gender: Gender.value,
          name: Name,
          lastName: LastName,

          scheme: formSchema,
        };

        reserveStorage.attendee.push(record);
      }
      resetForm();
      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );
      setReserveContext(reserveStorage);
    }
  };
  useEffect(() => {
    var priceData = pricesServiceRef.current.GetPrices(
      params.LocationId +
        "#" +
        Moment(new Date(reserveContext.flightinfo.flightDate)).format(
          "YYYY-MM-DD"
        )
    );
    if (priceData) {
      var item = priceData.find((data) => {
        return data.serviceTypeId == 2;
      });

      if (item) {
        var scheme = JSON.parse(item.serviceLineScheme);

        setformSchema(scheme);
      }
    }
  }, [pricesServiceRef]);

  const reserveUpdated = () => {};
  const getReserve = () => {};
  const resetForm = () => {
    setunique_id(uuid());
  };
  return (
    <Fragment key={unique_id}>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="form-group col">
            <DropDown
              textAlign={styles.textAlign}
              title={t("ReservePage.Attendee.FormElement.Gender")}
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
                "ReservePage.Attendee.FormElement.GenderRequired"
              )}
            />
          </div>
          <div className="form-group col">
            <InputText
              textAlign={styles.textAlign}
              title={t("ReservePage.Attendee.FormElement.Name")}
              type="text"
              id="name"
              IsRequired={true}
              MinLength={3}
              RegexFormat=""
              valueCallback={updateName}
              requiredMassage={t(
                "ReservePage.Attendee.FormElement.NameRequired"
              )}
            />
          </div>
          <div className="form-group col">
            <InputText
              textAlign={styles.textAlign}
              title={t("ReservePage.Attendee.FormElement.LastName")}
              type="text"
              id="lastName"
              IsRequired={true}
              MinLength={3}
              RegexFormat=""
              valueCallback={updateLastName}
              requiredMassage={t(
                "ReservePage.Attendee.FormElement.LatsNameRequired"
              )}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary m-3">
          {t("FlightNumber.FormElement.SaveFlightNumber")}
        </button>
      </form>
    </Fragment>
  );
};

export default AttendeeInlineFrom;
