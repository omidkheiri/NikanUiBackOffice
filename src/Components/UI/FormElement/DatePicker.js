import React, { Fragment } from "react";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";
const DatePicker = (props) => {
  const pickerChanged = (event) => {
    props.valueCallback(event);
  };
  return (
    <Flatpickr
      value={props.value}
      options={{ minDate: props.minDate }}
      className="form-control flatpickr flatpickr-input"
      onChange={pickerChanged}
    />
  );
};

export default DatePicker;
