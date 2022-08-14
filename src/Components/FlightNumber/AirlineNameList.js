import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DataGrid,
  Column,
  LoadPanel,
  Toolbar,
  Item,
  SearchPanel,
  Editing,
} from "devextreme-react/data-grid";
import { useTranslation } from "react-i18next";
import BasicContext from "../../Store/enviroment-context";
import AirlineNameService from "../../Hooks/AirlineName/AirlineNameService";
const AirlineNameList = () => {
  const dataGridRef = useRef();
  const [store, setStore] = useState();
  const [t, i18n] = useTranslation("common");

  const getStore = (data) => {
    setStore(data);
  };

  return (
    <div>
      <AirlineNameService getStore={getStore} />
      <div className="layout-px-spacing">
        <div className="page-header">
          <div className="page-title">
            <h3>{t("Airline.List.PageTitle")}</h3>
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
                  hoverStateEnabled={true}
                  dataSource={store}
                  showBorders={true}
                  remoteOperations={true}
                  showColumnLines={true}
                  showRowLines={true}
                  rowAlternationEnabled={true}
                  ref={dataGridRef}
                >
                  <LoadPanel enabled={true} />
                  <SearchPanel visible={true} />
                  <Editing
                    mode="row"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                  />
                  <Toolbar>
                    <Item name="groupPanel" />

                    <Item name="addRowButton" showText="always" />
                    <Item name="exportButton" />
                    <Item name="columnChooserButton" />
                    <Item name="searchPanel" />
                  </Toolbar>

                  <Column
                    direction="rtl"
                    alignment={"right"}
                    dataField="name"
                    dataType="string"
                    caption={t("Airline.List.Name")}
                    width={200}
                  />
                  <Column
                    direction="rtl"
                    alignment={"right"}
                    dataField="iconUrl"
                    dataType="string"
                    caption={t("Airline.List.IconUrl")}
                  />
                </DataGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirlineNameList;
