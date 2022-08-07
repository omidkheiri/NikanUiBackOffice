import React from "react";

const BasicContext = React.createContext({
  baseAddress: `http://localhost:30007/GW/Account/V1/company/cc7bebf0-d6b4-43e4-997b-585e2612e547`,
  serviceLocationAddress: `http://localhost:30007/GW/ServiceLocation/V1/company/cc7bebf0-d6b4-43e4-997b-585e2612e547`,
  serviceLineAddress: `http://localhost:30007/GW/ServiceLine/V1/Company/cc7bebf0-d6b4-43e4-997b-585e2612e547`,
});

export default BasicContext;
