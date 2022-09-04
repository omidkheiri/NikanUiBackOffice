import React, { Fragment, useState } from "react";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
const DatePicker = (props) => {
  const [displayValdation] = useState("none");

  const [errorMessage] = useState("");
  const pickerChanged = (event) => {
    props.valueCallback(event, props.id);
  };
  // const checkValue = (data) => {
  //   if (props.IsRequired && data) {
  //     setdisplayValdation("block");
  //     setErrorMessage(props.requiredMassage);
  //     setValidation(false);
  //     props.valueCallback(inputValue, props.id, false);
  //   } else {
  //     props.valueCallback(inputValue, props.id, true);
  //   }
  // };
  return (
    <Fragment>
      <Flatpickr
        value={props.value}
        options={{ minDate: props.minDate }}
        className="form-control flatpickr flatpickr-input"
        onChange={pickerChanged}
      />
      <div
        style={{ display: displayValdation }}
        className="invalid-feedback show"
      >
        {errorMessage}
      </div>
    </Fragment>
  );
};

export default DatePicker;
