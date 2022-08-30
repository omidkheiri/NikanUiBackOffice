import React, { Fragment, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ReserveService from "../../../../../Hooks/Reserve/ReserveService";
import ReserveContext from "../../../../../Store/ReserveContext";
const TransferList = () => {
  const [reserveContext, setReserveContext] = useContext(ReserveContext);
  const [shownDrawer, setshownDrawer] = useState("none");
  const cancelModal = () => {
    setshownDrawer(0);
  };
  const [t] = useTranslation("common");
  const reserveServiceRef = useRef();
  const params = useParams();
  const [reserve, setReserve] = useState();
  useEffect(() => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(reserveStorage);
    setReserve(reserveStorage);
  }, []);

  const reserveUpdated = () => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );
    console.log(reserveStorage);
    setReserve(reserveStorage);
  };

  const getReserve = (reserve) => {
    console.log(reserve);
    setReserve(reserve);
  };
  const onDeleteItem = (event) => {
    let reserveStorage = reserveServiceRef.current.GetReserve(
      params.LocationId
    );

    reserveStorage.transfer = reserveStorage.transfer.filter((data) => {
      return data.id !== event.currentTarget.id;
    });

    reserveServiceRef.current.UpdateReserve(params.LocationId, reserveStorage);
    setReserveContext(reserveStorage);
  };

  return (
    <Fragment>
      <ReserveService
        reserveUpdated={reserveUpdated}
        getReserve={getReserve}
        ref={reserveServiceRef}
      />
      <div className="widget-header">
        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12 col-12">
            <h4>Transfer</h4>
          </div>
        </div>
      </div>
      <div className="widget-content widget-content-area">
        <div className="table-responsive">
          <table className="table table-bordered mb-4">
            <thead>
              <tr>
                <th>{t("ReservePage.Transfer.List.Type")}</th>
                <th className="text-center">
                  {t("ReservePage.Transfer.List.FromAddress")}
                </th>
                <th> {t("ReservePage.Transfer.List.ToAddress")}</th>
                <th
                  style={{
                    maxWidth: "150px!important",
                    width: "100px",
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {reserveContext &&
                reserveContext.transfer.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="text-center">{data.transferType.label}</td>
                      <td className="text-center">{data.fromAddress}</td>
                      <td className="text-center">{data.toAddress}</td>

                      <td className="text-center">
                        <div
                          style={{ float: "right", padding: "0 5px" }}
                          onClick={onDeleteItem}
                          id={data.id}
                          className="icon-container"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-trash-2"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default TransferList;
