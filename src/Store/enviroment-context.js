import React from "react";

const BasicContext = React.createContext({
  baseAddress: `http://localhost:30007/GW/Account/V1/company/6daf220b-f859-4b80-93e0-a2350d2aa90c`,
  flightAddress: `http://localhost:30007/GW/Account/V1/company/6daf220b-f859-4b80-93e0-a2350d2aa90c`,
  serviceLocationAddress: `http://localhost:30007/GW/ServiceLocation/V1/company/6daf220b-f859-4b80-93e0-a2350d2aa90c`,
  serviceLineAddress: `http://localhost:30007/GW/ServiceLine/V1/Company/6daf220b-f859-4b80-93e0-a2350d2aa90c`,
});

export default BasicContext;
