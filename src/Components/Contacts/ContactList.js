import React, { Fragment, useContext } from "react";

import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Paging,
  Pager,
  SearchPanel,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { useTranslation } from "react-i18next";
import GotoButton from "../UI/ListElement/GotoButton";
import BasicContext from "../../Store/enviroment-context";

const ContactList = () => {
  const basicContext = useContext(BasicContext);
  const [t] = useTranslation("common");
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }
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
      return fetch(`${basicContext.reportAddress}/Contact${params}`)
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

  const gotoAccount = (data) => {
    return (
      <Fragment>
        <div style={{ float: "left", margin: "0px 5px" }}>
          <GotoButton
            data={`/contact/${data.data.accountId}/${data.data.contactId}`}
          />
        </div>
        <div style={{ float: "left", margin: "0px 5px" }}>
          <GotoButton data={`/Reserve/${data.value}/null`} />
        </div>
      </Fragment>
    );
  };

  const allowedPageSizes = [8, 12, 20];

  return (
    <div className="layout-px-spacing">
      <div className="page-header">
        <div className="page-title">
          <h3>{t("Contact.List.PageTitle")}</h3>
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
                  dataField="contactNumber"
                  caption={t("Contact.List.ContactNumber")}
                  dataType="string"
                  width={120}
                />
                <Column
                  direction="rtl"
                  alignment={"right"}
                  dataField="name"
                  dataType="string"
                  caption={t("Contact.List.Name")}
                />
                <Column
                  direction="rtl"
                  alignment={"right"}
                  dataField="lastName"
                  dataType="string"
                  caption={t("Contact.List.LastName")}
                />
                <Column
                  direction="rtl"
                  alignment={"right"}
                  dataField="accountTitle"
                  dataType="string"
                  caption={t("Contact.List.َAccountTitle")}
                />
                <Column
                  width={200}
                  dataField="emailAddress"
                  dataType="string"
                  caption={t("Contact.List.EmailAddress")}
                />
                <Column
                  width={200}
                  dataField="phone"
                  dataType="string"
                  caption={t("Contact.List.Phone")}
                />

                <Column
                  dataField="row"
                  width={150}
                  allowSorting={false}
                  cellRender={gotoAccount}
                  caption={t("Contact.List.Link")}
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
export default ContactList;
