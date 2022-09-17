import React, { Fragment, useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";

import Moment from "moment";
import SuiteSection from "./SuiteSection";
const SuiteList = () => {
  const params = useParams();
  const [reserveContext] = useContext(ReserveContext);
  const reserveServiceRef = useRef(null);
  const pricesServiceRef = useRef();
  const [Prices, setPrices] = useState();
  useEffect(() => {
    if (params.LocationId && JSON.stringify(reserveContext) !== "{}") {
      let prices = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightInfo.flightDate)).format(
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
      <div className="widget-header">
        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12 col-12">
            <h4>Suite Service</h4>
          </div>
        </div>
      </div>
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
