import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";

const DropDown = (props) => {
  const options = props.options;
  const [valid, setValidation] = useState(true);
  const [inputValue, setInputValue] = useState(props.value);
  useEffect(() => {
    if (props.value) {
      setInputValue(props.value);

      setValidation(true);
      props.valueCallback(props.value, props.id, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  const [displayValdation, setdisplayValdation] = useState("none");

  const [errorMessage, setErrorMessage] = useState("");

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

  const handleChange = (selectedOption) => {
    setInputValue(selectedOption);
    props.valueCallback(selectedOption, props.id, true);
  };
  const onInputChange = (data) => {
    props.handleInputChange(data);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid]);
  return (
    <Fragment>
      <label htmlFor="input" style={props.textAlign}>
        {props.title}
      </label>
      <Select
        id="input"
        onBlur={Blured}
        value={inputValue}
        onChange={handleChange}
        onInputChange={onInputChange}
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
