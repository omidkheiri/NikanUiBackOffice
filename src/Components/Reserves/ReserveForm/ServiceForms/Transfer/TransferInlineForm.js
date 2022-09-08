import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { v4 as uuid } from "uuid";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";

import Moment from "moment";
import PriceListService from "../../../../../Hooks/Prices/PriceListService";
import DropDown from "../../../../UI/FormElement/DropDown";
import InputText from "../../../../UI/FormElement/InputText";
const TransferInlineForm = (props) => {
  const [, setReserve] = useState({});
  const getReserve = (reserve) => {
    setReserve(reserve);
  };

  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const params = useParams();
  const [t] = useTranslation("common");

  const [Address, setAddress] = useState("");
  const [Time, setTime] = useState("");
  const [Description, setDescription] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [transfer, SetTransfer] = useState({});
  const [unique_id, setunique_id] = useState(uuid());
  useEffect(() => {
    if (props.transferId) {
      fillForm(props.transferId);
      setunique_id(props.transferId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.transferId]);

  const [transferTypes, settransferTypes] = useState();
  const [transferType, settransferType] = useState();
  const [formSchema, setformSchema] = useState({});

  const reserveServiceRef = useRef(null);

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
    if (params.LocationId && reserveContext) {
      let prices = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );
      if (prices) {
        var item = prices.filter((data) => {
          return data.serviceTypeId === 3;
        });

        item = item.map((data) => {
          return { value: data.id, label: data.title };
        });

        settransferTypes(item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveContext]);

  useEffect(() => {
    if (transferType) {
      var priceData = pricesServiceRef.current.GetPrices(
        params.LocationId +
          "#" +
          Moment(new Date(reserveContext.flightinfo.flightDate)).format(
            "YYYY-MM-DD"
          )
      );

      var item = priceData.find((data) => {
        return data.id === transferType.value;
      });

      if (item) {
        var scheme = JSON.parse(item.serviceLineScheme);

        setformSchema(scheme);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferType]);

  const updateMobileNumber = (data) => {
    setMobileNumber(data);
  };
  const updateAddress = (data) => {
    setAddress(data);
  };
  const updateDescription = (data) => {
    setDescription(data);
  };
  const updateTime = (data) => {
    setTime(data);
  };

  const updatetransferType = (data) => {
    settransferType(data);
  };

  const handleInputChange = (data) => {};
  const checkForm = () => {
    let isvalid = true;
    let validationMessage = [];

    if (formSchema.Address && Address === "") {
      isvalid = false;
      validationMessage.push(
        t("ReservePage.Transfer.FormElement.AddressRequired")
      );
    }

    return isvalid;
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (checkForm()) {
      let reserveStorage = reserveServiceRef.current.GetReserve(
        params.LocationId
      );

      if (reserveStorage.transfer.length > 0 && reserveStorage.transfer[0]) {
        var item = reserveStorage.transfer.find((data) => {
          return data.id === unique_id;
        });
        if (item) {
          reserveStorage.transfer.forEach((element) => {
            if (element.id === unique_id) {
              element.typeId = transferType;

              element.address = Address;
              element.time = Time;

              element.mobileNumber = MobileNumber;

              element.scheme = formSchema;

              element.description = Description;
            }
          });
        } else {
          var record = {
            id: unique_id,
            typeId: transferType,

            address: Address,
            time: Time,

            mobileNumber: MobileNumber,

            scheme: formSchema,

            description: Description,
          };

          reserveStorage.transfer.push(record);
        }
      } else {
        reserveStorage.transfer = [];
        record = {
          id: unique_id,
          typeId: transferType,

          address: Address,
          time: Time,

          mobileNumber: MobileNumber,

          scheme: formSchema,

          description: Description,
        };

        reserveStorage.transfer.push(record);
      }

      reserveServiceRef.current.UpdateReserve(
        params.LocationId,
        reserveStorage
      );
      setReserveContext(reserveStorage);
      resetForm();
    }
  };
  const resetForm = () => {
    SetTransfer(null);
    setunique_id(uuid());
    settransferType({});
    settransferType("");

    setAddress("");

    setDescription("");
    setMobileNumber("");
    setTime("");
  };
  const fillForm = (transferId) => {
    var transfer = reserveContext.transfer.find((data) => {
      return data.id === transferId;
    });
    if (transfer) {
      SetTransfer(transfer);
      settransferType(transfer.typeId);

      setAddress(transfer.address);

      setDescription(transfer.description);
      setMobileNumber(transfer.mobileNumber);
      setTime(transfer.time);
    }
  };
  const pricesServiceRef = useRef();
  const reserveUpdated = () => {};
  return (
    <Fragment key={unique_id}>
      <PriceListService ref={pricesServiceRef} />
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <div className="row">
        <div id="flFormsGrid" className="col-lg-12 layout-spacing">
          <div className="row">
            <div className="col"></div>
          </div>
          <form id="transfer-form" onSubmit={submitForm}>
            <div className="form-row">
              <div className="form-group col-md-12">
                <DropDown
                  textAlign={styles.textAlign}
                  title={t("ReservePage.Transfer.FormElement.TransferType")}
                  type="text"
                  id="transferType"
                  IsRequired={true}
                  options={transferTypes}
                  value={transferType}
                  valueCallback={updatetransferType}
                  handleInputChange={handleInputChange}
                  requiredMassage={t(
                    "ReservePage.Transfer.FormElement.TransferType"
                  )}
                />
              </div>

              {transferType && transferType.value && (
                <div className="row">
                  <div className="form-group col-md-12">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Transfer.FormElement.Address")}
                      type="text"
                      id="address"
                      IsRequired={true}
                      MinLength={3}
                      value={transfer ? transfer.address : ""}
                      RegexFormat=""
                      valueCallback={updateAddress}
                      requiredMassage={t(
                        "ReservePage.Transfer.FormElement.AddressRequired"
                      )}
                    />
                  </div>

                  <div className="form-group col">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Transfer.FormElement.MobileNumber")}
                      type="text"
                      id="mobileNumber"
                      IsRequired={true}
                      MinLength={3}
                      value={transfer ? transfer.mobileNumber : ""}
                      RegexFormat=""
                      valueCallback={updateMobileNumber}
                      requiredMassage={t(
                        "ReservePage.Transfer.FormElement.MobileNumberRequired"
                      )}
                    />
                  </div>

                  <div className="form-group col">
                    <label htmlFor="from">
                      {t("ReservePage.Transfer.FormElement.Time")}
                    </label>

                    <Flatpickr
                      type="time"
                      value={transfer ? transfer.time : null}
                      options={{
                        time_24hr: true,
                        minDate: props.minDate,
                        nocalendar: true,
                        enableTime: true,
                        dateFormat: "h:i K",
                      }}
                      className="form-control flatpickr flatpickr-input"
                      onChange={updateTime}
                    />
                  </div>
                  <div className="form-group col-12">
                    <InputText
                      textAlign={styles.textAlign}
                      title={t("ReservePage.Transfer.FormElement.Description")}
                      type="text"
                      id="description"
                      IsRequired={true}
                      MinLength={3}
                      RegexFormat=""
                      value={transfer ? transfer.description : null}
                      valueCallback={updateDescription}
                      requiredMassage={t(
                        "ReservePage.Transfer.FormElement.UpdateDescriptionRequired"
                      )}
                    />
                  </div>
                  <hr style={{ margin: "0" }} className="col-md-12" />

                  <div className="col">
                    <button type="submit" className="btn btn-primary mt-3">
                      {t("FlightNumber.FormElement.SaveFlightNumber")}
                    </button>
                    <button
                      onClick={resetForm}
                      type="button"
                      className="btn btn-info mt-3"
                    >
                      جدید
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default TransferInlineForm;
