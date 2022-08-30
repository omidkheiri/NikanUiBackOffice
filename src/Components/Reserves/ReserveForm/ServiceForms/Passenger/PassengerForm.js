import React from "react";
import Drawer from "../../../../UI/Drawer";
import PassengerNew from "./PassengerNew";
import PassengerSelections from "./PassengerSelections";

const PassengerForm = (props) => {
  const UpdateReserve = () => {
    props.UpdateReserve();
  };

  return (
    <Drawer cntx={props}>
      <PassengerSelections />
      <PassengerNew UpdateReserve={UpdateReserve} scheme={props.scheme} />
    </Drawer>
  );
};

export default PassengerForm;
