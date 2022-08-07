import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useHttp from "../../../../Hooks/use-http";
import BasicContext from "../../../../Store/enviroment-context";
import DropDown from "../../../UI/FormElement/DropDown";

const ServiceLineList = (props) => {
  const [t, i18n] = useTranslation("common");
  const basicContext = useContext(BasicContext);
  const [serviceLocationOption, setServiceLocationOption] = useState([]);
  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
  };
  const params = useParams();
  const [lineFetchList, setLineFetchList] = useState([]);
  const [lineDisplayList, setLineDisplayList] = useState([]);
  const [deletingId, setDeletingLocation] = useState();
  useEffect(() => {
    props.UpdateListFunc.current = updateList;

    console.log(
      `${basicContext.serviceLineAddress}/ServiceLine?AccountId=${params.AccountId}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`
    );

    fetchLocation();
    if (deletingId) {
      deleteLocation().then(() => {
        fetchServiceList();
      });
    } else {
      fetchServiceList();
    }
  }, [deletingId]);

  const filterList = (data, Id, valid) => {
    let items = lineFetchList;
    if (data.value == "all") {
      setLineDisplayList(items);
      return;
    }
    setLineDisplayList(
      items
        .filter((data1) => {
          console.log(data1);
          return data1.serviceLocationId == data.value;
        })
        .sort()
    );
  };

  const fillList = (data) => {
    setLineFetchList(data);
    setLineDisplayList(data);
  };
  const updateList = () => {
    fetchServiceList();
  };
  const onDeleteItem = (event) => {
    setDeletingLocation(event.currentTarget.id);
    fetchServiceList();
  };

  const {
    isLoading,
    error,
    sendRequest: fetchServiceList,
  } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/ServiceLine?AccountId=${params.AccountId}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillList
  );

  const {
    isLoadingDelete,
    errorDelete,
    sendRequest: deleteLocation,
  } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/Account/${params.AccountId}/ServiceLine/${deletingId}`,
      method: "delete",
      headers: { "Content-Type": "" },
      body: null,
    },
    fillList
  );
  const fillLocationOption = (data) => {
    let items = data.map((data) => {
      return { value: data.id, label: data.title };
    });
    items.push({ value: "all", label: "all" });
    setServiceLocationOption(items);
  };

  const {
    isLocationLoading,
    errorLocation,
    sendRequest: fetchLocation,
  } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/ServiceLocation?AccountId=${params.AccountId}&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillLocationOption
  );
  return (
    <table className="table table-bordered table-hover mb-4">
      <thead>
        <tr>
          <th colSpan={10}>
            <DropDown
              textAlign={styles.textAlign}
              title={t("ServiceLine.FormElement.ServiceLocationId")}
              type="text"
              id="ServiceLocationId"
              IsRequired={false}
              MinLength={0}
              RegexFormat=""
              options={serviceLocationOption}
              valueCallback={filterList}
            />
          </th>
        </tr>
        <tr>
          <th style={{ textAlign: "right" }}>Title</th>
          <th style={{ textAlign: "right", width: "50px" }}>Location</th>
          <th style={{ textAlign: "right", width: "50px" }}>State</th>
          <th style={{ textAlign: "right", width: "50px" }}>Tax</th>

          <th style={{ width: "100px" }}></th>
        </tr>
      </thead>
      <tbody>
        {lineDisplayList.map((data) => {
          return (
            <tr key={data.id}>
              <td style={{ textAlign: "right" }}>{data.title}</td>
              <td style={{ textAlign: "center" }}>
                {data.serviceLocation.title}
              </td>
              <td style={{ textAlign: "center" }}>
                {data.serviceLineStatus && (
                  <div className="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {data.taxInclude && (
                  <div className="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                )}
              </td>
              <td style={{ textAlign: "center" }} className="text-center">
                <div
                  style={{ float: "right", padding: "0 5px" }}
                  className="icon-container"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span className="icon-name"></span>
                </div>
                <div
                  style={{ float: "right", padding: "0 5px" }}
                  onClick={onDeleteItem}
                  id={data.id}
                  className="icon-container"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-trash-2"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ServiceLineList;
