import { forwardRef, useImperativeHandle } from "react";

const PriceListService = forwardRef((props, ref) => {
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
