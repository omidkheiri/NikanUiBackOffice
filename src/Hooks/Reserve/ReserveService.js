import React, { forwardRef, useImperativeHandle, useState } from "react";

const ReserveService = forwardRef((props, ref) => {
  const [reserve] = useState({
    locationId: {},
    customerId: "",
    flightinfo: {
      flightDate: [],
      flightNumber: "",
      flightTime: "",
      flightType: "",
    },
    passenger: [],
    transfer: [],
    attendee: [],
    pet: 0,
  });

  useImperativeHandle(ref, () => ({
    AddReserveTemp(id) {
      localStorage.setItem(id, JSON.stringify(reserve));
    },
    UpdateReserve(id, data) {
      localStorage.setItem(id, JSON.stringify(data));
      props.reserveUpdated();
    },
    GetReserve(id) {
      return JSON.parse(localStorage.getItem(id));
    },
  }));
});

export default ReserveService;
