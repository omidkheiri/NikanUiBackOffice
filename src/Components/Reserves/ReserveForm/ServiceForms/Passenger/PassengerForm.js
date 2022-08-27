import React from "react";
import Drawer from "../../../../UI/Drawer";
import PassengerNew from "./PassengerNew";
import PassengerSelections from "./PassengerSelections";

const PassengerForm = (props) => {
  return (
    <Drawer cntx={props}>
      <PassengerSelections />
      <PassengerNew />
    </Drawer>
  );
};

export default PassengerForm;
