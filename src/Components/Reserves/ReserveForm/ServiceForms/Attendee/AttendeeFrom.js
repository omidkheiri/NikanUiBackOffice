import React, { useContext, useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";
import Drawer from "../../../../UI/Drawer";
import InputText from "../../../../UI/FormElement/InputText";

const AttendeeFrom = (props) => {
  const UpdateReserve = () => {
    props.UpdateReserve();
  };
  const reserveServiceRef = useRef();
  const params = useParams();
  const [t] = useTranslation("common");
  const [fullname, setFullname] = useState();
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
  const updateFullName = (data) => {
    setFullname(data);
  };
  const submitAttendance = (event) => {
    event.preventDefault();

    if (fullname) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );
      if (
        reserveStorage.attendee.find((data) => {
          return data.fullname === fullname;
        })
      ) {
      } else {
        reserveStorage.attendee.push({ fullname: fullname });
        reserveServiceRef.current.UpdateReserve(
          params.LocationId,
          reserveStorage
        );
      }
      props.UpdateReserve();
      setReserveContext(reserveStorage);
    }
  };
  const [, setReserveContext] = useContext(ReserveContext);
  const reserveUpdated = () => {};
  const getReserve = () => {};
  return (
    <Drawer cntx={props}>
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <form onSubmit={submitAttendance}>
        <div className="form-group col">
          <InputText
            textAlign={styles.textAlign}
            title={t("ReservePage.Attendance.FormElement.FullName")}
            type="text"
            id="FullName"
            IsRequired={true}
            MinLength={3}
            RegexFormat=""
            valueCallback={updateFullName}
            requiredMassage={t(
              "ReservePage.Attendance.FormElement.FullNameRequired"
            )}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {t("FlightNumber.FormElement.SaveFlightNumber")}
        </button>
      </form>
    </Drawer>
  );
};

export default AttendeeFrom;
