import React from "react";
import Drawer from "../../../../UI/Drawer";
import PassengerUpdate from "./PassengerUpdate";

const PassengerUpdateForm = (props) => {
  const UpdateReserve = () => {
    props.UpdateReserve();
  };
  return (
    <Drawer cntx={props}>
      <PassengerUpdate
        UpdateReserve={UpdateReserve}
        passenger={props.passenger}
        scheme={props.scheme}
      />
    </Drawer>
  );
};

export default PassengerUpdateForm;
