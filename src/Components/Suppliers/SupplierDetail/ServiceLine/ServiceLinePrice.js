import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetServieLine from "../../../../Hooks/ServiceLocation/GetServieLine";
import Moment from "moment";
import Drawer from "../../../UI/Drawer";
import DatePicker from "../../../UI/FormElement/DatePicker";
import "./ServiceLinePrice.css";
import InputText from "../../../UI/FormElement/InputText";
import useHttp from "../../../../Hooks/use-http";
import BasicContext from "../../../../Store/enviroment-context";
const ServiceLinePrice = (props) => {
  const basicContext = useContext(BasicContext);
  const [serviceLine, setServiceLine] = useState();
  const [serviceLinePrice, setServiceLinePrice] = useState({});
  const [toDate, setTodate] = useState(Date.now);
  const [fromDate, setFromdate] = useState(Date.now);
  const [price, setPrice] = useState();
  const params = useParams();
  const [currentAccourntId, setCurrentAccourntId] = useState(params.AccountId);
  const changeToDate = (data) => {
    setTodate(data);
  };
  useEffect(() => {
    console.log(serviceLinePrice);
    setFromdate(serviceLinePrice.start);
    setTodate(serviceLinePrice.end);
    setPrice(serviceLinePrice.price);
  }, [serviceLinePrice]);
  const changeFromDate = (data) => {
    setFromdate(data);
  };
  const chekFrom = () => {
    return false;
  };
  const checkTo = () => {
    return false;
  };
  const GoToAccountPanel = (data) => {
    setServiceLine(data);
  };
  const changePrice = (data) => {
    setPrice(data);
  };
  const {
    isLoading,
    error,
    sendRequest: fetchAccount,
  } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/account/${currentAccourntId}/ServiceLine/${props.UpdatingRecordId}/ServiceLinePrice`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        price: price,
        start: fromDate ? Moment(new Date(fromDate)).format("YYYY-MM-DD") : "",
        end: toDate ? Moment(new Date(toDate)).format("YYYY-MM-DD") : "",
      },
    },
    GoToAccountPanel
  );

  const SubmitForm = (event) => {
    event.preventDefault();
    console.log(serviceLine);
    if (chekFrom() && checkTo()) {
      alert("form submited");
    }
    console.log(
      `${basicContext.serviceLineAddress}/account/${currentAccourntId}/ServiceLine/${props.UpdatingRecordId}/ServiceLinePrice`
    );
    fetchAccount();
  };

  const getServieLine = (data) => {
    setServiceLine(data);
  };
  const fillForm = (event) => {
    setServiceLinePrice(
      serviceLine.serviceLinePrices.find((data) => {
        return data.id === event.currentTarget.id;
      })
    );
  };
  return (
    <Drawer cntx={props}>
      <GetServieLine
        extend={true}
        response={getServieLine}
        accountId={currentAccourntId}
        serviceId={props.UpdatingRecordId}
      />
      <div className="col-lg-12 layout-spacing">
        <div id="timelineBasic" className="col-lg-12 layout-spacing">
          <div className="widget-content widget-content-area mb-1">
            <div className="mt-container mx-auto ">
              <form onSubmit={SubmitForm}>
                <div className="row mb-4">
                  <div className="form-group mb-0 col">
                    <label htmlFor="from">From:</label>
                    <DatePicker
                      id="from"
                      minDate={"2022-08-09"}
                      value={fromDate}
                      type="text"
                      placeholder="Select Date.."
                      valueCallback={changeFromDate}
                    />
                  </div>
                  <div className="form-group mb-0 col">
                    <label htmlFor="to">To:</label>
                    <DatePicker
                      id="to"
                      valueCallback={changeToDate}
                      type="text"
                      value={toDate}
                      placeholder="Select Date.."
                    />
                  </div>
                  <div className="form-group mb-0 col">
                    <label htmlFor="price">Price:</label>
                    <InputText
                      id="price"
                      value={price}
                      valueCallback={changePrice}
                      type="text"
                      placeholder="Select Date.."
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="form-group mb-0 col">
                    <button type="submit" className="btn btn-primary">
                      save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="widget-content widget-content-area ">
            <div className="mt-container mx-auto">
              <div className="timeline-line">
                {serviceLine &&
                  serviceLine.serviceLinePrices &&
                  serviceLine.serviceLinePrices.map((data) => {
                    return (
                      <div
                        onClick={fillForm}
                        key={data.id}
                        id={data.id}
                        className="item-timeline"
                      >
                        <p className="t-time m-1">
                          {Moment(data.end).format("YYYY-MM-DD")}
                        </p>
                        <div
                          className="t-dot t-dot-primary"
                          data-original-title=""
                          title=""
                        ></div>
                        <div className="t-text">
                          <h3>{data.price}</h3>
                          <p className="t-meta-time">
                            Start {Moment(data.start).format("YYYY-MM-DD")}
                          </p>
                          <p className="t-meta-time">{data.modifyer}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ServiceLinePrice;
