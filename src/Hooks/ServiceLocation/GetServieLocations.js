import React, { Fragment, useContext, useEffect, useState } from "react";
import useHttp from "../use-http";
import BasicContext from "../../Store/enviroment-context";
const GetServieLocations = (props) => {
  const basicContext = useContext(BasicContext);

  useEffect(() => {
    sendRequest();
  }, [props.accountId]);
  const fillResult = (data) => {
    props.response(data);
  };
  const { isLoading, error, sendRequest } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/ServiceLocation?AccountId=${props.accountId}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillResult
  );

  return <Fragment />;
};

export default GetServieLocations;
