import React, { Fragment, useEffect, useState } from "react";

const InputText = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [displayValdation, setdisplayValdation] = useState("none");
  const [valid, setValidation] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (props.value) {
      setInputValue(props.value);
      setValidation(true);
      props.valueCallback(props.value, props.id, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  const Blured = () => {
    if (props.IsRequired && inputValue.length === 0) {
      setdisplayValdation("block");
      setErrorMessage(props.requiredMassage);
      setValidation(false);
      props.valueCallback(inputValue, props.id, false);
    } else {
      props.valueCallback(inputValue, props.id, true);
    }

    if (
      props.RegexFormat &&
      props.RegexFormat.length > 0 &&
      inputValue.length > 1
    ) {
      const validValue = new RegExp(props.RegexFormat);

      if (!validValue.test(inputValue)) {
        setdisplayValdation("block");
        setErrorMessage(props.formatMassage);
        setValidation(false);
        props.valueCallback(inputValue, props.id, false);
      } else {
        props.valueCallback(inputValue, props.id, true);
      }
    }
  };
  const elementChanged = (event) => {
    setInputValue(event.target.value);
    if (props.MinLength > inputValue.length) {
      setdisplayValdation("block");
    } else {
      setdisplayValdation("none");
    }
    props.valueCallback(inputValue, props.id, valid);
  };
  return (
    <Fragment>
      <label htmlFor="input" style={props.textAlign}>
        {props.title}
      </label>
      <input
        style={{ textAlign: props.innerTextAlign }}
        value={inputValue}
        onBlur={Blured}
        onChange={elementChanged}
        type={props.type}
        className={"form-control "}
        id={props.id}
        dir={props.dir}
        placeholder={props.title}
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

export default InputText;
