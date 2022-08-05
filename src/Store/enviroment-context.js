import React from "react";

const BasicContext = React.createContext({
  baseAddress: `http://localhost:30007/GW/Account/V1/company/bde02ce9-c19a-47b8-9630-18325894de5a`,
  serviceLocationAddress: `http://localhost:30007/GW/ServiceLocation/V1/company/bde02ce9-c19a-47b8-9630-18325894de5a`,
});

export default BasicContext;
