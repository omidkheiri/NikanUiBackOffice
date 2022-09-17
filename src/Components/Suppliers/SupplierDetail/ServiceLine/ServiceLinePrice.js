import React, { useContext, useState } from "react";
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
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [price, setPrice] = useState(0);

  const params = useParams();
  const [currentAccourntId] = useState(params.AccountId);
  const [updatePrice, setupdatePrice] = useState(false);
  const [selectedPriceId, setselectedPriceId] = useState();

  const changeEnd = (data) => {
    setEnd(data);
  };

  const changeStart = (data) => {
    setStart(data);
  };
  const changePrice = (data) => {
    setPrice(data);
  };
  const GoToPanel = (data) => {
    setServiceLine(data);
  };

  const { sendRequest: postPrice } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/account/${currentAccourntId}/ServiceLine/${props.updatingRecordId}/ServiceLinePrice`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        price: price,
        start: start ? Moment(new Date(start)).format("YYYY-MM-DD") : "",
        end: end ? Moment(new Date(end)).format("YYYY-MM-DD") : "",
      },
    },
    GoToPanel
  );
  const { sendRequest: putPrice } = useHttp(
    {
      url: `${basicContext.serviceLineAddress}/account/${currentAccourntId}/ServiceLine/${props.updatingRecordId}/ServiceLinePrice/${selectedPriceId}`,
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: {
        price: price,
        start: start ? Moment(new Date(start)).format("YYYY-MM-DD") : "",
        end: end ? Moment(new Date(end)).format("YYYY-MM-DD") : "",
      },
    },
    GoToPanel
  );

  const SubmitForm = (event) => {
    event.preventDefault();

    if (updatePrice) {
      putPrice();
    } else {
      postPrice();
    }
  };

  const getServieLine = (data) => {
    setServiceLine(data);
  };
  const fillForm = (event) => {
    setupdatePrice(true);
    setselectedPriceId(event.currentTarget.id);
    let item = serviceLine.serviceLinePrices.find((data) => {
      return data.id === event.currentTarget.id;
    });

    setPrice(item.price);
    setStart(item.start);
    setEnd(item.end);
  };
  const ClearForm = () => {
    setPrice(0);
    setStart([]);
    setEnd([]);
    setupdatePrice(false);
    setselectedPriceId("");
  };
  return (
    <Drawer cntx={props}>
      <GetServieLine
        extend={true}
        response={getServieLine}
        accountId={currentAccourntId}
        serviceId={props.updatingRecordId}
      />
      <div className="col-lg-12 layout-spacing">
        <div id="timelineBasic" className="col-lg-12 layout-spacing">
          <div className="widget-content widget-content-area mb-1">
            <h1>{serviceLine ? serviceLine.title : ""}</h1>
            <div className="mt-container mx-auto ">
              <form onSubmit={SubmitForm}>
                <div className="row mb-4">
                  <div className="form-group mb-0 col">
                    <label htmlFor="start">From:</label>
                    <DatePicker
                      id="start"
                      value={start}
                      type="text"
                      placeholder="Select Date.."
                      valueCallback={changeStart}
                    />
                  </div>
                  <div className="form-group mb-0 col">
                    <label htmlFor="end">To:</label>
                    <DatePicker
                      id="end"
                      valueCallback={changeEnd}
                      type="text"
                      value={end}
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
                    <button
                      style={{ marginRight: "5px", marginLeft: "5px" }}
                      type="button"
                      onClick={ClearForm}
                      className="btn btn-warning"
                    >
                      reset
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
