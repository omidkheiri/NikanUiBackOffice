import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import Drawer from "../../../../UI/Drawer";
import DropDown from "../../../../UI/FormElement/DropDown";
import InputText from "../../../../UI/FormElement/InputText";
import Moment from "moment";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
import { v4 as uuid } from "uuid";
import ReserveContext from "../../../../../Store/ReserveContext";
const TransferNewForm = (props) => {
  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const [unique_id] = useState(uuid());
  const reserveServiceRef = useRef();
  const pricesServiceRef = useRef();
  const [transferTypes, setTransferTypes] = useState({});
  const params = useParams();
  const [t] = useTranslation("common");
  const [FromAddress, setFromAddress] = useState();
  const [ToAddress, setToAddress] = useState();
  const [Description, setDescription] = useState();
  const [MobileNumber, setMobileNumber] = useState();
  const [TransferType, setTransferType] = useState();
  const styles = {
    textAlign: {
      textAlign: t("textAlign"),
      width: "100%",
    },
    ltr: {
      textAlign: "left",
      direction: "ltr",
      width: "100%",
    },
  };
  useEffect(() => {
    if (params.LocationId) {
      let prices = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      var item = prices.filter((data) => {
        return data.serviceTypeId === 3;
      });
      item = item.map((data) => {
        return { value: data.id, label: data.title };
      });

      setTransferTypes(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTransferType = (data) => {
    setTransferType(data);
  };
  const handleInputChange = () => {};
  const updateFromAddress = (data) => {
    setFromAddress(data);
  };
  const updateToAddress = (data) => {
    setToAddress(data);
  };
  const updateDescription = (data) => {
    setDescription(data);
  };
  const updateMobile = (data) => {
    setMobileNumber(data);
  };

  const submitTransfer = (event) => {
    event.preventDefault();

    if (FromAddress) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );

      reserveStorage.transfer.push({
        id: unique_id,
        fromAddress: FromAddress,
        toAddress: ToAddress,
        description: Description,
        mobileNumber: MobileNumber,
        transferType: TransferType,
      });

      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );
      setReserveContext(reserveStorage);
      props.UpdateReserve();
    }
  };

  const reserveUpdated = () => {};
  const getReserve = () => {};
  return (
    <Drawer cntx={props}>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <form onSubmit={submitTransfer}>
        <div className="row">
          <div className="form-group col-md-12">
            <DropDown
              textAlign={styles.textAlign}
              title={t("ReservePage.Transfer.FormElement.TransferType")}
              type="text"
              id="serviceType"
              IsRequired={true}
              options={transferTypes}
              valueCallback={updateTransferType}
              handleInputChange={handleInputChange}
              requiredMassage={t(
                "ReservePage.Passenger.FormElement.GenderRequired"
              )}
            />
          </div>
          <div className="form-group col-md-12">
            <InputText
              textAlign={styles.textAlign}
              title={t("ReservePage.Transfer.FormElement.FromAddress")}
              type="text"
              id="FromAddress"
              IsRequired={true}
              MinLength={3}
              valueCallback={updateFromAddress}
              requiredMassage={t(
                "ReservePage.Transfer.FormElement.FromAddressRequired"
              )}
            />
          </div>

          <div className="form-group col-md-12">
            <InputText
              textAlign={styles.textAlign}
              title={t("ReservePage.Transfer.FormElement.ToAddress")}
              type="text"
              id="ToAddress"
              IsRequired={true}
              MinLength={3}
              RegexFormat=""
              valueCallback={updateToAddress}
              requiredMassage={t(
                "ReservePage.Transfer.FormElement.ToAddressRequired"
              )}
            />
          </div>
          <div className="form-group col-md-6">
            <InputText
              textAlign={styles.textAlign}
              title={t("ReservePage.Transfer.FormElement.Description")}
              type="text"
              id="Description"
              valueCallback={updateDescription}
            />
          </div>
          <div className="form-group col-md-6">
            <InputText
              textAlign={styles.textAlign}
              title={t("ReservePage.Transfer.FormElement.Mobile")}
              type="text"
              id="Mobile"
              valueCallback={updateMobile}
              requiredMassage={t(
                "ReservePage.Transfer.FormElement.MobileRequired"
              )}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {t("FlightNumber.FormElement.SaveFlightNumber")}
        </button>
      </form>
    </Drawer>
  );
};

export default TransferNewForm;
