import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";

const DropDown = (props) => {
  const options = props.options;
  const [inputValue, setInputValue] = useState("");
  const [displayValdation, setdisplayValdation] = useState("none");
  const [valid, setValidation] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (props.value) {
      setInputValue(props.value);
    }
  }, [props.value]);
  const Blured = () => {
    if (!inputValue) {
      setdisplayValdation("block");
      setErrorMessage(props.requiredMassage);
      setValidation(false);
      props.valueCallback(inputValue, props.id, false);
    } else {
      setdisplayValdation("none");
      props.valueCallback(inputValue, props.id, true);
    }
  };

  const state = {
    selectedOption: null,
  };
  const handleChange = (selectedOption) => {
    setInputValue(selectedOption);
  };

  return (
    <Fragment>
      <label htmlFor="input" style={props.textAlign}>
        {props.title}
      </label>
      <Select
        onBlur={Blured}
        value={inputValue}
        onChange={handleChange}
        options={options}
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

export default DropDown;
