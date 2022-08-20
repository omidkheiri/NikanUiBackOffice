import React, {
  Fragment,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

import "devextreme/data/odata/store";
import Button from "devextreme-react/button";
import {
  DataGrid,
  Column,
  LoadPanel,
  Toolbar,
  Item,
  SearchPanel,
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import { useTranslation } from "react-i18next";
import CheckBox from "../UI/ListElement/CheckBox";
import BasicContext from "../../Store/enviroment-context";
import FlightNumberNewForm from "./FlightNumberNewForm";
import FlightNumberEditForm from "./FlightNumberEditForm";

const FlightList = () => {
  const [refreshList, setrefreshList] = useState(false);
  const [formIsShown, setformIsShown] = useState("none");
  const [currentFlightId, setCurrentFlightId] = useState("");
  const UpdateListFunc = useRef(null);
  const cancelModal = () => {
    setformIsShown("none");
    setCurrentFlightId("");
  };

  const UpdateList = () => {
    setformIsShown("none");
    setrefreshList(!refreshList);
    UpdateListFunc.current();
    setCurrentFlightId("");
  };
  const basicContext = useContext(BasicContext);
  const [t] = useTranslation("common");
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }
  const AddFlightName = () => {
    setformIsShown("new");
  };
  const store = new CustomStore({
    key: "id",
    load(loadOptions) {
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
      return fetch(`${basicContext.flightAddress}/FlightNumber${params}`)
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
  });
  const checkBoxCell = (data) => {
    return (
      <div>
        <CheckBox data={data} />
      </div>
    );
  };
  const timeCell = (data) => {
    return `${data.value.hour}:${data.value.minute}`;
  };
  const gotoFlight = (data) => {
    return (
      <div
        className="btn btn-info btn-sm listButton"
        onClick={() => {
          setCurrentFlightId(data.value);
        }}
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
          className="feather feather-settings"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </div>
    );
  };

  const flightType = (data) => {
    return <div>{data.value === 0 ? <p>Arrival</p> : <p>Departure</p>}</div>;
  };

  useEffect(() => {
    if (currentFlightId) {
      setformIsShown("update");
    }
  }, [currentFlightId]);
  return (
    <Fragment>
      <div className="layout-px-spacing">
        <div className="page-header">
          <div className="page-title">
            <h3>{t("FlightNumber.List.PageTitle")}</h3>
          </div>
        </div>

        <div className="row layout-top-spacing">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
            <div
              className="widget widget-chart-one"
              style={{ padding: "20px" }}
            >
              <div className="widget-heading">
                {formIsShown === "new" && (
                  <FlightNumberNewForm
                    cancelCallBack={cancelModal}
                    formIsShown={formIsShown}
                    UpdateList={UpdateList}
                  ></FlightNumberNewForm>
                )}
                {formIsShown === "update" && (
                  <FlightNumberEditForm
                    FlightId={currentFlightId}
                    cancelCallBack={cancelModal}
                    formIsShown={formIsShown}
                    UpdateList={UpdateList}
                  ></FlightNumberEditForm>
                )}

                <DataGrid
                  hoverStateEnabled={true}
                  dataSource={store}
                  showBorders={true}
                  remoteOperations={true}
                  showColumnLines={true}
                  showRowLines={true}
                  rowAlternationEnabled={true}
                >
                  <LoadPanel enabled={true} />
                  <SearchPanel visible={true} />
                  <Toolbar>
                    <Item name="groupPanel" />
                    <Item location="after">
                      <Button icon="plus" onClick={AddFlightName} />
                    </Item>
                    <Item name="addRowButton" showText="always" />
                    <Item name="exportButton" />
                    <Item name="columnChooserButton" />
                    <Item name="searchPanel" />
                  </Toolbar>

                  <Column
                    direction="rtl"
                    alignment={"center"}
                    dataField="airlineName"
                    caption={t("FlightNumber.List.AirlineName")}
                    dataType="string"
                    width={120}
                  />
                  <Column
                    direction="rtl"
                    alignment={"right"}
                    dataField="flightName"
                    dataType="string"
                    caption={t("FlightNumber.List.FlightName")}
                  />
                  <Column
                    direction="rtl"
                    alignment={"right"}
                    dataField="flightInfo.arrivalCity"
                    dataType="string"
                    caption={t("FlightNumber.List.ArrivalCity")}
                  />
                  <Column
                    direction="rtl"
                    alignment={"right"}
                    dataField="flightInfo.departureCity"
                    dataType="string"
                    caption={t("FlightNumber.List.DepartureCity")}
                  />
                  <Column
                    width={200}
                    dataField="flightDate"
                    dataType="date"
                    caption={t("FlightNumber.List.FlightDate")}
                  />
                  <Column
                    width={200}
                    dataField="flightTimeOnly"
                    dataType="text"
                    caption={t("FlightNumber.List.FlightTimeOnly")}
                    cellRender={timeCell}
                  />
                  <Column
                    width={90}
                    dataField="flightType"
                    dataType="text"
                    cellRender={flightType}
                    caption={t("FlightNumber.List.FlightType")}
                  />

                  <Column
                    width={50}
                    dataField="scheduled"
                    dataType="boolean"
                    caption={t("FlightNumber.List.Scheduled")}
                    cellRender={checkBoxCell}
                  />
                  <Column
                    width={50}
                    dataField="status"
                    dataType="boolean"
                    caption={t("FlightNumber.List.Status")}
                    cellRender={checkBoxCell}
                  />

                  <Column
                    dataField="id"
                    width={50}
                    allowSorting={false}
                    cellRender={gotoFlight}
                    caption={t("FlightNumber.List.Link")}
                  />
                </DataGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FlightList;
