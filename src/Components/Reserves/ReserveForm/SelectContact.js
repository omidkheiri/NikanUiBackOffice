import React from "react";
import DropDownBox from "devextreme-react/drop-down-box";
import DataGrid, {
  Selection,
  Paging,
  FilterRow,
  Scrolling,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { useContext } from "react";
import BasicContext from "../../../Store/enviroment-context";
import { useState } from "react";
import { Fragment } from "react";
const SelectContact = (props) => {
  const basicContext = useContext(BasicContext);
  const gridColumns = [
    "contactNumber",
    "name",
    "lastName",
    "accountTitle",
    "emailAddress",
    "phone",
  ];
  const [AccountId, setAccountId] = useState();
  const [gridBoxValue, setgridBoxValue] = useState();
  const [isGridBoxOpened, setisGridBoxOpened] = useState();
  const [selectedItemInfo, setselectedItemInfo] = useState();
  const [displayInfo, setdisplayInfo] = useState("");
  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== "";
  }
  const onGridBoxOpened = (e) => {
    if (e.name === "opened") {
      setisGridBoxOpened(e.value);
    }
  };
  const dataGridOnSelectionChanged = (e) => {
    var a = e.selectedRowsData[0].accountId;
    setAccountId(a);
    setgridBoxValue(e.selectedRowKeys);
    props.selectedIdChanged(e.selectedRowKeys);
    setselectedItemInfo(e.selectedRowsData[0]);
    gridBoxDisplayExpr(selectedItemInfo);
    setisGridBoxOpened(false);
  };
  const syncDataGridSelection = (e) => {
    props.selectedIdChanged("");
    setgridBoxValue(e.value);
    props.selectedIdChanged(e.value);
  };

  const gridBoxDisplayExpr = (item) => {
    if (selectedItemInfo) {
      return (
        selectedItemInfo.name +
        " " +
        selectedItemInfo.lastName +
        "=>" +
        selectedItemInfo.phone
      );
    }
  };
  const store = new CustomStore({
    key: "contactId",
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
    byKey: (key) => {
      if (AccountId) {
        var item = null;
        fetchJSON(key, AccountId).then((data) => {
          item = data;
        });
        if (item) {
          return item;
        }
      } else {
        return null;
      }
    },
  });
  async function fetchJSON(key, accountId) {
    const response = await fetch(
      basicContext.baseAddress + "/account/" + accountId + "/Contact/" + key
    );
    const item = await response.json();

    return item;
  }
  const dataGridRender = () => {
    return (
      <DataGrid
        dataSource={store}
        columns={gridColumns}
        hoverStateEnabled={true}
        selectedRowKeys={gridBoxValue}
        onSelectionChanged={dataGridOnSelectionChanged}
        height="100%"
      >
        <Selection mode="single" />
        <Scrolling mode="virtual" />
        <Paging enabled={true} pageSize={10} />
        <FilterRow visible={true} />
      </DataGrid>
    );
  };
  return (
    <Fragment>
      <h4 style={{ textAlign: "right" }}>اطلاعات رزرو کننده</h4>
      <DropDownBox
        value={gridBoxValue}
        opened={isGridBoxOpened}
        valueExpr="contactId"
        deferRendering={false}
        displayExpr={gridBoxDisplayExpr}
        placeholder="Select a value..."
        showClearButton={true}
        dataSource={store}
        onValueChanged={syncDataGridSelection}
        onOptionChanged={onGridBoxOpened}
        contentRender={dataGridRender}
      />
    </Fragment>
  );
};

export default SelectContact;
