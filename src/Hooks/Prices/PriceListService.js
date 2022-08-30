import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import { useState } from "react";
import BasicContext from "../../Store/enviroment-context";
import useHttp from "../use-http";
import Moment from "moment";

const PriceListService = forwardRef((props, ref) => {
  const basicContext = useContext(BasicContext);
  const [id, setId] = useState();
  const [date, setdate] = useState();

  const GetServiceListData = (data) => {
    localStorage.setItem(id, JSON.stringify(data));
  };
  const { sendRequest: fetchLocationServiceWithPrice } = useHttp(
    {
      url:
        basicContext.serviceLineAddress +
        "/ServiceLine/Location/" +
        id +
        "?DateTime=" +
        Moment(date).format("YYYY-MM-DD"),
      method: "Get",
      headers: { "Content-Type": "application/json" },
      body: null,
    },
    GetServiceListData
  );
  useEffect(() => {
    fetchLocationServiceWithPrice();
    console.log(id, date);
  }, [id, date]);

  useImperativeHandle(ref, () => ({
    AddPriceRecord(id, date) {
      setId(id);
      setdate(date);

      localStorage.setItem(id, JSON.stringify());
    },
    UpdateReserve(id, data) {
      localStorage.setItem(id, JSON.stringify(data));
      props.reserveUpdated();
    },
    GetPrices(id) {
      return JSON.parse(localStorage.getItem(id));
    },
  }));
});

export default PriceListService;
