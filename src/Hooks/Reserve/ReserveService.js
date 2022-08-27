import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const ReserveService = forwardRef((props, ref) => {
  const [reserve, setReserve] = useState({
    locationId: {},
    customerId: "",
    flightinfo: {
      flightDate: [],
      flightNumber: "",
      flightTime: "",
      flightType: "",
    },
    passenger: [
      {
        name: "",
        lastName: "",
        gender: "",
        nationalCode: "",
        passportNumber: "",
        passportExpireDate: "",
        mobileNumber: "",
        emailAddress: "",
        birthDate: "",
        age: "",
        nationality: "",
      },
    ],
    transfer: [
      {
        fromAddress: "",
        toAddress: "",
        description: "",
        mobileNumber: "",
      },
    ],
    attendee: [{ fullName: "" }],
    pet: 0,
  });

  useImperativeHandle(ref, () => ({
    AddReserveTemp(id) {
      localStorage.setItem(id, JSON.stringify(reserve));
    },
    UpdateReserve(id, data) {
      console.log(data);
      localStorage.setItem(id, JSON.stringify(data));
    },
    GetReserve(id) {
      return JSON.parse(localStorage.getItem(id));
    },
  }));
});

export default ReserveService;
