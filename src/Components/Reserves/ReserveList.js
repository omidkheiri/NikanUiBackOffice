import React, { useContext } from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Paging,
  Pager,
  SearchPanel,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";
import { useTranslation } from "react-i18next";
import CheckBox from "../UI/ListElement/CheckBox";
import GotoButton from "../UI/ListElement/GotoButton";
import BasicContext from "../../Store/enviroment-context";

const ReserveList = () => {
  const basicContext = useContext(BasicContext);
  const [t] = useTranslation("common");
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }

  const store = new CustomStore({
    key: "accountId",
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
      return fetch(`${basicContext.reportAddress}/account${params}`)
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
  const gotoAccount = (data) => {
    return (
      <div>
        <GotoButton data={`/account/${data.value}`} />
      </div>
    );
  };

  const allowedPageSizes = [8, 12, 20];

  return (
    <div className="layout-px-spacing">
      <div className="page-header">
        <div className="page-title">
          <h3>{t("Reserve.List.PageTitle")}</h3>
        </div>
      </div>

      <div className="row layout-top-spacing">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-chart-one" style={{ padding: "20px" }}>
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
                <SearchPanel visible={true} />

                <Column
                  width={200}
                  direction="rtl"
                  alignment={"right"}
                  dataField="flightNumber"
                  dataType="string"
                  caption={t("ReservePage.List.FlightNumber")}
                />

                <Column
                  width={200}
                  dataField="flightDate"
                  dataType="string"
                  caption={t("ReservePage.List.FlightDate")}
                />
                <Column
                  width={50}
                  dataField="customerName"
                  dataType="boolean"
                  caption={t("ReservePage.List.CustomerName")}
                />
                <Column
                  width={50}
                  dataField="customerId"
                  dataType="boolean"
                  caption={t("ReservePage.List.CustomerId")}
                />

                <Column
                  width={50}
                  dataField="payment"
                  dataType="boolean"
                  caption={t("ReservePage.List.Payment")}
                  cellRender={checkBoxCell}
                />
                <Column
                  width={50}
                  dataField="sendToSupplier"
                  dataType="boolean"
                  caption={t("ReservePage.List.Approved")}
                  cellRender={checkBoxCell}
                />

                <Column
                  dataField="accountId"
                  width={50}
                  allowSorting={false}
                  cellRender={gotoAccount}
                  caption={t("ReservePage.List.Link")}
                />
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
  );
};

export default ReserveList;
