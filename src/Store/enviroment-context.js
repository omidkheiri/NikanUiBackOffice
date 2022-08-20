import React from "react";

const BasicContext = React.createContext({
  baseAddress: `http://localhost:30007/GW/Account/V1/company/1c6c8970-bba4-4408-9280-2a4584a19562`,
  flightAddress: `http://localhost:30007/GW/Account/V1/company/1c6c8970-bba4-4408-9280-2a4584a19562`,
  serviceLocationAddress: `http://localhost:30007/GW/ServiceLocation/V1/company/1c6c8970-bba4-4408-9280-2a4584a19562`,
  serviceLineAddress: `http://localhost:30007/GW/ServiceLine/V1/Company/1c6c8970-bba4-4408-9280-2a4584a19562`,
});

export default BasicContext;
