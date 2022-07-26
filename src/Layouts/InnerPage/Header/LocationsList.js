import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DrawerShortcuts from "../../../Components/UI/DrawerShortcuts";
import List from "devextreme-react/list";
import useHttp from "../../../Hooks/use-http";
import BasicContext from "../../../Store/enviroment-context";
import { useState } from "react";
const LocationList = (props) => {
  const basicContext = useContext(BasicContext);
  const [locations, setlocations] = useState({});

  const fillLocationOption = (data) => {
    setlocations(data);
  };
  const { sendRequest: fetchLocation } = useHttp(
    {
      url: `${basicContext.serviceLocationAddress}/ServiceLocation?AccountId=&SearchTerm=&PageNumber=1&PageSize=500&OrderBy=Title`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    fillLocationOption
  );

  const closeLocation = () => {
    props.cancelCallBack();
  };

  const ItemTemplate = (data) => {
    return (
      <Link
        to={"/NewReserve/" + data.id}
        onClick={closeLocation}
        id={data.id}
        className={"list-group-item list-group-item-action"}
      >
        <p>{data.title}</p>
      </Link>
    );
  };
  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DrawerShortcuts cntx={props}>
      <React.Fragment>
        <div className="list-container">
          <List
            dataSource={locations}
            height={400}
            itemRender={ItemTemplate}
            searchExpr="Name"
            searchEnabled={true}
            searchMode={"contains"}
          />
        </div>
      </React.Fragment>
    </DrawerShortcuts>
  );
};

export default LocationList;
