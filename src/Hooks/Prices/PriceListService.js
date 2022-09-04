import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import BasicContext from "../../Store/enviroment-context";
import useHttp from "../use-http";
import Moment from "moment";

const PriceListService = forwardRef((props, ref) => {
  const [id, setId] = useState("#");
  const basicContext = useContext(BasicContext);

  useImperativeHandle(ref, () => ({
    AddPriceRecord(id, date) {
      localStorage.getItem(id, date);
    },

    GetPrices(id) {
      return JSON.parse(localStorage.getItem(id));
    },
  }));
});

export default PriceListService;
