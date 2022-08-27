// import { DataGrid, DropDownBox } from "devextreme-react";
// import {
//   FilterRow,
//   Paging,
//   Scrolling,
//   Selection,
// } from "devextreme-react/data-grid";

// import CustomStore from "devextreme/data/custom_store";
// import React, { useContext, useState } from "react";
// import BasicContext from "../../../../../Store/enviroment-context";

// const PassengerSelections = () => {
//   const basicContext = useContext(BasicContext);
//   const [gridBoxValue, setgridBoxValue] = useState(0);
//   const [isGridBoxOpened, setiGridBoxOpened] = useState(false);
//   function isNotEmpty(value) {
//     return value !== undefined && value !== null && value !== "";
//   }
//   function gridBoxDisplayExpr(item) {
//     return item && `${item.CompanyName} <${item.Phone}>`;
//   }
//   const syncDataGridSelection = (data) => {};

//   const onGridBoxOpened = () => {};
//   const gridDataSource = new CustomStore({
//     key: "accountId",
//     load(loadOptions) {
//       let params = "?";
//       [
//         "skip",
//         "take",
//         "requireTotalCount",
//         "requireGroupCount",
//         "sort",
//         "filter",
//         "totalSummary",
//         "group",
//         "groupSummary",
//       ].forEach((i) => {
//         if (i in loadOptions && isNotEmpty(loadOptions[i])) {
//           params += `${i}=${JSON.stringify(loadOptions[i])}&`;
//         }
//       });
//       params = params.slice(0, -1);
//       return fetch(`${basicContext.reportAddress}/account${params}`)
//         .then((response) => response.json())
//         .then((data) => ({
//           data: data.data,
//           totalCount: data.totalCount,
//           summary: data.summary,
//           groupCount: data.groupCount,
//         }))
//         .catch(() => {
//           throw new Error("Data Loading Error");
//         });
//     },
//   });
//   return (
//     <DropDownBox
//       value={gridBoxValue}
//       opened={isGridBoxOpened}
//       valueExpr="Id"
//       deferRendering={false}
//       displayExpr={gridBoxDisplayExpr}
//       placeholder="Select a value..."
//       showClearButton={true}
//       dataSource={gridDataSource}
//       onValueChanged={syncDataGridSelection}
//       onOptionChanged={onGridBoxOpened}
//       contentRender={dataGridRender}
//     />
//   );
// };
// dataGridRender = {
//   const dataGridOnSelectionChanged = (data) => {};
//   const basicContext = useContext(BasicContext);
//   const gridColumns = ["CompanyName", "City", "Phone"];
//   const gridDataSource = new CustomStore({
//     key: "accountId",
//     load(loadOptions) {
//       let params = "?";
//       [
//         "skip",
//         "take",
//         "requireTotalCount",
//         "requireGroupCount",
//         "sort",
//         "filter",
//         "totalSummary",
//         "group",
//         "groupSummary",
//       ].forEach((i) => {
//         if (i in loadOptions && isNotEmpty(loadOptions[i])) {
//           params += `${i}=${JSON.stringify(loadOptions[i])}&`;
//         }
//       });
//       params = params.slice(0, -1);
//       return fetch(`${basicContext.reportAddress}/account${params}`)
//         .then((response) => response.json())
//         .then((data) => ({
//           data: data.data,
//           totalCount: data.totalCount,
//           summary: data.summary,
//           groupCount: data.groupCount,
//         }))
//         .catch(() => {
//           throw new Error("Data Loading Error");
//         });
//     },
//   });
//   return (
//     <DataGrid
//       dataSource={gridDataSource}
//       columns={gridColumns}
//       hoverStateEnabled={true}
//       selectedRowKeys={gridBoxValue}
//       onSelectionChanged={dataGridOnSelectionChanged}
//       height="100%"
//     >
//       <Selection mode="single" />
//       <Scrolling mode="virtual" />
//       <Paging enabled={true} pageSize={10} />
//       <FilterRow visible={true} />
//     </DataGrid>
//   );
// };

// export default PassengerSelections;
import React from "react";

const PassengerSelections = () => {
  return <div>PassengerSelections</div>;
};

export default PassengerSelections;
