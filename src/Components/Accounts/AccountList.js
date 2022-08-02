import React from "react";

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

const AccountList = () => {
  const [t, i18n] = useTranslation("common");
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
      return fetch(
        `http://localhost:30007/GW/Account/V1/company/68a70e32-6029-48e4-b903-02cc473c97a7/account${params}`
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
          <h3>{t("Account.List.PageTitle")}</h3>
        </div>
      </div>

      <div className="row layout-top-spacing">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-chart-one" style={{ padding: "20px" }}>
            <div className="widget-heading">
              <DataGrid
                hoverStateEnabled={true}
                dataSource={store}
                showBorders={true}
                remoteOperations={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
              >
                <SearchPanel visible={true} />
                <Column
                  direction="rtl"
                  alignment={"center"}
                  dataField="accountNumber"
                  caption={t("Account.List.AccountNumber")}
                  dataType="string"
                  width={120}
                />
                <Column
                  direction="rtl"
                  alignment={"right"}
                  dataField="title"
                  dataType="string"
                  caption={t("Account.List.Title")}
                />

                <Column
                  width={200}
                  dataField="emailAddress"
                  dataType="string"
                  caption={t("Account.List.EmailAddress")}
                />
                <Column
                  width={200}
                  dataField="phone"
                  dataType="string"
                  caption={t("Account.List.Phone")}
                />
                <Column
                  width={50}
                  dataField="isSupplier"
                  dataType="boolean"
                  caption={t("Account.List.IsSupplier")}
                  cellRender={checkBoxCell}
                />
                <Column
                  width={50}
                  dataField="isCustomer"
                  dataType="boolean"
                  caption={t("Account.List.IsCustomer")}
                  cellRender={checkBoxCell}
                />

                <Column
                  dataField="accountId"
                  width={50}
                  allowSorting={false}
                  cellRender={gotoAccount}
                  caption={t("Account.List.Link")}
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

export default AccountList;
