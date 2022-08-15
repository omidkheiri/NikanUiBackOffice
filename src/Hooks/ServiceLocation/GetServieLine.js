import React, { Fragment, useContext, useEffect } from "react";
import useHttp from "../use-http";
import BasicContext from "../../Store/enviroment-context";
const GetServieLine = (props) => {
  const basicContext = useContext(BasicContext);

  useEffect(() => {
    alert();
    sendRequest();
  }, []);

  const fillResult = (data) => {
    props.response(data);
  };

  const { sendRequest } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/Account/${
        props.accountId
      }/ServiceLine/${props.serviceId}?Extend=${
        props.extend ? "true" : "false"
      }`,
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillResult
  );

  return <Fragment />;
};

export default GetServieLine;
