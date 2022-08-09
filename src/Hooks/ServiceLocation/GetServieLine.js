import React, { Fragment, useContext, useEffect, useState } from "react";
import useHttp from "../use-http";
import BasicContext from "../../Store/enviroment-context";
const GetServieLine = (props) => {
  const basicContext = useContext(BasicContext);

  useEffect(() => {
    sendRequest();
  }, [props.accountId]);

  const fillResult = (data) => {
    props.response(data);
  };

  const { isLoading, error, sendRequest } = useHttp(
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
