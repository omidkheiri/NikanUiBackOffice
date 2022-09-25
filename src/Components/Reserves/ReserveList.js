import React, { Fragment, useContext } from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  Grouping,
  GroupPanel,
  Column,
  Paging,
  Pager,
  SearchPanel,
  Button,
  FilterRow,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import BasicContext from "../../Store/enviroment-context";
import Moment from "moment";
import { useRef } from "react";
import ReserveService from "../../Hooks/Reserve/ReserveService";
import useHttp from "../../Hooks/use-http";
import { useState } from "react";
import { useEffect } from "react";

const ReserveList = () => {
  const reserveServiceRef = useRef(null);
  const basicContext = useContext(BasicContext);
  const [t] = useTranslation("common");
  const [ReserveId, setReserveId] = useState();
  const [locationId, setlocationId] = useState();
  const history = useHistory();
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }

  const store = new CustomStore({
    key: "reserveUniqueId",
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
      return fetch(
        `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320/Reserve${params}`
      )
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

  // const gotoReserve = (data) => {
  //   return (
  //     <div>
  //       <button onClick={getReservedata}>sdfs</button>
  //     </div>
  //   );
  // };
  const AddReserveInfo = (data) => {
    let reserveStorage = {
      clientReserveId: "",
      locationId: {},
      customerId: "",
      flightInfo: {
        flightDate: [],
        flightNumber: "",
        flightTime: "",
        flightType: "",
      },
      reserveItem: [],
    };

    reserveStorage.flightInfo = data.flightInfo;
    reserveStorage.clientReserveId = data.clientReserveId;
    reserveStorage.contactFullName = data.contactFullName;
    reserveStorage.contactId = data.contactId;
    reserveStorage.id = data.id;
    reserveStorage.contactPhone = data.contactPhone;
    reserveStorage.customerId = data.contactId;
    data.reserveItems.forEach((data) => {
      var item = {
        serviceLineId: data.serviceLineId,
        serviceLineTitle: data.serviceLineTitle,
        serviceQty: data.serviceQty,
        serviceTypeId: data.serviceTypeId,
        unitPrice: data.unitPrice,
      };
      if (data.passenger) {
        item.passenger = data.passenger;
      }
      if (data.visa) {
        item.visa = data.visa;
      }
      if (data.wheelchair) {
        item.wheelchair = data.wheelchair;
      }

      if (data.attendee) {
        item.attendee = data.attendee;
      }
      if (data.transfer) {
        item.transfer = data.transfer;
      }
      if (data.serviceTypeId === 4) {
        item["pet"] = { qty: data.serviceQty };
      }

      reserveStorage.reserveItem.push(item);
    });

    reserveServiceRef.current.AddReserve(data.locationId, reserveStorage);
    fetchLocation();
    setReserveId();
  };

  const GetLocationData = (data) => {
    let reserveStorage = reserveServiceRef.current.GetReserve(locationId);
    reserveStorage.locationId = data;
    reserveServiceRef.current.UpdateReserve(locationId, reserveStorage);

    history.push("/Reserve/" + locationId + "/" + ReserveId);
  };

  const { sendRequest: fetchLocation } = useHttp(
    {
      url:
        basicContext.serviceLocationAddress + "/ServiceLocation/" + locationId,
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    GetLocationData
  );

  const { sendRequest: fetchReserve } = useHttp(
    {
      url: `http://localhost:5105/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320/Reserve/${ReserveId}`, //basicContext.ReserveAddress + "/Reserve",
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: null,
    },
    AddReserveInfo
  );

  const myCommand = (e) => {
    localStorage.removeItem(e.row.data.locationId);
    console.log(e.row.data.reserveUniqueId);
    setReserveId(e.row.data.reserveUniqueId);
    setlocationId(e.row.data.locationId);
  };

  useEffect(() => {
    if (ReserveId) {
      fetchReserve();
    }
  }, [ReserveId]);

  const DateCell = (data) => {
    return (
      <div>
        <span style={{ float: "right" }}>
          {Moment(new Date(data.value)).format("HH:mm")}
        </span>
        <span style={{ direction: "ltr", float: "left" }}>
          {Moment(new Date(data.value)).format("YYYY-MM-DD")}
        </span>
      </div>
    );
  };
  const allowedPageSizes = [8, 12, 20];
  const reserveUpdated = () => {};
  return (
    <Fragment>
      <ReserveService reserveUpdated={reserveUpdated} ref={reserveServiceRef} />
      <div className="layout-px-spacing">
        <div className="page-header">
          <div className="page-title">
            <h3>{t("ReservePage.List.PageTitle")}</h3>
          </div>
        </div>

        <div className="row layout-top-spacing">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
            <div
              className="widget widget-chart-one"
              style={{ padding: "20px" }}
            >
              <div className="widget-heading">
                <DataGrid
                  dataSource={store}
                  hoverStateEnabled={true}
                  showBorders={true}
                  remoteOperations={true}
                  showColumnLines={true}
                  showRowLines={true}
                  rowAlternationEnabled={true}
                >
                  <Grouping contextMenuEnabled={true} />
                  <GroupPanel visible={true} />
                  <SearchPanel visible={true} />
                  <FilterRow visible={true} />
                  <Column
                    width={100}
                    direction="rtl"
                    alignment={"right"}
                    dataField="flightName"
                    dataType="string"
                    caption={t("ReservePage.List.FlightNumber")}
                  />
                  <Column
                    width={150}
                    dataField="reserveNumber"
                    caption={t("ReservePage.List.ReserveNumber")}
                  />
                  <Column
                    dataField="flightDate"
                    width={150}
                    cellRender={DateCell}
                    caption={t("ReservePage.List.FlightDate")}
                  />
                  <Column
                    width={150}
                    dataField="contactFullName"
                    caption={t("ReservePage.List.CustomerName")}
                  />
                  <Column
                    width={120}
                    dataField="contactPhone"
                    caption={t("ReservePage.List.ContactPhone")}
                  />
                  <Column
                    width={150}
                    dataField="locationTitle"
                    caption={t("ReservePage.List.LocationTitle")}
                  />

                  <Column
                    width={100}
                    dataField="payment"
                    caption={t("ReservePage.List.Payment")}
                  />
                  <Column width={50} dataField="passengers" caption="P" />
                  <Column width={50} dataField="attendance" caption="A" />
                  <Column width={50} dataField="transfer" caption="T" />

                  <Column
                    width={120}
                    dataField="remainig"
                    caption={t("ReservePage.List.Remaining")}
                  />

                  <Column type="buttons">
                    <Button text="Open" hint="Open" onClick={myCommand} />
                  </Column>

                  <Paging defaultPageSize={12} />
                  <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={allowedPageSizes}
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

export default ReserveList;
