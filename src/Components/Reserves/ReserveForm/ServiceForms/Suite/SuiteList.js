import React, { Fragment, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";

import Moment from "moment";
import SuiteSection from "./SuiteSection";
const SuiteList = () => {
  const params = useParams();
  const [t] = useTranslation("common");
  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const reserveServiceRef = useRef(null);
  const pricesServiceRef = useRef();
  const [Prices, setPrices] = useState();
  useEffect(() => {
    if (params.LocationId && JSON.stringify(reserveContext) != "{}") {
      let prices = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      if (!prices) {
        return;
      }
      var item = prices.filter((data) => {
        return data.serviceTypeId === 6;
      });
      setPrices(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveContext]);
  return (
    <Fragment>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService ref={reserveServiceRef} />

      {Prices &&
        Prices.map((data) => {
          return (
            <div key={data.id} style={{ margin: "5px" }}>
              <SuiteSection priceType={data}></SuiteSection>
            </div>
          );
        })}
    </Fragment>
  );
};

export default SuiteList;
