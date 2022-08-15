import React, { Fragment, useContext, useEffect, useState } from "react";
import useHttp from "../use-http";
import BasicContext from "../../Store/enviroment-context";

import CustomStore from "devextreme/data/custom_store";

const AirlineNameService = (props) => {
  const [currentOpration, setcurrentOpration] = useState("");
  const [requestData, setRequestData] = useState({});
  const [workingItem, setWorkingItem] = useState("");
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }
  const basicContext = useContext(BasicContext);

  const store = new CustomStore({
    key: "id",
    load: (loadOptions) => {
      let params = "?";
      [
        "skip",
        "take",
        "requireTotalCount",
        "requireGroupCount",
        "sort",
        "filter",
        "totalSummary",
        "group",
        "groupSummary",
      ].forEach((i) => {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) {
          params += `${i}=${JSON.stringify(loadOptions[i])}&`;
        }
      });
      params = params.slice(0, -1);
      return fetch(`${basicContext.flightAddress}/AirlineName${params}`)
        .then((response) => response.json())
        .then((data) => ({
          data: data.data,
          totalCount: data.totalCount,
          summary: data.summary,
          groupCount: data.groupCount,
        }))
        .catch(() => {
          throw new Error("Data Loading Error");
        });
    },
    insert: (values) => {
      setRequestData(values);
      setcurrentOpration("insert");
    },
    update: (key, values) => {
      setRequestData(values);
      setWorkingItem(key);
      setcurrentOpration("update");
    },
    remove: (key) => {
      setWorkingItem(key);
      setcurrentOpration("delete");
    },
  });
  useEffect(() => {
    props.getStore(store);
  }, []);
  const GoToPanel = () => {
    return;
  };
  const {
    isLoading,
    error,
    sendRequest: insertAirlineName,
  } = useHttp(
    {
      url: basicContext.flightAddress + "/AirlineName",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    GoToPanel
  );

  const {
    isUpdateLoading,
    errorUpdate,
    sendRequest: updateAirlineName,
  } = useHttp(
    {
      url: `${basicContext.flightAddress}/AirlineName/${workingItem}`,
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    GoToPanel
  );
  const {
    isDeleteLoading,
    errorDelete,
    sendRequest: deleteAirlineName,
  } = useHttp(
    {
      url: `${basicContext.flightAddress}/AirlineName/${workingItem}`,
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: requestData,
    },
    GoToPanel
  );
  useEffect(() => {
    if (currentOpration === "insert") insertAirlineName(requestData);
    if (currentOpration === "delete") deleteAirlineName(requestData);
    if (currentOpration === "update") updateAirlineName(requestData);
  }, [requestData, workingItem]);
  return <Fragment />;
};
export default AirlineNameService;
