import React from "react";

const BasicContext = React.createContext({
  baseAddress: `http://gaitway.ribbonid.com/GW/Account/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  flightAddress: `http://gaitway.ribbonid.com/GW/Account/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  serviceLocationAddress: `http://gaitway.ribbonid.com/GW/ServiceLocation/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  serviceLineAddress: `http://gaitway.ribbonid.com/GW/ServiceLine/V1/Company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
  ReserveAddress:
    "http://localhost:30007/GW/Reserve/V1/Company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320",
});

export default BasicContext;
