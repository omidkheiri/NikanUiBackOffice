import React, { Fragment, useContext, useEffect } from "react";
import useHttp from "../use-http";
import BasicContext from "../../Store/enviroment-context";
const GetServieTypes = (props) => {
  const basicContext = useContext(BasicContext);

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.accountId]);

  const fillResult = (data) => {
    props.response(data);
  };

  const { sendRequest } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/ServiceTypes`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillResult
  );

  return <Fragment />;
};

export default GetServieTypes;
